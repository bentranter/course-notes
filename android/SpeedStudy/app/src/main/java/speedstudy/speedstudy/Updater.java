package speedstudy.speedstudy;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.widget.EditText;
import android.widget.Toast;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;
import com.rethinkdb.ast.query.RqlQuery;
import com.rethinkdb.model.RqlFunction;
import com.squareup.okhttp.FormEncodingBuilder;
import com.squareup.okhttp.Headers;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;


import java.net.URI;
import java.net.URISyntaxException;
import java.nio.Buffer;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TimeZone;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Make's use of Squareup's OkHttp to connect to the server. This opensource software is used to
 * form the requests to the server as well as handle the response.
 * Grabs all the users files from the server, and compares their date last modified with the date of
 * the files saved locally, and updates all the files that were more recently updated on the server.
 * Also updates a file containing information about all the users locally stored documents.
 */
public class Updater extends AsyncTask<Void,Void,Integer> {
    Context context;
    String username;

    String address = "192.168.1.104";
    ProgressDialog progressDialog;
    public Updater(Context c) {
        context = c;

    }

    protected void onPreExecute(){
        progressDialog = new ProgressDialog(context);
        progressDialog.setMessage("Syncing with Server");
        progressDialog.show();
    }
    /**
     * Called when the update has finished executing, running on the UI thread.
     * Sets information for menu options.
     * Prompts errors if the login fails.
     * @param result - error code from update process
     */
    protected void onPostExecute(Integer result)
    {

        progressDialog.cancel();

        if (result == 403){

            AlertDialog.Builder alert = new AlertDialog.Builder(context);
            alert.setTitle("Invalid Token");
            alert.setMessage("Login Required");
            alert.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            alert.show();

        }
        else if (result != 0){

            AlertDialog.Builder alert = new AlertDialog.Builder(context);
           // alert.setTitle("Invalid Token");
            alert.setMessage("Could not connect to server");
            alert.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            alert.show();
        }
        ((MainActivity) context).updateList();


    }

    @Override
    /**
     * Executes the updaate process, which involves retrieving all of the users documents from the server,
     * checking to see which local files need to be updated, and updating the required files.
     * Does not run on the UI thread.
     * @return Error code as an integer, sent to onPostExecute
     */
    protected Integer doInBackground(Void... params) {
        Error err = new Error();
        GlobalApp globals= (GlobalApp)context.getApplicationContext();

        SharedPreferences pref = context.getSharedPreferences("PREFS",0);
        username = pref.getString("loginName",null);
        OkHttpClient okClient = new OkHttpClient();
        okClient.setConnectTimeout(3, TimeUnit.SECONDS);
        String dataResponse = null;

        String read = "";
        BufferedReader in;
        StringBuilder sb = null;
        try {
            dataResponse = run(okClient, pref.getString("token",null), err);
        } catch (Exception e) {
            e.printStackTrace();
            globals.isUpdateMenu();
            globals.stopWait();
            return 101;
        }

        if (err.get() != 0){
            if (err.get() == 403){
                globals.notUpdateMenu();
                globals.stopWait();
            }
            else{
                globals.isUpdateMenu();
                globals.stopWait();
            }
            return err.get();
        }
        JSONArray jsonArray = null;

        try {
            jsonArray = new JSONArray(dataResponse);

        } catch (JSONException e) {
            e.printStackTrace();
            globals.isUpdateMenu();
            globals.stopWait();
            return -1;
        }

        ArrayList<JSONObject> jsonFiles = new ArrayList<JSONObject>();
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject temp;
            try {
                temp = jsonArray.getJSONObject(i);
                temp.put("title",titleFix(temp.getString("title")));
                temp.put("folder",folderFix(temp.getString("folder")));
                jsonFiles.add(temp);
            } catch (JSONException e) {
                e.printStackTrace();
                globals.isUpdateMenu();
                globals.stopWait();
                return -1;
            }
        }


        ArrayList<JSONObject> updateFiles = readUserFiles();


        modifyFileListJson(jsonFiles, updateFiles);


