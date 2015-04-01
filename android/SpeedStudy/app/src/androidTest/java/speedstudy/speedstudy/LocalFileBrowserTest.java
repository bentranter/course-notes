package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.view.View;
import android.widget.ListView;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Pita on 2/25/2015.
 */
public class LocalFileBrowserTest extends ActivityUnitTestCase<LocalFilesBrowser> {
    LocalFilesBrowser localFilesBrowser;

    public final static String FILE_DIR = "com.speedstudy.speedstudy.MESSAGE";
    Method testMethod;
    public LocalFileBrowserTest() {
        super(LocalFilesBrowser.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), LocalFilesBrowser.class);

        startActivity(mLaunchIntent, null, null);
        localFilesBrowser = (LocalFilesBrowser)getActivity();

        tearDown();

    }
    public void tearDown() throws Exception{
        super.tearDown();
    }

    public void testItemClick(){

        localFilesBrowser.onListItemClick(new ListView(localFilesBrowser), new ListView(localFilesBrowser), 0, 0);
        final Intent launchIntent = getStartedActivityIntent();
        if (localFilesBrowser.files.length <= 0){
            assertNull("Intent is not null", launchIntent);
            System.out.println("LocalFilesBrowser: Item Selected Success");
        }
        else {
            assertNotNull("Intent is null", launchIntent);
            System.out.println("LocalFilesBrowser: Item Selected Success");
        }

    }



}
