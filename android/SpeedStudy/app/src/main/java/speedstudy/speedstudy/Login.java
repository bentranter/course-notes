package speedstudy.speedstudy;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.widget.EditText;

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
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

/**
 * An Asynchronous task that attempts to login to the server, making use of an OkHttpClient to
 * form the requests. Will store the username, password, token, and token expiration date if the
 * login is successful.
 */
public class Login extends AsyncTask<Void,Void,Integer> {
    Context context;
    String username;
    String password;
    String address = "192.168.1.104";
    ProgressDialog progressDialog;
    public Login(Context c, String uname, String pword) {
        context = c;
        progressDialog = new ProgressDialog(c);
        username = uname;
        password = pword;

    }

    protected void onPreExecute(){
        progressDialog = new ProgressDialog(context);
        progressDialog.setMessage("Logging In");
        progressDialog.show();

    }

    /**
     * Called when the login has finished executing, running on the UI thread.
     * Sets information for menu options.
     * Prompts errors if the login fails.
     * @param result - error code from login process
     */
    protected void onPostExecute(Integer result){
        progressDialog.cancel();
        GlobalApp globals= (GlobalApp)context.getApplicationContext();

        if (result == 0){

            new Updater(context).execute();
        }
        else if (result == 404){

            SharedPreferences pref = context.getSharedPreferences("PREFS",0);
            SharedPreferences.Editor editor = pref.edit();
            editor.remove("loginName");
            editor.remove("loginPass");
            editor.remove("token");
            editor.remove("tokenExp");
            editor.commit();
            AlertDialog.Builder alert = new AlertDialog.Builder(context);
            // alert.setTitle("Invalid Token");
            alert.setMessage("Invalid Login Information");
            alert.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            alert.show();


        }
        else{
            AlertDialog.Builder alert = new AlertDialog.Builder(context);
            // alert.setTitle("Invalid Token");
            alert.setMessage("Could not connect to server");
            alert.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            alert.show();
            globals.notUpdateMenu();
            globals.stopWait();
        }

    }

    @Override
    /**
     * Executes the login process, retrieving a token from the server.
     * Does not run on the UI thread.
     * @return Error code as an integer, sent to onPostExecute
     */
    protected Integer doInBackground(Void... params) {

        GlobalApp globals= (GlobalApp)context.getApplicationContext();
        OkHttpClient okClient = new OkHttpClient();
        okClient.setConnectTimeout(3, TimeUnit.SECONDS);
        JSONObject loginResponse = null;

        Error err = new Error();
        SharedPreferences pref = context.getSharedPreferences("PREFS",0);
        try {
            loginResponse = getToken(okClient, err);
        } catch (Exception e) {

            e.printStackTrace();
            return 101;
        }
        if (err.get() == 0){
            SharedPreferences.Editor edit = pref.edit();
            edit.putString("loginName",username);
            edit.putString("loginPass",password);
            try {
                edit.putString("token",loginResponse.getString("token"));
                edit.putString("tokenExp",loginResponse.getString("expires"));
            } catch (JSONException e) {
                e.printStackTrace();
                return 102;
            }
            edit.commit();
            globals.isUpdateMenu();
            globals.stopWait();
            return 0;
        }
        else{
            globals.notUpdateMenu();
            globals.stopWait();
            return err.get();
        }
    }


    /**
     * Attmpts to retrieve login token from the server.
     * Make's use of Squareup's OkHttp to connect to the server. This opensource software is used to
     * form the requests to the server as well as handle the response.
     * @param client - The instance of OkHttpClient to be used for connection.
     * @param err - Error code will be set during login
     * @return Login Token as a JSONObject
     */
    public JSONObject getToken(OkHttpClient client, Error err)  {
        final MediaType MEDIA_TYPE_MARKDOWN
                = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");

        String post = "username=" + username + "&password=" + password;
        Request request = new Request.Builder()
                .url("http://"+address+":3000/api/login")
                .post(RequestBody.create(MEDIA_TYPE_MARKDOWN, post))
                .build();

        Response response = null;
        String temp = null;
        try {
            response = client.newCall(request).execute();
            temp = response.body().string();
        } catch (IOException e) {

            e.printStackTrace();
            err.set(201);
            return new JSONObject();
        }
        if (!response.isSuccessful()){
            err.set(response.code());
        }

        JSONObject r = null;
        try {
            r = new JSONObject(temp);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return r;
    }




}