package speedstudy.speedstudy;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.StringTokenizer;
import java.util.UUID;

/**
 * Displays the text from the selected file.
 */
public class DisplayDocument extends Activity {
    public String message = null;

    public String cleanMessage;
    /**
     * Called automatically when the activity is launched. Sets up the text area to display the
     * information passed to it from DocumentLoader
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_display_document);
        Intent intent = getIntent();

        String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);
        cleanMessage = clean(message);
        TextView text_field = (TextView) findViewById(R.id.fixed_message);
        text_field.setTextSize(16);
        text_field.setText(cleanMessage);

    }


    /**
     * Handle items on the action bar being clicked.
     * @param item - automatically passed on action bar item tap
     * @return boolean
     */
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

    public String clean(String message){

        GlobalApp globals= (GlobalApp)getApplicationContext();
        String rMessage = message.replace(globals.tagFront,"");

        rMessage = rMessage.replace(globals.tagEnd,"");
        rMessage = rMessage.replace(globals.ls,System.getProperty("line.separator"));
        return rMessage;
    }
}