        performUpdateJson(jsonFiles);
        updateFilesListJson(jsonFiles, updateFiles);
        globals.isUpdateMenu();
        globals.stopWait();
        return 0;
    }
    public String titleFix(String t){
       return t.replace("<br>","");
    }
    public String folderFix(String f){
        if (f.equals("")){
            return "default";
        }
        return f;
    }
    /**
     * Compares to dates to see if the first is newer, used to check which files need to be updated.
     * @param d1 - The first date as a string
     * @param d2 - The second date as a string
     * @return boolean indicating if the first date is more recent then the second date.
     */
    public boolean newerFile(String d1, String d2) {
        String datePattern = "yyyy-MM-dd'T'HH:mm:ss.SSS";
        SimpleDateFormat dateFormat = new SimpleDateFormat(datePattern);
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        dateFormat.setLenient(false);
        Date date1 = null;
        Date date2 = null;
        try {
            date1 = dateFormat.parse(d1);
            date2 = dateFormat.parse(d2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (date1.after(date2)) {
            return true;
        }
        return false;

    }

    /**
     * Reads the users information file and creates an ArrayList of JSONObjects of it.
     * @return An ArrayList of JSONObjects containing infromation on all the user's files saved locally.
     */
    public ArrayList<JSONObject> readUserFiles() {
        BufferedReader reader;
        ArrayList<JSONObject> files = new ArrayList<JSONObject>();
        if (new File(context.getFilesDir() + "/_userdocuments_/" + username + ".inf").exists()) {
            try {
                reader = new BufferedReader(new FileReader(context.getFilesDir() + "/_userdocuments_/" + username + ".inf"));
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

        return files;
    }

    /**
     * Requests the users files from the server. Uses an OkHttpClient to form the request and
     * response. Will set e to any error, to pass it back to doInBackground where it will be delt with.
     * @param client - The OkHttpClient to be used for the request
     * @param token - The users current login token
     * @param e - Any error will be stored in this class
     * @return The string that the server responds with.
     * @throws Exception
     */
    public String run(OkHttpClient client, String token, Error e) throws Exception {

        Request request = new Request.Builder()
                .url("http://"+address+":3000/api/notes?accessToken=" + token)

                .build();

        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()){
            e.set(response.code());
        }
        String fromServer = response.body().string();
        return fromServer;
    }


    /**
     * Updates local files with data retrieved from the server. Writes new files if required.
     * @param files - ArrayList of JSONObjects with the data to be written.
     */
    public void performUpdateJson(ArrayList<JSONObject> files) {

        for (int i = 0; i < files.size(); i++) {

            /*
            final String tString = files.get(i).get(0);

            Object specificFile = r.table("table").filter(new RqlFunction() {
                @Override
                public RqlQuery apply(RqlQuery row) {
                    return row.field("file").eq(tString);
                }
            }).pluck("file", "timestamp", "data").run(con);
            */
            String tempFileName = null;
            String tempTime = null;
            String tempData = null;
            String tempFolderName = null;
            try {
                tempFileName = files.get(i).getString("title");
                tempFolderName = files.get(i).getString("folder");
                tempTime = files.get(i).getString("dateUpdated");
                tempData = files.get(i).getString("content");
            } catch (JSONException e) {
                e.printStackTrace();
            }


            try {

                String folder = context.getFilesDir().getPath() + "/" + username + "/";
                while (tempFolderName.contains("/")) {
                    folder += tempFolderName.substring(0, tempFolderName.indexOf("/") + 1);
                    tempFolderName = tempFolderName.substring(tempFolderName.indexOf("/") + 1);
                }
                if (tempFolderName.length() > 0){
                    folder+=tempFolderName+"/";
                }
                File outputFolder = new File(folder);
                outputFolder.mkdirs();
                String filePath = outputFolder.getPath() + "/" +tempFileName;
                OutputStream fos = new BufferedOutputStream(new FileOutputStream(filePath, false));
                fos.write(tempData.getBytes());

               // fos.write(tempTime.getBytes());
                fos.close();
                editCardsFile(filePath, tempData);
            } catch (Exception e) {
                e.printStackTrace();
            }


        }
    }

    public void editCardsFile(String path,String data) throws JSONException {

        GlobalApp globals= (GlobalApp)context.getApplicationContext();

        path = path + ".cards";
        BufferedReader reader;
        ArrayList<JSONObject> oldCards = new ArrayList<JSONObject>();
        if (new File(path).exists()) {
            try {
                reader = new BufferedReader(new FileReader(path));

                String line;
                while ((line = reader.readLine()) != null) {
                    JSONObject temp = new JSONObject(line);
                    oldCards.add(temp);

                }
                reader.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        ArrayList<JSONObject> cards = new ArrayList<JSONObject>();

        int lineEnd;
        String tagFront = globals.tagFront;
        String tagEnd = globals.tagEnd;
        String ls = globals.ls;
        String cardBack;
        String line;
        JSONObject temp;
        int type;
        UUID uuid ;



        if (data.charAt(0) == '-') {
            cardBack = null;
            uuid = UUID.randomUUID();

            temp = new JSONObject();
            if (data.contains(ls)) {
                line = data.substring(0, lineEnd = data.indexOf(ls));
                data = data.substring(lineEnd);
            }
            else{
                line = data;
                data = "";
            }
            if (line.contains(tagFront)){
                if (line.contains(tagEnd)) {
                    cardBack = line.substring(line.indexOf(tagFront) + 3, line.indexOf(tagEnd));
                    line = line.substring(0, line.indexOf(tagFront)) + "_____" + line.substring(line.indexOf(tagEnd)+3);
                }
                else{
                    cardBack = line.substring(line.indexOf(tagFront) + 3);
                    line = line.substring(line.indexOf(tagFront));
                }
            }

            type = (cardBack == null ? 1 : 2);
            temp.put("level",1);
            temp.put("id",uuid.toString());
            temp.put("front",line);
            temp.put("back",cardBack);
            temp.put("type", type);
            temp.put("times_seen",0);
            temp.put("failed_this_level",false);
            temp.put("need_update",false);
            long nextReview = new Date().getTime() + globals.timeToNextReview(1);
            temp.put("nextReview",nextReview);
            temp.put("frontHash", line.hashCode());
            cards.add(temp);
        }

        while (data.contains(ls+"-")){

            cardBack = null;
            uuid = UUID.randomUUID();
            line = data.substring(data.indexOf(ls+"-")+ls.length());
            if (line.contains(ls)){
                line = line.substring(0,line.indexOf(ls));
                data = data.substring(data.indexOf(ls+"-")+ls.length());
            }
            else{
                data = "";
            }

            if (line.contains(tagFront)){
                if (line.contains(tagEnd)) {
                    cardBack = line.substring(line.indexOf(tagFront) + 3, line.indexOf(tagEnd));
                    line = line.substring(0, line.indexOf(tagFront)) + "_____" + line.substring(line.indexOf(tagEnd)+3);
                }
                else{
                    cardBack = line.substring(line.indexOf(tagFront) + 3);
                    line = line.substring(0,line.indexOf(tagFront));
                }
            }

            type = (cardBack == null ? 1 : 2);
            temp = new JSONObject();
            temp.put("level",1);
            temp.put("id",uuid.toString());
            temp.put("front",line);
            temp.put("back",cardBack);
            temp.put("type", type);
            temp.put("times_seen",0);
            temp.put("failed_this_level",false);
            temp.put("need_update",false);
            long nextReview = new Date().getTime() + globals.timeToNextReview(1);
            temp.put("nextReview",nextReview);
            temp.put("frontHash", line.hashCode());
            cards.add(temp);
        }


        Iterator<JSONObject> cardIterator = oldCards.iterator();
        while (cardIterator.hasNext()) {
            JSONObject jsonTemp = cardIterator.next();
            removeFileWithHash(cards, jsonTemp.getInt("frontHash"));
        }
        try {
            BufferedWriter fos = new BufferedWriter(new FileWriter(path, false));
            for (int i = 0;i<cards.size();i++){
                String t = cards.get(i).toString();

                fos.write(t);
                fos.newLine();
            }
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void removeFileWithHash(ArrayList<JSONObject> list, int hash) throws JSONException {
        for (int i=0;i<list.size();i++){
            if (list.get(i).getInt("frontHash") == hash){
                list.remove(i);
                break;
            }
        }
    }



    /**
     * Compares local files and files from the server, determining which files need to be updates. The files to be updated will be
     * the files remaining in serverFiles.
     * @param serverFiles - All files from the server as an ArrayList of JSONObjects.
     * @param localFiles - All local file information as an ArrayList of JSONObjects.
     */
    public void modifyFileListJson(ArrayList<JSONObject> serverFiles, ArrayList<JSONObject> localFiles) {
        ArrayList<Integer> serverRemoveList = new ArrayList<Integer>();
        ArrayList<Integer> localRemoveList = new ArrayList<Integer>();
        for (int i = 0; i < serverFiles.size(); i++) {
            for (int j = 0; j < localFiles.size(); j++) {
                try {
                    if (serverFiles.get(i).getString("id").equals(localFiles.get(j).getString("id"))) {
                        if (newerFile(serverFiles.get(i).getString("dateUpdated"), localFiles.get(j).getString("dateUpdated"))) {
                            if (localRemoveList.indexOf(j)<0) {
                                serverFiles.get(i).put("documentLevel",localFiles.get(j).getInt("documentLevel"));

                                serverFiles.get(i).put("nextReview",localFiles.get(j).getLong("nextReview"));

                                localRemoveList.add(j);
                            }

                            continue;
                        } else {
                            if (serverRemoveList.indexOf(i)<0){
                                serverRemoveList.add(i);

                            }


                            continue;
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
        }
        for (int i = serverRemoveList.size() - 1; i >= 0; i--) {
            serverFiles.remove((int)serverRemoveList.get(i));
        }
        for (int i = localRemoveList.size() - 1; i >= 0; i--) {
            localFiles.remove((int)localRemoveList.get(i));
        }

    }

    /**
     * Updates the information about locally stored files
     * @param newFiles - List of files that were updated.
     * @param oldFiles - List of files that were not updated.
     */
    public void updateFilesListJson(ArrayList<JSONObject> newFiles, ArrayList<JSONObject> oldFiles) {
        File f = new File(context.getFilesDir() + "/_userdocuments_/");

        GlobalApp globals= (GlobalApp)context.getApplicationContext();
        f.mkdirs();
        try {

            BufferedWriter fos = new BufferedWriter(new FileWriter(context.getFilesDir() + "/_userdocuments_/" + username + ".inf", false));
            String lineToAdd;
            for (int i = 0; i < newFiles.size(); i++) {

                JSONObject tempJson = new JSONObject();
                tempJson.put("id", newFiles.get(i).getString("id"));
                tempJson.put("title", newFiles.get(i).getString("title"));
                tempJson.put("dateUpdated", newFiles.get(i).getString("dateUpdated"));
                tempJson.put("folder", correctFolderFormat(newFiles.get(i).getString("folder")));
                tempJson.put("times_read",0);
                if (!newFiles.get(i).has("documentLevel")){
                    tempJson.put("documentLevel",1);
                }
                else{
                    tempJson.put("documentLevel",newFiles.get(i).getInt("documentLevel"));
                }

                if (!newFiles.get(i).has("nextReview")){
                    tempJson.put("nextReview", new Date().getTime() + globals.timeToNextDocumentReview(1));
                }
                else{
                    tempJson.put("nextReview", newFiles.get(i).getLong("nextReview"));
                }

                lineToAdd = tempJson.toString();

                fos.write(lineToAdd);
                fos.newLine();
            }
            for (int i = 0; i < oldFiles.size(); i++) {
                JSONObject tempJson = new JSONObject();
                tempJson.put("id", oldFiles.get(i).getString("id"));

                tempJson.put("title", oldFiles.get(i).getString("title"));
                tempJson.put("dateUpdated", oldFiles.get(i).getString("dateUpdated"));
                tempJson.put("times_read",0);
                tempJson.put("folder", oldFiles.get(i).getString("folder"));

                tempJson.put("documentLevel",oldFiles.get(i).getInt("documentLevel"));

                tempJson.put("nextReview", oldFiles.get(i).getLong("nextReview"));
                lineToAdd = tempJson.toString();
                fos.write(lineToAdd);
                fos.newLine();
            }

            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String correctFolderFormat(String f){
        if (f.charAt(0) == '/'){
            f=f.substring(1);
        }

        if (f.charAt(f.length()-1) == '/'){
            f=f.substring(0,f.length()-1);
        }
        return f;
    }
}