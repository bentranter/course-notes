package speedstudy.speedstudy;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

import java.util.concurrent.ExecutionException;


public class LoginScreen extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_screen);
    }


    /**
     * Called by tapping the login button, will tell the app to retrieve a login token
     * @param vew - passed by tapping the button.
     */
    public void login(View vew){
        GlobalApp globals= (GlobalApp)getApplicationContext();
        EditText usernameField = (EditText) findViewById(R.id.username_field);
        EditText passwordField = (EditText) findViewById(R.id.password_field);
        String username = usernameField.getText().toString();
        String password = passwordField.getText().toString();
        if (!username.equals("") && !password.equals("")) {
            globals.needFreshLogin();
            globals.setName(username);
            globals.setPass(password);
            //new Login(this, username, password).execute();

            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        }

    }

    /**
     * Called by tapping the continue without login button.
     * Tells the app to not attempt to retrieve a login token
     * @param view - Passed by tapping the continue without login button
     */
    public void skipLogin(View view){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login_screen, menu);
        return true;
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
