package speedstudy.speedstudy;

import android.app.ActionBar;
import android.app.Activity;
import android.app.ActivityGroup;
import android.app.AlertDialog;
import android.app.ListActivity;
import android.app.LoaderManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.Loader;
import android.content.res.ColorStateList;
import android.database.Cursor;
import android.graphics.Color;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.OvalShape;
import android.os.Build;
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
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Opens a ListView displaying all the items of the current browsing directory, sorted by type
 * and then alphabetically. Selecting a document will launch that document in the Document Display,
 * and selecting a folder will display the content of the folder.
 */

public class LocalFilesBrowser extends ListActivity{
    CustomListAdapter mAdapter;
    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";
    ArrayList<String> fileList;
    File[] files;
    ArrayList<File> filesInList = new ArrayList<File>();
    ArrayList<ArrayList<JSONObject>> infoFiles = new ArrayList<ArrayList<JSONObject>>();
    ArrayList<String> accounts = new ArrayList<String>();

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
        String dirExtra = null;

        fileList = new ArrayList<String>();
        if (dir == null){
            dir = getFilesDir().getPath();
        }
        dirExtra = dir.substring(getFilesDir().getPath().length());
        String topDir = getFilesDir().getPath();


        File rootDir = new File(dir);
        files = rootDir.listFiles();
        sortFileList(files);

        for (int i=0;i<files.length;i++){

            if (files[i].isDirectory()){
                if (!files[i].getName().equals("_userdocuments_")) {
                    fileList.add(files[i].getName());
                    filesInList.add(files[i]);
                }
            }
            else{
                if (!files[i].getName().contains(".cards")) {
                    fileList.add(files[i].getName() + ".doc");
                    filesInList.add(files[i]);
                }
            }

        }

        for (int i=0;i<filesInList.size();i++){
            String folder = filesInList.get(i).getPath();
            folder=folder.substring(getFilesDir().getPath().length());
            folder = removeStaringSlash(folder);
            String account;
            if (folder.indexOf('/') < 0){
                account = folder;
            }
            else {
                account = folder.substring(0, folder.indexOf('/'));
            }
            BufferedReader reader;
            ArrayList<JSONObject> f = new ArrayList<JSONObject>();
            if (new File(getFilesDir() + "/_userdocuments_/" + account + ".inf").exists()) {
                try {
                    reader = new BufferedReader(new FileReader(getFilesDir() + "/_userdocuments_/" + account + ".inf"));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        f.add(new JSONObject(line));
                    }
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }


            infoFiles.add(f);
            accounts.add(account);
        }

        int[] toViews = {android.R.id.text1};

