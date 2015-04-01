package speedstudy.speedstudy;

import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.view.View;
import android.widget.EditText;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Pita on 2/25/2015.
 */
public class LoginScreenTest
        extends ActivityUnitTestCase<LoginScreen> {
    LoginScreen loginScreen;
    Method testMethod;
    public LoginScreenTest() {
        super(LoginScreen.class);
    }

    protected void setUp() throws Exception {
        super.setUp();
        Intent mLaunchIntent = new Intent(getInstrumentation()
                .getTargetContext(), LoginScreen.class);
        startActivity(mLaunchIntent, null, null);
        loginScreen = (LoginScreen)getActivity();

        tearDown();

    }
    public void tearDown() throws Exception{
        super.tearDown();
    }

    public void testLoginBlankName() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        EditText usernameField = (EditText) loginScreen.findViewById(R.id.username_field);
        EditText passwordField = (EditText) loginScreen.findViewById(R.id.password_field);
        usernameField.setText("");
        passwordField.setText("testPassword");
        testMethod = LoginScreen.class.getDeclaredMethod("login",View.class);
        testMethod.setAccessible(true);
        testMethod.invoke(loginScreen, new Object[]{new View(loginScreen)});
        final Intent launchIntent = getStartedActivityIntent();
        assertNull("Intent is not null", launchIntent);
        System.out.println("Login Screen: Login without password Success");
    }


    public void testValidLogin() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        EditText usernameField = (EditText) loginScreen.findViewById(R.id.username_field);
        EditText passwordField = (EditText) loginScreen.findViewById(R.id.password_field);
        usernameField.setText("testUsername");
        passwordField.setText("testPassword");
        testMethod = LoginScreen.class.getDeclaredMethod("login",View.class);
        testMethod.setAccessible(true);
        testMethod.invoke(loginScreen, new Object[]{new View(loginScreen)});
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("Login Screen: Valid Login Success");
    }
    public void testLoginBlankPass() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        EditText usernameField = (EditText) loginScreen.findViewById(R.id.username_field);
        EditText passwordField = (EditText) loginScreen.findViewById(R.id.password_field);
        usernameField.setText("testUsername");
        passwordField.setText("");
        testMethod = LoginScreen.class.getDeclaredMethod("login",View.class);
        testMethod.setAccessible(true);
        testMethod.invoke(loginScreen, new Object[]{new View(loginScreen)});
        final Intent launchIntent = getStartedActivityIntent();
        assertNull("Intent is not null", launchIntent);
        System.out.println("Login Screen: Login without username Success");
    }


    public void testSkipLogin() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        testMethod = LoginScreen.class.getDeclaredMethod("skipLogin",View.class);
        testMethod.setAccessible(true);
        testMethod.invoke(loginScreen, new Object[]{new View(loginScreen)});
        final Intent launchIntent = getStartedActivityIntent();
        assertNotNull("Intent is null", launchIntent);
        System.out.println("Login Screen: Skip Login Success");

    }



}
