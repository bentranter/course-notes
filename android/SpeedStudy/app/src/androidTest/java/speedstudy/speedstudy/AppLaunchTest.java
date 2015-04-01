package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Pita on 2/25/2015.
 */
public class AppLaunchTest extends ActivityUnitTestCase<AppLaunch> {
    AppLaunch appLaunch;
    Method testMethod;
    public AppLaunchTest() {
        super(AppLaunch.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), AppLaunch.class);
        startActivity(mLaunchIntent, null, null);
        appLaunch = (AppLaunch)getActivity();
        testLaunchLogin();
        testLaunchTokenLogin();
        testLaunchUpdate();
        tearDown();

    }
    public void tearDown() throws Exception{
        super.tearDown();
    }

    public void testLaunchLogin() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        testMethod = AppLaunch.class.getDeclaredMethod("login",new Class[0]);
        testMethod.setAccessible(true);
        testMethod.invoke(appLaunch, new Object[0]);
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("AppLaunch: Launch Login Success");

    }

    public void testLaunchTokenLogin() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        testMethod = AppLaunch.class.getDeclaredMethod("tokenLogin");
        testMethod.setAccessible(true);
        testMethod.invoke(appLaunch, new Object[0]);
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("AppLaunch: Launch Token Login Success");

    }

    public void testLaunchUpdate() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        testMethod = AppLaunch.class.getDeclaredMethod("update");
        testMethod.setAccessible(true);
        testMethod.invoke(appLaunch, new Object[0]);
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("AppLaunch: Launch Update Success");

    }

}
