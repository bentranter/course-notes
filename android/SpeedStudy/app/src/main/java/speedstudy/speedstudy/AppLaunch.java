package speedstudy.speedstudy;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Activity the app launches into. Decides where the app should continue to.
 */
public class AppLaunch extends Activity {
    /**
     * Automatically called when the activity is launched. Determines if a login is required, or a
     * new token is required, sets global variables indicating what needs to be done, then launches
     * the next activity.
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GlobalApp globals= (GlobalApp)getApplicationContext();
        SharedPreferences prefs = getSharedPreferences("PREFS", 0);
        if (prefs.getBoolean("alarm_set", false)==false){
            SharedPreferences.Editor editor = prefs.edit();
            editor.putBoolean("alarm_set", true);
            editor.commit();
            Intent intentTemp = new Intent("broadcast");
            PendingIntent toAlarm = PendingIntent.getBroadcast(this, 0, intentTemp, 0);
            Calendar c = Calendar.getInstance();
            c.add(Calendar.SECOND, 10);
            long firstTime = c.getTimeInMillis();
            AlarmManager am = (AlarmManager)getSystemService(Context.ALARM_SERVICE);
            am.setRepeating(AlarmManager.RTC, c.getTimeInMillis(), 1000*60, toAlarm);
        }
        setContentView(R.layout.activity_app_launch);

        if (loginRequired()){
            login();
        }
        else if (tokenRequired()){
            tokenLogin();
        }
        else{
            update();
        }

    }

    /**
     * Move to the login activity
     */
    protected void login(){
        Intent intent = new Intent(this, LoginScreen.class);
        startActivity(intent);
    }

    /**
     * Set a global variable indicating a new token must be retrieved, then launch main activity
     */
    protected void tokenLogin(){
        GlobalApp globals= (GlobalApp)getApplicationContext();
        globals.loginNeeded();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    /**
     * Set a global variable indicating an update is to be performed, then launch main activity
     */
    protected void update(){
        GlobalApp globals= (GlobalApp)getApplicationContext();
        globals.updateNeeded();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);

    }

    /**
     * Checks to see if a login is required.
     * @return A boolean indicating if new login information is required.
     */
    protected boolean loginRequired(){
        SharedPreferences prefs = getSharedPreferences("PREFS", 0);

        if (prefs.getString("loginName",null)==null){
            return true;
        }
        if (prefs.getString("loginPass",null)==null){
            return true;
        }

        return false;
    }

    /**
     * Checks to see if a new token is required.
     * @return A boolean indicating a new token will be required.
     */
    private boolean tokenRequired(){
        SharedPreferences prefs = getSharedPreferences("PREFS", 0);
        if (prefs.getString("token",null) == null){
            return true;
        }
        if (prefs.getString("tokenExp",null)!= null && expiredToken(prefs.getString("tokenExp",null))){
            return true;
        }
        return false;
    }

    /**
     * Check to see if the currently stored token is expired.
     * @param d1 The expiry date of the token being tested
     * @return A boolean indicating the token has expired.
     */
    private boolean expiredToken(String d1) {

        Date date1 = null;
        Date date2 = null;

        date1 = new Date(Long.parseLong(d1));
        date2 = new Date();

        if (date1.after(date2)) {
            return false;
        }
        return true;

    }

    /**
     * Set up the Action Bar menu.
     * @param menu - Automatically passed during activity setup
     * @return boolean
     */
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_app_launch, menu);
        return true;
    }

    /**
     * Handle items on the action bar being clicked.
     * @param item - automatically passed on action bar item tap
     * @return boolean
     */
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
