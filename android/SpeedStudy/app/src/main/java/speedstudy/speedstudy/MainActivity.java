package speedstudy.speedstudy;

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.FragmentTransaction;
import android.app.Notification;
import android.app.TabActivity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TabHost;
import android.widget.TextView;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;


/**
 * The home activity of the application. From here you can update, login and logout.
 * You will recieve propts if there are errors logging or updating.
 * From here you launch the file browser.
 */

public class MainActivity extends TabActivity {
    boolean firstWait = true;
    public boolean loginMenu = true;
    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";
    public final static int LOGIN_ID = 300;

    public final static int LOGOUT_ID = 301;
    public final static int UPDATE_ID = 302;
    public final static int CLEAR_MEMORY_ID = 303;

    public final static int CHECK_REVIEWS_ID = 304;
    private Menu myMenu;
    private boolean updateMenu = false;
    TabHost mTabHost;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mTabHost = getTabHost();
        //new Updater(this).execute();
        //setContentView(R.layout.activity_main);
        try {
            getActionBar().setDisplayHomeAsUpEnabled(false);
        }
        catch (Exception e){};
        SharedPreferences prefs = getSharedPreferences("PREFS", 0);
        GlobalApp globals= (GlobalApp)getApplicationContext();
        if (globals.isFreshLogin()){
            new Login(this, globals.getName(), globals.getPass()).execute();
            globals.notFreshLogin();
            globals.doWait();
        }
        else if (globals.isLoginNeeded()){
            new Login(this, prefs.getString("loginName",null), prefs.getString("loginPass",null)).execute();
            globals.loginNotNeeded();
            globals.doWait();
        }
        else if (globals.isUpdateNeeded()){
            new Updater(this).execute();
            globals.updateNotNeeded();
            globals.doWait();
        }

        ArrayList<JSONObject> reviewCards = findReviews(getFilesDir());

        //Button reviewButton = (Button) findViewById(R.id.to_reviews_button);
        //reviewButton.setText("Do Reviews ("+reviewCards.size()+")");
        globals.setReviews(reviewCards);
        mTabHost.addTab(mTabHost.newTabSpec("browser").setIndicator("File Browser").setContent(new Intent(this, LocalFilesBrowser.class).putExtra(FILE_DIR, getFilesDir().getPath())));

