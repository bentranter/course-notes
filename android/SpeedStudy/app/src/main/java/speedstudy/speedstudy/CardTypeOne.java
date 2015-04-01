package speedstudy.speedstudy;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;


public class CardTypeOne extends Activity {
    int currentCard;
    Random r;
    ArrayList<JSONObject> cards;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        r = new Random(System.currentTimeMillis());
        Intent intent = getIntent();
        String dir = intent.getStringExtra(MainActivity.FILE_DIR);
        System.out.println("Dir: "+dir);
        cards = readCards(dir);


        setContentView(R.layout.activity_card_type_one);
        try {
            showRandomCard();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    public void showRandomCard() throws JSONException {
        if (cards.size() > 0) {
            currentCard = r.nextInt(cards.size());
            TextView text = (TextView) findViewById(R.id.card_text);
            if (cards.get(currentCard).getInt("type") == 1) {
                text.setText(cards.get(currentCard).getString("front"));
                showAnswerButtons();
            } else if (cards.get(currentCard).getInt("type") == 2) {
                text.setText(cards.get(currentCard).getString("front"));
                showRevealButton();
            }
        }
        else{
            TextView text = (TextView) findViewById(R.id.card_text);
            text.setText("Review Complete!");
            showNoButton();
        }

    }
    public void correct(View view) throws JSONException {
        cards.remove(currentCard);
        showRandomCard();
    }
    public void incorrect(View view) throws JSONException {
        showRandomCard();
    }
    public void showNoButton(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.right_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.wrong_button);
        temp.setVisibility(View.GONE);
    }
    public void showRevealButton(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.right_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.wrong_button);
        temp.setVisibility(View.GONE);
    }

    public void showAnswerButtons(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.right_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.wrong_button);
        temp.setVisibility(View.VISIBLE);
    }

    public void reveal(View view) throws JSONException {
        TextView text = (TextView) findViewById(R.id.card_text);
        text.setText(cards.get(currentCard).getString("back"));

        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.right_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.wrong_button);
        temp.setVisibility(View.VISIBLE);

    }


    public ArrayList<JSONObject> readCards(String dir){

        BufferedReader reader;
        ArrayList<JSONObject> cards = new ArrayList<JSONObject>();
        if (new File(dir).exists()) {
            try {
                reader = new BufferedReader(new FileReader(dir));

                String line;
                while ((line = reader.readLine()) != null) {

                    cards.add(new JSONObject(line));
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return cards;

    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_card_type_one, menu);
        return true;
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
}
