package speedstudy.speedstudy;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.StringTokenizer;


public class SpeedReader extends Activity {
    public int characterIndex = 0;
    public String message = null;
    public int charactersPerLine = 10;
    ArrayList<String> wordsInMessage;
    TextView text;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();
        String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);
        text = new TextView(this);
        text.setTextSize(20);
        text.setText(message);
        setContentView(text);
        this.message = message;
        wordsInMessage = new ArrayList<String>();
        StringTokenizer tok = new StringTokenizer(message, " ");
        while(tok.hasMoreElements()){
            wordsInMessage.add(tok.nextToken());
        }
        startTextCycle();
        //getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }


    @Override
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

    public void startTextCycle(){

        new Thread(new Runnable(){
            String line = "";
            int wordIndex = 0;
            public void run() {

                while (true) {
                    runOnUiThread(new Runnable() {
                        public void run() {
                            line = "";
                            while(line.length() < charactersPerLine && wordIndex < wordsInMessage.size()){
                                line = line + wordsInMessage.get(wordIndex)+" ";
                                wordIndex++;
                            }
                            if (wordIndex >= wordsInMessage.size()){
                                wordIndex = 0;
                            }
                            text.setText(line);
                        }
                    });
                    try

                    {
                        Thread.sleep(200);
                    } catch (Exception e) {

                    }
                }
            }
        } ).start();

    }
}
