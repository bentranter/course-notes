package speedstudy.speedstudy;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.StringTokenizer;


public class SpeedReader extends Activity {
    SeekBar speedBar;
    public String message = null;
    public int charactersPerLine = 10;
    ArrayList<String> wordsInMessage;
    TextView text;
    boolean paused = true;
    int pauseSleep = 1000;
    int sleepMin = 100;
    int sleep = 500;
    int sleepMax = 1000;
    int sleepRange = sleepMax - sleepMin;
    SeekBar.OnSeekBarChangeListener speedBarListener;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();

        String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);


        setContentView(R.layout.activity_speed_reader);
        text = (TextView) findViewById(R.id.speed_text);
        text.setTextSize(30);
        String startText;

        GlobalApp globals= (GlobalApp)getApplicationContext();


        message = addSpaces(message);
        this.message = message;
        wordsInMessage = new ArrayList<String>();
        StringTokenizer tok = new StringTokenizer(message, " ");
        while(tok.hasMoreElements()){
            wordsInMessage.add(tok.nextToken());
        }

        int wordCount = 0;
        String tempLine = "";
        while (tempLine.length() < charactersPerLine && wordCount < wordsInMessage.size()){
            String w = wordsInMessage.get(wordCount);
            if (w.equals(globals.ls)) {
                if (!tempLine.equals("")) {
                    break;
                } else {
                    wordCount++;
                }
            }
            else{
                tempLine+=w+" ";
                wordCount++;
            }
        }
        text.setText(tempLine);
        speedBar = (SeekBar) findViewById(R.id.speed_bar);
        speedBarListener = new SeekBar.OnSeekBarChangeListener(){

            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                moveBar(progress);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }


        };
        speedBar.setOnSeekBarChangeListener(speedBarListener);
        startTextCycle();
        //getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }


    /**
     * Called when the speed bar is moved, sets the speed to the new value.
     * @param value - the value that the speed bar was set to.
     */
    public void moveBar(int value){

        sleep = (int) (sleepMax - ((value/100.0)*sleepRange));
    }
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * Starts the thread that cycles the text.
     * Adjusts the speed depending on the speed bar and the button presses.
     */
    public void startTextCycle(){

        new Thread(new Runnable(){
            String line = "";
            boolean dontChangeText = false;
            boolean extraSleep = false;
            int wordIndex = 0;

            GlobalApp globals= (GlobalApp)getApplicationContext();
            public void run() {

                while (true) {
                    runOnUiThread(new Runnable() {
                        public void run() {
                            String w;
                            line = "";
                            while(line.length() < charactersPerLine && wordIndex < wordsInMessage.size()){
                                if ((w = wordsInMessage.get(wordIndex)).equals(globals.ls)){

                                    wordIndex++;
                                    if (!line.equals("")) {
                                        extraSleep = true;
                                        break;
                                    }
                                    else{
                                        extraSleep = true;
                                        dontChangeText = true;
                                        break;

                                    }

                                }
                                else {
                                    line = line + w + " ";
                                    wordIndex++;
                                }

                            }

                            if (!dontChangeText) {
                                text.setText(line);
                            }

                            if (wordIndex >= wordsInMessage.size()){
                                wordIndex = 0;
                                paused = true;
                                Button button = (Button) findViewById(R.id.pauseButton);
                                button.setText("Start");
                            }
                        }
                    });
                    try

                    {

                        Thread.sleep(sleep);
                        if (extraSleep){
                            Thread.sleep(500);
                            extraSleep = false;
                            dontChangeText = false;
                        }
                        if (wordIndex >= wordsInMessage.size()){
                            wordIndex = 0;
                            paused = true;
                            Button button = (Button) findViewById(R.id.pauseButton);
                            button.setText("Start");
                        }
                        while (paused){
                            Thread.sleep(pauseSleep);
                        }
                    } catch (Exception e) {

                    }
                }
            }
        } ).start();

    }

    /**
     * Called when the speed up button is pressed, increases speed by 5% until max speed
     * @param view - Passed by tapping the speed up button
     */
    public void speedUp(View view){
        if (sleep >=  sleepMin) {
            SeekBar bar = (SeekBar) findViewById(R.id.speed_bar);
            sleep =(int) (sleep - (sleepRange*0.05));
            if (sleep < sleepMin){ sleep = sleepMin;}
            bar.setProgress((int)(((((sleep-sleepMin)/(sleepRange*1.0))*100)-100)*-1));
        }
    }
    /**
     * Called when the slow down button is pressed, decreases speed by 5% until min speed
     * @param view - Passed by tapping the slow down button
     */
    public void slowDown(View view){
        if (sleep <=  sleepMax) {
            SeekBar bar = (SeekBar) findViewById(R.id.speed_bar);
            sleep =(int) (sleep + (sleepRange*0.05));
            if (sleep > sleepMax){ sleep = sleepMax;}
            bar.setProgress((int)(((((sleep-sleepMin)/(sleepRange*1.0))*100)-100)*-1));
        }
    }

    /**
     * Called when the pause/start button is pressed, pauses or resumes the speed reader as required.
     * @param view - Passed by tapping the pause/start button.
     */
    public void StartPauseOrResume(View view){
        Button button = (Button) findViewById(R.id.pauseButton);

        if (!paused){
            button.setText("Resume");
            paused = true;
        }
        else{
            button.setText("Pause");
            paused = false;
        }

    }

    public String addSpaces(String message){
        GlobalApp globals= (GlobalApp)getApplicationContext();
        String rMessage = message.replace(globals.ls, " "+globals.ls+" ");
        return rMessage;
    }

}