        mAdapter = new CustomListAdapter(this, R.layout.custom_list_row,fileList);
        setListAdapter(mAdapter);
        //getLoaderManager().initLoader(0,null,this);
        setContentView(R.layout.activity_local_files_browser);

    }


    /**
     * Controls what to do when a list item is clicked.
     * If the item is a folder, it will relaunch the list with the items contained in the folder.
     * If the item is a document, it will launch DocumentLoader, passing it the data from the document.
     *
     * @param v - ListView that the item clicked is from.
     * @param view - View that the item clicked if from.
     * @param i - Index of the item clicked in the list
     * @param id - id of the item clicked.
     */
    public void onListItemClick(ListView v, View view, int i, long id) {
        //Intent intent = new Intent(this, DisplayMessageActivity.class);
        if (filesInList.get(i).isDirectory()) {
            updateList(filesInList.get(i).getPath());
        }
        else {

            Intent intent = new Intent(this, DocumentLoader.class);

            String fileDir = filesInList.get(i).getPath();
            intent.putExtra(FILE_DIR, fileDir);
            startActivity(intent);


        }
         /*
        Intent intent;
        if (i >= filesInList.size()){
            return;
        }
        String message = "The Reader Did Not Work";
        if (filesInList.get(i).isDirectory()) {
            intent = new Intent(this, LocalFilesBrowser.class);

            String fileDir = filesInList.get(i).getPath();
            intent.putExtra(FILE_DIR, fileDir);

            replaceContentView("browser",intent);
        } else {

            intent = new Intent(this, DocumentLoader.class);

            String fileDir = filesInList.get(i).getPath();
            intent.putExtra(FILE_DIR, fileDir);
            //startActivity(intent);
            replaceContentView("browser",intent);

        }
*/
    }
    public void readCards(){
        infoFiles.clear();
        accounts.clear();
        File[] rootFiles = getFilesDir().listFiles();
        ArrayList<File> temp = new ArrayList<File>();
        sortFileList(rootFiles);
        for (int i=0;i<rootFiles.length;i++){

            if (rootFiles[i].isDirectory()){
                if (!rootFiles[i].getName().equals("_userdocuments_")) {

                    temp.add(rootFiles[i]);
                }
            }
            else{
                if (!rootFiles[i].getName().contains(".cards")) {

                    temp.add(rootFiles[i]);
                }
            }

        }
        for (int i=0;i<temp.size();i++){

            String folder = temp.get(i).getPath();
            folder=folder.substring(getFilesDir().getPath().length());
            folder = removeStaringSlash(folder);
            String account;
            if (folder.indexOf('/') < 0){
                account = folder;
            }
            else {
                account = folder.substring(0, folder.indexOf('/'));
            }
            BufferedReader reader;
            ArrayList<JSONObject> f = new ArrayList<JSONObject>();
            if (new File(getFilesDir() + "/_userdocuments_/" + account + ".inf").exists()) {
                try {
                    reader = new BufferedReader(new FileReader(getFilesDir() + "/_userdocuments_/" + account + ".inf"));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        f.add(new JSONObject(line));
                    }
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            infoFiles.add(f);
            accounts.add(account);
        }
    }
    public void resetMemory(){
        readCards();
        updateList(getFilesDir().getPath());

    }
    public void updateList(String selectedFile){
        String dirExtra;
        dirExtra = selectedFile.substring(getFilesDir().getPath().length());
        String topDir = getFilesDir().getPath();
        String f = topDir;
        int depth  = 0;
        fileList.clear();
        filesInList.clear();
        File[] files;
        files = new File(f).listFiles();
        sortFileList(files);
        for (int i=0;i<files.length;i++){
            if (files[i].isDirectory()){
                if (!files[i].getName().equals("_userdocuments_")) {
                    fileList.add(files[i].getName());
                    filesInList.add(files[i]);
                 }
            }
            else{
                if (!files[i].getName().contains(".cards")) {
                    fileList.add(files[i].getName() + ".doc");
                    filesInList.add(files[i]);
                }
            }
        }

        while(dirExtra.length() > 1){
            depth++;




            int placeToInsert;
            if (dirExtra.substring(1).indexOf('/') < 0){
                f+= dirExtra;
                String pad;
                if (depth-1 == 0){
                    pad = "";
                }
                else{
                    pad = new String(new char[depth-1]).replace("\0","    ");
                }
                placeToInsert = fileList.indexOf(pad+dirExtra.substring(1));
                dirExtra = "";
            }
            else {
                String pad;
                if (depth-1 == 0){
                    pad = "";
                }
                else{
                    pad = new String(new char[depth-1]).replace("\0","    ");
                }
                f += dirExtra.substring(0, dirExtra.substring(1).indexOf('/') + 1);
                placeToInsert = fileList.indexOf(pad+dirExtra.substring(1,dirExtra.substring(1).indexOf('/')+1));
                dirExtra = dirExtra.substring(dirExtra.substring(1).indexOf('/') + 1);

            }

            files = new File(f).listFiles();
            sortFileList(files);

            for (int i=0;i<files.length;i++){
                if (files[i].isDirectory()){
                    if (!files[i].getName().equals("_userdocuments_")) {

                        fileList.add(placeToInsert+i+1,new String(new char[depth]).replace("\0","    ")+files[i].getName());
                        filesInList.add(placeToInsert+i+1,files[i]);
                    }
                }
                else{
                    if (!files[i].getName().contains(".cards")) {
                        fileList.add(placeToInsert+i+1,new String(new char[depth]).replace("\0","    ")+files[i].getName() + ".doc");
                        filesInList.add(placeToInsert+i+1,files[i]);
                    }
                }
            }
        }

        mAdapter.notifyDataSetChanged();
        getListView().post(new Runnable() {
            @Override
            public void run() {


                for (int i=0;i<fileList.size();i++){

                    //LinearLayout layout = (LinearLayout) findViewById(R.id.circle_layout);
                    //layout.setBackgroundColor(worstColor(filesInList.get(i)));
                    ShapeDrawable circle= new ShapeDrawable( new OvalShape());
                    circle.setIntrinsicHeight( 20 );
                    circle.setIntrinsicWidth( 20);
                    circle.getPaint().setColor(worstColor(filesInList.get(i)));
                    View v = (View) getListView().getChildAt(i).findViewById(R.id.circle);
                    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
                        v.setBackgroundDrawable(circle);
                    }
                    else{
                        v.setBackground(circle);
                    }

                    //android.widget.TextView tv = (TextView) getListView().getChildAt(i).findViewById(R.id.text1);
                    //tv.setBackgroundColor(worstColor(filesInList.get(i)));
                }
            }
        });


    }


    public int worstColor(File f){
        if (!f.isDirectory()){
            return findColor(f);
        }
        else{
            int worstColor;
            File[] filesToCheck = f.listFiles();
            if (filesToCheck.length == 0){
                return Color.rgb(255,255,255);
            }
            else{
                worstColor = worstColor(filesToCheck[0]);
                for (int i=1;i<filesToCheck.length;i++){
                    int temp;
                    if (worseColor((temp=worstColor(filesToCheck[i])),worstColor)){
                        worstColor = temp;
                    }
                }
                return worstColor;
            }
        }
    }
    public int findColor(File f){

        GlobalApp globals= (GlobalApp)getApplicationContext();
        String folder =f.getPath();
        folder=folder.substring(getFilesDir().getPath().length());
        folder = removeStaringSlash(folder);
        String account;
        account = folder.substring(0, folder.indexOf('/'));

        int infoFileIndex = accounts.indexOf(account);



        folder = folder.substring(account.length());
        folder = removeStaringSlash(folder);
        String folder2 = folder.substring(0, folder.lastIndexOf('/'));
        folder = folder.substring(folder2.length());
        folder = removeStaringSlash(folder);
        String file = folder;


        Iterator<JSONObject> iterator = infoFiles.get(infoFileIndex).iterator();
        while (iterator.hasNext()){
            JSONObject temp = iterator.next();
            try {
                if (temp.getString("folder").equals(folder2)){
                    if (temp.getString("title").equals(file)){
                        return globals.getColor(temp.getInt("documentLevel"),temp.getLong("nextReview"));
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return Color.rgb(255,255,255);
    }
    public boolean worseColor(int c1, int c2){
        if (Color.blue(c1) == 255){
            return false;
        }
        if (Color.blue(c2) == 255){
            return true;
        }
        if (Color.red(c1) > Color.red(c2)){
            return true;
        }
        else if (Color.green(c1) < Color.green(c2)){
            return true;
        }
        else{
            return false;
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

    /**
     * Sorts the array Files
     * @param files - list of files to be sorted
     */
    public void sortFileList(File[] files){
        for (int i=0;i<files.length;i++){
            int highest = i;
            for (int j=i;j<files.length;j++){
                if (higherPriority(files[j],files[highest])){
                    highest = j;
                }
            }
            swap(files,i,highest);
        }
    }

    public void replaceContentView(String id, Intent newIntent) {
        View view =  ((ActivityGroup) this.getParent())
                .getLocalActivityManager()
                .startActivity(id,
                        newIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP))
                .getDecorView();
        ((Activity) this).setContentView(view);

    }


    /**
     * Checks to see if f1 has a higher priority then f2. Determined by Folders being higher
     * priority then files, then arranging alphabetically.
     * @param f1 - First File being compared
     * @param f2 - Second file being compared
     * @return boolean indicating if f1 is higher priority then f2.
     */
    public boolean higherPriority(File f1, File f2){
        if ( f1.getName().contains(".cards") | f1.getName().contains("_userdocuments_")){
            return false;
        }
        if ( f2.getName().contains(".cards") | f2.getName().contains("_userdocuments_")){
            return true;
        }
        if (f1.isDirectory() && f2.isDirectory()){

            if (f1.getName().compareToIgnoreCase(f2.getName())<0){
                return true;
            }
            else{
                return false;
            }
        }
        else if (f1.isDirectory()){
            return true;
        }
        else if (f2.isDirectory()){
            return false;
        }
        else{
            if (f1.getName().compareToIgnoreCase(f2.getName())<0){
                return true;
            }
            else{
                return false;
            }
        }
    }

    /**
     * Used in sorting the files list. Swaps element i with element j in files.
     * @param files - Array of files being sorted
     * @param i - First element being swapped
     * @param j - Second element being swapped
     */
    public void swap(File[] files, int i, int j){
        File temp = files[i];
        files[i] = files[j];
        files[j] = temp;
    }
    public String removeStaringSlash(String folder){
        if (folder.charAt(0) == '/'){
            folder = folder.substring(1);
        }
        return folder;
    }

}
