package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;


/**
 * Created by Pita on 2/26/2015.
 */
public class DocumentLoaderTest extends ActivityUnitTestCase<DocumentLoader> {
    DocumentLoader documentLoader;
    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    public DocumentLoaderTest() {
        super(DocumentLoader.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), DocumentLoader.class);
        mLaunchIntent.putExtra(EXTRA_MESSAGE,"Testing Data");
        startActivity(mLaunchIntent, null, null);
        documentLoader = (DocumentLoader)getActivity();

        tearDown();

    }
    public void tearDown()throws Exception{
        super.tearDown();
    }
    public void testShowSpeedReader(){
        documentLoader.getTabHost().setCurrentTab(1);
        assertEquals("Speed Reader",documentLoader.getTabHost().getCurrentTabTag());
    }

    public void testShowDocument(){
        documentLoader.getTabHost().setCurrentTab(0);
        assertEquals("Display Document",documentLoader.getTabHost().getCurrentTabTag());
    }
}
