package speedstudy.speedstudy;

import android.app.TabActivity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TabHost;

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

/**
 * Activity to display the content of either DisplayDocument or SpeedReader, and a Tab Bar to
 * switch between them.
 */
public class DocumentLoader extends TabActivity {

    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";

    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";

    TabHost mTabHost;

    /**
     * Called Automatically when the activity is launched. Sets up tabs to be used in switching
     * between DisplayDocument and SpeedReader
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_document_loader);
        mTabHost = getTabHost();
        Intent intent = getIntent();

        String dir = intent.getStringExtra(MainActivity.FILE_DIR);
        String content = "";
        updateTimesRead(dir);
        try {
            BufferedReader reader = new BufferedReader(new FileReader(dir));
            content = "";
            String line;
            while ((line = reader.readLine()) != null) {

                content += line+"\n";
            }

        } catch (Exception e) {
        }

        mTabHost.addTab(mTabHost.newTabSpec("Display Document").setIndicator("Display Document").setContent(new Intent(this, DisplayDocument.class).putExtra(EXTRA_MESSAGE,content)));
        String messageForSpeedReader = clean(content);
        mTabHost.addTab(mTabHost.newTabSpec("Speed Reader").setIndicator("Speed Reader").setContent(new Intent(this, SpeedReader.class).putExtra(EXTRA_MESSAGE,messageForSpeedReader)));

        mTabHost.addTab(mTabHost.newTabSpec("Study").setIndicator("Study").setContent(new Intent(this, CardTypeOne.class).putExtra(FILE_DIR, dir+".cards")));
        mTabHost.setCurrentTab(0);
    }


    /**
     * Set up the Action Bar menu.
     * @param menu - Automatically passed during activity setup
     * @return boolean
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_document_loader, menu);
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

    public String clean(String message){

        GlobalApp globals= (GlobalApp)getApplicationContext();
        String rMessage = message.replace(globals.tagFront,"");

        rMessage = rMessage.replace(globals.tagEnd,"");
        return rMessage;
    }

    public void updateTimesRead(String folder){

        GlobalApp globals= (GlobalApp)getApplicationContext();
        folder=folder.substring(getFilesDir().getPath().length());
        folder = removeStaringSlash(folder);
        String account = folder.substring(0,folder.indexOf('/'));
        folder = folder.substring(account.length());
        folder = removeStaringSlash(folder);
        String f = folder.substring(0, folder.lastIndexOf('/'));
        folder = folder.substring(f.length());
        folder = removeStaringSlash(folder);
        String file = folder;

        BufferedReader reader;
        ArrayList<JSONObject> files = new ArrayList<JSONObject>();
        if (new File(getFilesDir() + "/_userdocuments_/" + account + ".inf").exists()) {
            try {
                reader = new BufferedReader(new FileReader(getFilesDir() + "/_userdocuments_/" + account + ".inf"));
                String line;
                while ((line = reader.readLine()) != null) {
                    files.add(new JSONObject(line));
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        Iterator<JSONObject> iterator = files.iterator();
        while (iterator.hasNext()){
            JSONObject temp = iterator.next();
            try {
                if (temp.getString("folder").equals(f)){
                    if (temp.getString("title").equals(file)){
                        int timesread = temp.getInt("times_read");
                        temp.put("times_read",timesread+1);
                        if (new Date().after(new Date(temp.getLong("nextReview")))){
                            temp.put("documentLevel", temp.getInt("documentLevel")+1);
                            temp.put("nextReview", new Date().getTime()+globals.timeToNextDocumentReview(temp.getInt("documentLevel")));
                        }
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }


        BufferedWriter fos = null;
        try {
            fos = new BufferedWriter(new FileWriter(getFilesDir() + "/_userdocuments_/" + account + ".inf", false));
            String lineToAdd;
            iterator = files.iterator();
            while(iterator.hasNext()){
                JSONObject thisFile = iterator.next();

                lineToAdd = thisFile.toString();

                fos.write(lineToAdd);
                fos.newLine();
            }
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }



    }
    public String removeStaringSlash(String folder){
        if (folder.charAt(0) == '/'){
            folder = folder.substring(1);
        }
        return folder;
    }
}
