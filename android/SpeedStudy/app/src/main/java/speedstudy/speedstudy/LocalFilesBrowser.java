package speedstudy.speedstudy;

import android.app.ActionBar;
import android.app.AlertDialog;
import android.app.ListActivity;
import android.app.LoaderManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.Loader;
import android.database.Cursor;
import android.os.Environment;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleCursorAdapter;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class LocalFilesBrowser extends ListActivity{
    ArrayAdapter mAdapter;
    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";
    File[] files;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        Intent intent = getIntent();

        String dir = intent.getStringExtra(MainActivity.FILE_DIR);
        ProgressBar progressBar = new ProgressBar(this);
        progressBar.setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.WRAP_CONTENT, AbsListView.LayoutParams.WRAP_CONTENT, Gravity.CENTER));
        progressBar.setIndeterminate(true);
        getListView().setEmptyView(progressBar);

        ViewGroup root = (ViewGroup) findViewById(android.R.id.content);
        root.addView(progressBar);
        //String[] words = {};
        ArrayList<String> fileList = new ArrayList<String>();
        File rootDir = new File(dir);
        //fileList.add(rootDir.getPath());

        files = rootDir.listFiles();
        // fileList.add(""+files.length);
        for (int i=0;i<files.length;i++){
            fileList.add(files[i].getPath());
        }

        int[] toViews = {android.R.id.text1};

        mAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1,fileList);
        setListAdapter(mAdapter);
        //getLoaderManager().initLoader(0,null,this);
        setContentView(R.layout.activity_local_files_browser);

    }


    public void onListItemClick(ListView v, View view, int i, long id) {
        //Intent intent = new Intent(this, DisplayMessageActivity.class);
        Intent intent;
        String message = "The Reader Did Not Work";
        if (files[i].isDirectory()) {
            intent = new Intent(this, LocalFilesBrowser.class);

            String fileDir = files[i].getPath();
            intent.putExtra(FILE_DIR, fileDir);
            startActivity(intent);
        } else {
            intent = new Intent(this, DisplayDocument.class);

            try {
                BufferedReader reader = new BufferedReader(new FileReader(files[i]));
                message = "";
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("Read: "+line);
                    message += line+"\n";
                }

            } catch (Exception e) {
            }
            intent.putExtra(EXTRA_MESSAGE, message);
            startActivity(intent);
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
