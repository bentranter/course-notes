package speedstudy.speedstudy;

import android.app.TabActivity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TabHost;


public class MainLoader extends TabActivity {

    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";
    TabHost mTabHost;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main_loader);


        mTabHost.addTab(mTabHost.newTabSpec("File Browser").setIndicator("File Browser").setContent(new Intent(this, MainActivity.class).putExtra(FILE_DIR, getFilesDir().getPath())));

        mTabHost.addTab(mTabHost.newTabSpec("Reviews").setIndicator("Reviews").setContent(new Intent(this, MainActivity.class)));

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_loader, menu);
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
