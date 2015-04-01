package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Pita on 2/25/2015.
 */
public class MainActivityTest
        extends ActivityUnitTestCase<MainActivity> {
    MainActivity mainActivity;
    Method testMethod;
    public MainActivityTest() {
        super(MainActivity.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), MainActivity.class);
        startActivity(mLaunchIntent, null, null);
        mainActivity = (MainActivity)getActivity();

        tearDown();

    }
    public void tearDown() throws Exception{

        super.tearDown();
    }

    public void testButtonToLocalFileBrowsing() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        Button b = (Button)mainActivity.findViewById(R.id.to_local_files_button);
        b.performClick();
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("Main Screen: Local File Button Success");
    }

    public void testClearMemory(){
        mainActivity.clearMemory();
        assertEquals(mainActivity.getFilesDir().listFiles().length,0);
        System.out.println("Main Screen: Clear Memory Success");
    }





}
