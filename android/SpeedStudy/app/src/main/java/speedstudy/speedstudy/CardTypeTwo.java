package speedstudy.speedstudy;

import android.app.Activity;
import android.app.ActivityGroup;
import android.app.TabActivity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TabHost;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Random;


public class CardTypeTwo extends Activity {
    int currentCard;
    Random r;

    ArrayList<JSONObject> cards;
    ArrayList<JSONObject> finishedCards;
    GlobalApp globals;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        r = new Random(System.currentTimeMillis());
        globals = (GlobalApp)getApplicationContext();

        finishedCards = new ArrayList<JSONObject>();
        cards = globals.getReviews();
        Iterator<JSONObject> cardsIterator = cards.listIterator();
        while(cardsIterator.hasNext()){
            try {
                cardsIterator.next().put("need_update", false);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        setContentView(R.layout.activity_card_type_two);
        try {
            showRandomCard();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void onResume(){
        super.onResume();
        try {
            cards = globals.getReviews();
            finishedCards = new ArrayList<JSONObject>();
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
    public void easy(View view) throws JSONException {
        if (cards.size() > 0) {
            int level;
            JSONObject temp = cards.get(currentCard);
            if (temp.getBoolean("failed_this_level") == false) {
                temp.put("level", level = temp.getInt("level") + 1);
            } else {
                level = temp.getInt("level");
                temp.put("failed_this_level", false);
            }
            temp.put("times_seen", temp.getInt("times_seen") + 1);

            long nextReview = new Date().getTime() + globals.timeToNextReview(level);
            temp.put("nextReview", nextReview);
            finishedCards.add(temp);
            cards.remove(currentCard);
            updateTabTitle();
            showRandomCard();
        }
    }

    public void hard(View view) throws JSONException {
        if (cards.size() > 0) {
            JSONObject temp = cards.get(currentCard);
            int level = temp.getInt("level");
            if (temp.getBoolean("failed_this_level") == true) {
                if (level > 1) {
                    level--;
                }
                temp.put("level", temp.getInt("level"));
                temp.put("failed_this_level", false);
            }


            temp.put("times_seen", temp.getInt("times_seen") + 1);

            long nextReview = new Date().getTime() + globals.timeToNextReview(level);
            temp.put("nextReview", nextReview);
            finishedCards.add(temp);
            cards.remove(currentCard);
            updateTabTitle();
            showRandomCard();
        }
    }

    public void updateTabTitle(){
        TabHost tabHost = ((TabActivity)this.getParent()).getTabHost();
        TextView tv = (TextView) tabHost.getTabWidget().getChildAt(1).findViewById(android.R.id.title);
        tv.setText("Reviews: "+cards.size());
    }
    public void unknown(View view) throws JSONException {
        if (cards.size() > 0) {
            JSONObject temp = cards.get(currentCard);
            if (!temp.getBoolean("failed_this_level")) {
                temp.put("failed_this_level", true);
                if (temp.getInt("level") > 1) {
                    temp.put("level", temp.getInt("level") - 1);
                }
                temp.put("times_seen", temp.getInt("times_seen") + 1);
                temp.put("need_update", true);
            }
            showRandomCard();
        }
    }
    public void showNoButton(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.easy_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.hard_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.unknown_button);
        temp.setVisibility(View.GONE);
    }
    public void showRevealButton(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.easy_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.hard_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.unknown_button);
        temp.setVisibility(View.GONE);
    }

    public void showAnswerButtons(){
        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.easy_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.hard_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.unknown_button);
        temp.setVisibility(View.VISIBLE);
    }

    public void reveal(View view) throws JSONException {
        TextView text = (TextView) findViewById(R.id.card_text);
        text.setText(cards.get(currentCard).getString("back"));

        Button temp = (Button) findViewById(R.id.reveal_button);
        temp.setVisibility(View.GONE);

        temp = (Button) findViewById(R.id.easy_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.hard_button);
        temp.setVisibility(View.VISIBLE);

        temp = (Button) findViewById(R.id.unknown_button);
        temp.setVisibility(View.VISIBLE);

    }

    @Override
    public void onPause(){
        super.onPause();
        ArrayList<String> filesToUpdate = new ArrayList<String>();

        Iterator<JSONObject> cardsIterator = finishedCards.listIterator();
        while(cardsIterator.hasNext()){
            JSONObject temp = cardsIterator.next();
            try {
                if (!filesToUpdate.contains(temp.getString("dir"))){
                    filesToUpdate.add(temp.getString("dir"));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        cardsIterator = cards.listIterator();
        while(cardsIterator.hasNext()){
            JSONObject temp = cardsIterator.next();
            try {
                if (temp.getBoolean("need_update")) {
                    if (!filesToUpdate.contains(temp.getString("dir"))) {
                        filesToUpdate.add(temp.getString("dir"));
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }



        for (int i=0;i<filesToUpdate.size();i++){
            String path = filesToUpdate.get(i);
            ArrayList<JSONObject> updatedForPath = new ArrayList<JSONObject>();


            BufferedReader reader;
            ArrayList<JSONObject> fromFile = new ArrayList<JSONObject>();

            try {
                reader = new BufferedReader(new FileReader(path));

                String line;
                while ((line = reader.readLine()) != null) {
                    JSONObject temp = new JSONObject(line);
                    fromFile.add(temp);

                }
                reader.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }



            cardsIterator = finishedCards.listIterator();
            while(cardsIterator.hasNext()){
                JSONObject temp = cardsIterator.next();
                try {

                    if (temp.getString("dir").equals(filesToUpdate.get(i))) {

                        updatedForPath.add(temp);
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            cardsIterator = cards.listIterator();
            while(cardsIterator.hasNext()){
                JSONObject temp = cardsIterator.next();
                try {
                    if (temp.getBoolean("need_update")) {
                        if (temp.getString("dir").equals(filesToUpdate.get(i))) {

                            updatedForPath.add(temp);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            for (int j=0;j<updatedForPath.size();j++){
                try {
                    removeFileWithId(fromFile, updatedForPath.get(j).getString("id"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                fromFile.add(updatedForPath.get(j));
            }
            try {
                BufferedWriter fos = new BufferedWriter(new FileWriter(filesToUpdate.get(i), false));
                for (int j = 0;j<fromFile.size();j++){
                    String t = fromFile.get(j).toString();

                    fos.write(t);
                    fos.newLine();
                }
                fos.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    public void removeFileWithId(ArrayList<JSONObject> list, String id) throws JSONException {
        for (int i=0;i<list.size();i++){
            if (list.get(i).getString("id").equals(id)){
                list.remove(i);
                break;
            }
        }
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
