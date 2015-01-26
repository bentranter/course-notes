package speedstudy.speedstudy;

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.FragmentTransaction;
import android.app.Notification;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;




public class MainActivity extends Activity {
    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        new Updater(this).execute();
        setContentView(R.layout.activity_main);
        //tabConstruction();
    }

    public void tabConstruction(){
        ActionBar actionBar = getActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        actionBar.setDisplayShowTitleEnabled(true);
        ActionBar.TabListener tabListener = new ActionBar.TabListener(){
            public void onTabSelected(ActionBar.Tab tab, FragmentTransaction ft){
                int position = tab.getPosition();
            }
            public void onTabUnselected (ActionBar.Tab tab, FragmentTransaction ft){

            }
            public void onTabReselected(ActionBar.Tab tab, FragmentTransaction ft){

            }
        };
        String[] tabs = {"Tab One","Tab Two","Tab Three"};
        ActionBar.Tab tab;
        for (int i=0; i<tabs.length; i++){
            tab = actionBar.newTab().setText(tabs[i]).setTabListener(tabListener);
            actionBar.addTab(tab);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.

        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.main_activity_actions, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        switch (item.getItemId()){
            case R.id.action_search:
                openSearch();
                return true;
            case R.id.action_settings:
                openSettings();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void buttonTwoPress(View view){
        Intent intent = new Intent(this, LocalFilesBrowser.class);

        String fileDir = getFilesDir().getPath();
        intent.putExtra(FILE_DIR, fileDir);
        startActivity(intent);

    }

    public void clearMemory(View view){

        File[] files = getFilesDir().listFiles();
        for (int i=0;i<files.length;i++){
            delete(files[i]);
        }
    }


    public void delete(File file){
        if (file.isDirectory()){
            File[] subfiles = file.listFiles();
            for (int i=0;i<subfiles.length;i++){
                delete(subfiles[i]);
            }
        }
        file.delete();
    }
    public void createFile(View view){
        String root = getFilesDir().getPath();
        EditText folder_field = (EditText) findViewById(R.id.folder_name);
        String folder_name = folder_field.getText().toString();
        EditText file_field = (EditText) findViewById(R.id.file_name);
        String file_name = file_field.getText().toString();
        File outputFolder = new File(getFilesDir(),folder_name);
        outputFolder.mkdirs();


        try {

            OutputStream fos = new BufferedOutputStream(new FileOutputStream(outputFolder.getPath()+"/"+file_name));
            String data = ((EditText) findViewById(R.id.edit_message)).getText().toString();
            fos.write(data.getBytes());
            fos.close();
            new AlertDialog.Builder(this)
                    .setTitle("Alert")
                    .setMessage(outputFolder.getPath()+"/"+file_name+" should be created")
                    .setNeutralButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            // continue with delete
                        }
                    })

                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .show();

        }

        catch (Exception e){
            e.printStackTrace();
        }
    }
    public void sendMessage(View view) {
        Intent intent = new Intent(this, SpeedReader.class);
        EditText editText = (EditText) findViewById(R.id.edit_message);
        String message = editText.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, message);
        startActivity(intent);
    }
    public void openSearch() {
        EditText editText = (EditText) findViewById(R.id.edit_message);
        editText.setText("LOL I didnt make a search y u so bad find it yourself");
    }
    public void openSettings(){

    }
}
