package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Pita on 2/25/2015.
 */
public class SpeedReaderTest
        extends ActivityUnitTestCase<SpeedReader> {
    SpeedReader speedReader;

    public final static String EXTRA_MESSAGE = "com.speedstudy.speedstudy.MESSAGE";
    Method testMethod;
    public SpeedReaderTest() {
        super(SpeedReader.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), SpeedReader.class);
        mLaunchIntent.putExtra(EXTRA_MESSAGE,"Testing Data");
        startActivity(mLaunchIntent, null, null);
        speedReader = (SpeedReader)getActivity();

        tearDown();

    }
    public void tearDown() throws Exception{

        super.tearDown();
    }

    public void testMoveBar() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        SeekBar seekBar = (SeekBar)speedReader.findViewById(R.id.speed_bar);
        int startSpeed = speedReader.sleep;
        int endSpeed;
        if (seekBar.getProgress()>0){
            seekBar.setProgress(seekBar.getProgress()-1);
            endSpeed = speedReader.sleep;
        }
        else{
            seekBar.setProgress(seekBar.getProgress()+1);
            endSpeed = speedReader.sleep;
        }
        assert(startSpeed != endSpeed);
        System.out.println("SpeedReader: Move Bar Success");
    }
    public void testStartResumeButton(){
        Button b = (Button) speedReader.findViewById(R.id.pauseButton);
        boolean startStatus = speedReader.paused;
        b.performClick();
        boolean endStatus = speedReader.paused;
        assertTrue(startStatus!=endStatus);

        System.out.println("SpeedReader: Pause Resume Button Success");
    }
    public void testPlusUpperBound(){
        Button button = (Button) speedReader.findViewById(R.id.speed_up_button);
        int bound = speedReader.sleepMin;
        speedReader.sleep = speedReader.sleepMin;
        button.performClick();
        int speed = speedReader.sleep;
        assertTrue(speed >= bound);
    }

    public void testMinusLowerBound(){
        Button button = (Button) speedReader.findViewById(R.id.slow_down_button);
        int bound = speedReader.sleepMax;
        speedReader.sleep = speedReader.sleepMax;
        button.performClick();
        int speed = speedReader.sleep;
        assertTrue(speed <= bound);
    }
}