        mTabHost.addTab(mTabHost.newTabSpec("reviews").setIndicator("Reviews: "+reviewCards.size()).setContent(new Intent(this, CardTypeTwo.class)));
       // mTabHost.setCurrentTab(0);
        //tabConstruction();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
        if (keyCode == KeyEvent.KEYCODE_BACK){
            return true;

        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onBackPressed(){

    }
    /**
     * Wait for response from server and then update the menu bar accordingly.
     * Will set the menu bar to either have 'Login' or 'Logout' and 'Update'
     *
     */
    private void waitToUpdateMenuBar(){
        new Thread(new Runnable(){
            GlobalApp globals= (GlobalApp)getApplicationContext();
            String line = "";
            int wordIndex = 0;
            public void run() {


                runOnUiThread(new Runnable() {
                    public void run() {
                        while(globals.getWait()) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        if (myMenu!=null) {
                            if (!(globals.getUpdateMenu() == updateMenu)) {
                                if (globals.getUpdateMenu() == true) {
                                    loginMenu = false;
                                    myMenu.removeItem(LOGIN_ID);
                                    myMenu.add(Menu.NONE, LOGOUT_ID, Menu.NONE, "Logout");
                                    myMenu.add(Menu.NONE, UPDATE_ID, Menu.NONE, "Update");

                                } else {
                                    loginMenu = true;
                                    myMenu.removeItem(LOGOUT_ID);
                                    myMenu.removeItem(UPDATE_ID);
                                    myMenu.add(Menu.NONE, LOGIN_ID, Menu.NONE, "Login");
                                }
                                updateMenu = globals.getUpdateMenu();
                            }
                        }
                    }
                });
                //updateFileList();


                onPrepareOptionsMenu(myMenu);
              //  if (!firstWait == true) {
                  /*  runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Activity activity = getCurrentActivity();
                            if (activity instanceof LocalFilesBrowser) {
                                ((LocalFilesBrowser) activity).resetMemory();
                            }
                        }
                    });*/
               // }
                firstWait = false;

            }

        } ).start();
    }
    public void updateList(){
        Activity activity = getCurrentActivity();
        if (activity instanceof LocalFilesBrowser) {
            ((LocalFilesBrowser) activity).resetMemory();
        }
    }
    @Override
    public boolean onPrepareOptionsMenu(Menu m){
        if (Build.VERSION.RELEASE.compareTo("5.0") < 0){

            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    myMenu.clear();
                    myMenu.add(Menu.NONE, CHECK_REVIEWS_ID, Menu.NONE, "Check for new Reviews");

                    myMenu.add(Menu.NONE, CLEAR_MEMORY_ID, Menu.NONE, "Clear Memory");
                    if (loginMenu == true) {

                        myMenu.add(Menu.NONE, LOGIN_ID, Menu.NONE, "Login");
                    }
                    else{

                        myMenu.add(Menu.NONE, LOGOUT_ID, Menu.NONE, "Logout");
                        myMenu.add(Menu.NONE, UPDATE_ID, Menu.NONE, "Update");
                    }
                }
            });

        }
        return super.onPrepareOptionsMenu(m);
    }
    public void updateFileList(){
        Activity activity = getCurrentActivity();
        if (activity instanceof LocalFilesBrowser){
            ((LocalFilesBrowser) activity).resetMemory();
        }
    }

    /**
     * Delete all login information from local storage.
     */
    public void logout(){
        SharedPreferences pref = getSharedPreferences("PREFS", 0);
        SharedPreferences.Editor editor = pref.edit();
        editor.remove("loginName");
        editor.remove("loginPass");
        editor.remove("token");
        editor.remove("tokenExp");
        editor.commit();
        Intent intent = new Intent(this, LoginScreen.class);
        startActivity(intent);
    }


    /**
     *  Begin the login process by either calling the async login task, or switching to the login activity if required.
     */
    public void login(){
        SharedPreferences pref = getSharedPreferences("PREFS",0);
        GlobalApp globals= (GlobalApp)getApplicationContext();
        if (  (pref.getString("loginName",null) != null) & (pref.getString("loginPass",null) != null)){

            new Login(this, pref.getString("loginName",null), pref.getString("loginPass",null)).execute();
            globals.doWait();
            waitToUpdateMenuBar();
        }
        else{
            Intent intent = new Intent(this, LoginScreen.class);
            startActivity(intent);
        }

    }

    /**
     * Begin the update process by calling the async update task.
     */
    public void update(){
        GlobalApp globals= (GlobalApp)getApplicationContext();
        globals.doWait();
        new Updater(this).execute();
        waitToUpdateMenuBar();
    }

    @Override
    public void onResume(){
        super.onResume();
        ArrayList<JSONObject> tempReviews = findReviews(getFilesDir());

        TabHost tabHost = getTabHost();
        TextView tv = (TextView) tabHost.getTabWidget().getChildAt(1).findViewById(android.R.id.title);
        tv.setText("Reviews: "+tempReviews.size());

        //mTabHost.addTab(mTabHost.newTabSpec("reviews").setIndicator("Reviews "+tempReviews.size()).setContent(new Intent(this, CardTypeTwo.class)));

//        mTabHost.addTab(mTabHost.newTabSpec("reviews").setIndicator("ok1").setContent(new Intent(this, CardTypeTwo.class)));

        GlobalApp globals= (GlobalApp)getApplicationContext();
        globals.setReviews(tempReviews);

        Activity activity = getCurrentActivity();
        if (activity instanceof LocalFilesBrowser){
            ((LocalFilesBrowser) activity).resetMemory();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.

        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.main_activity_actions, menu);
        menu.add(Menu.NONE,LOGIN_ID,Menu.NONE,"Login");

        menu.add(Menu.NONE, CHECK_REVIEWS_ID, Menu.NONE, "Check for new Reviews");

        menu.add(Menu.NONE, CLEAR_MEMORY_ID, Menu.NONE, "Clear Memory");
        myMenu = menu;
        waitToUpdateMenuBar();
        mTabHost.setCurrentTab(0);
        return super.onCreateOptionsMenu(menu);
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        switch (item.getItemId()){
            case LOGIN_ID:
                login();
                waitToUpdateMenuBar();
                return true;
            case LOGOUT_ID:
                logout();
                waitToUpdateMenuBar();
                return true;
            case UPDATE_ID:
                update();
                waitToUpdateMenuBar();
                return true;
            case CLEAR_MEMORY_ID:
                clearMemory();

                Activity activity = getCurrentActivity();
                if (activity instanceof LocalFilesBrowser){
                    ((LocalFilesBrowser) activity).resetMemory();
                }

                return true;
            case CHECK_REVIEWS_ID:
                ArrayList<JSONObject> tempReviews = findReviews(getFilesDir());


                TabHost tabHost = getTabHost();
                TextView tv = (TextView) tabHost.getTabWidget().getChildAt(1).findViewById(android.R.id.title);
                tv.setText("Reviews: "+tempReviews.size());
                GlobalApp globals= (GlobalApp)getApplicationContext();
                globals.setReviews(tempReviews);
                Activity activity2 = getCurrentActivity();
                if (activity2 instanceof CardTypeTwo){
                    ((CardTypeTwo) activity2).onResume();
                }
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    /**
     * Changes to the activity to browse the files stored locally.
     * @param view passed automatically when the Open Local File Browser button is tapped.
     */
    public void openLocalFileBrowser(View view){
        Intent intent = new Intent(this, LocalFilesBrowser.class);

        String fileDir = getFilesDir().getPath();
        intent.putExtra(FILE_DIR, fileDir);
        startActivity(intent);

    }

    public void openReviews(View view){
        Intent intent = new Intent(this, CardTypeTwo.class);
        startActivity(intent);

    }
    public ArrayList<JSONObject> findReviews(File dir){
        ArrayList<JSONObject> cards = new ArrayList<JSONObject>();
        File[] files = dir.listFiles();
        for (int i=0;i<files.length;i++){
            if (files[i].isDirectory()){
                cards.addAll(findReviews(files[i]));
            }
            else{
                if (files[i].getPath().contains(".cards")){
                    cards.addAll(readCards(files[i]));
                }
            }
        }
        return cards;

    }

    public ArrayList<JSONObject> readCards(File dir){

        BufferedReader reader;
        ArrayList<JSONObject> cards = new ArrayList<JSONObject>();

        try {
            reader = new BufferedReader(new FileReader(dir));

            String line;
            while ((line = reader.readLine()) != null) {
                JSONObject temp = new JSONObject(line);
                Date now = new Date();
                Date reviewDate = new Date(temp.getLong("nextReview"));

                if (reviewDate.before(now)) {

                    temp.put("dir",dir.getPath());
                    cards.add(temp);
                }

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return cards;

    }

    /**
     * Deletes all stored documents from local storage
     */
    public void clearMemory(){

        File[] files = getFilesDir().listFiles();
        for (int i=0;i<files.length;i++){
            delete(files[i]);
        }

        ArrayList<JSONObject> tempReviews = findReviews(getFilesDir());


        TabHost tabHost = getTabHost();
        TextView tv = (TextView) tabHost.getTabWidget().getChildAt(1).findViewById(android.R.id.title);
        tv.setText("Reviews: "+tempReviews.size());
        GlobalApp globals= (GlobalApp)getApplicationContext();
        globals.setReviews(tempReviews);
    }

    /**
     * Recursively delete all files and folders from local storage.
     * @param file - root file to start recursively deleting from.
     */
    public void delete(File file){
        if (file.isDirectory()){
            File[] subfiles = file.listFiles();
            for (int i=0;i<subfiles.length;i++){
                delete(subfiles[i]);
            }
        }
        file.delete();
    }


}
