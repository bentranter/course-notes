package speedstudy.speedstudy;

import android.app.Application;
import android.graphics.Color;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Stores Global Variables of the app.
 */
public class GlobalApp extends Application {
    public String tagFront = "*F*";
    public String tagEnd = "*E*";
    public String ls = "<br>";
    private static GlobalApp singleton;
    private ArrayList<JSONObject> cards = new ArrayList<JSONObject>();
    private String uname = "";
    private String pword = "";
    private boolean doLogin = false;
    private boolean doUpdate = false;
    private boolean waitForAsync = false;
    private boolean updateMenu = false;
    private boolean freshLogin = false;
    private long hourLength = 1000;
    private long level1Length = 4*hourLength;
    private long level2Length = 16*hourLength;
    private long level3Length = 48*hourLength;
    private long level4Length = 108*hourLength;
    private long level5Length = 200*hourLength;
    private long level6Length = 400*hourLength;

    private long level1DocumentLength = 12*hourLength;
    private long level2DocumentLength = 48*hourLength;
    private long level3DocumentLength = 96*hourLength;
    private long level4DocumentLength = 200*hourLength;
    private long level5DocumentLength = 350*hourLength;
    private long level6DocumentLength = 500*hourLength;
    private long level7DocumentLength = 750*hourLength;
    private long level8DocumentLength = 1125*hourLength;
    private long level9DocumentLength = 1500*hourLength;




    public void setReviews(ArrayList<JSONObject> c){
        cards = c;
    }
    public ArrayList<JSONObject> getReviews (){
        return cards;
    }
    public int getColor(int level, long nextReview){
        int r;
        int g;
        int b = 0;
        Date nextReviewDate = new Date(nextReview);
        Date now = new Date();
        if (now.before(nextReviewDate)){
            g = 255;
            r = 0;
            return Color.rgb(r,g,b);
        }
        else{
            Date halfAfter = new Date(nextReview+timeToNextDocumentReview(level)/2 );
            if (now.before(halfAfter)){
                g = 255;
                r = (int) (255*((now.getTime()-nextReviewDate.getTime())/(halfAfter.getTime()-nextReviewDate.getTime())));
            }
            else{

                Date fullAfter = new Date(nextReview+timeToNextDocumentReview(level));



                r = 255;
                g = 255-(int) (255*((now.getTime()-halfAfter.getTime())/(fullAfter.getTime()-halfAfter.getTime())));
            }
            return Color.rgb(r,g,b);
        }
    }
    public long timeToNextReview(int level){
        if (level == 1){
            return level1Length;
        }
        else if (level == 2){
            return level2Length;
        }
        else if (level == 3){
            return level3Length;
        }
        else if (level == 4){
            return level4Length;
        }
        else if (level == 5){
            return level5Length;
        }
        else if (level == 6){
            return level6Length;
        }
        else{
            return level6Length;
        }
    }
    public long timeToNextDocumentReview(int level){
        if (level == 1){
            return level1DocumentLength;
        }
        else if (level == 2){
            return level2DocumentLength;
        }
        else if (level == 3){
            return level3DocumentLength;
        }
        else if (level == 4){
            return level4DocumentLength;
        }
        else if (level == 5){
            return level5DocumentLength;
        }
        else if (level == 6){
            return level6DocumentLength;
        }
        else if (level == 7){
            return level7DocumentLength;
        }
        else if (level == 8){
            return level8DocumentLength;
        }
        else if (level == 9){
            return level9DocumentLength;
        }
        else{
            return level9DocumentLength;
        }
    }
    /**
     * Set so a Fresh Login is required.
     */
    public void needFreshLogin(){
        freshLogin = true;
    }

    /**
     * Set so a Fresh Login is not required.
     */
    public void notFreshLogin(){
        freshLogin = false;
    }

    /**
     * Check to see if a fresh login is required.
     * @return boolean indicating if a fresh login is required.
     */
    public boolean isFreshLogin(){
        return freshLogin;
    }

    /**
     * Set the current password being used.
     * @param p - Password as a string
     */
    public void setPass(String p){
        pword = p;
    }

    /**
     * Get the current password
     * @return Password as a string.
     */
    public String getPass(){
        return pword;
    }

    /**
     * Sets the username
     * @param n - Username as a String
     */
    public void setName(String n){
        uname = n;
    }

    /**
     * Gets the current username
     * @return Username as a String
     */
    public String getName(){
        return uname;
    }

    /**
     *Set so the menu needs to be updated
     */
    public void isUpdateMenu(){
        updateMenu = true;
    }

    /**
     * Set so the menu does not need to be updated
     */
    public void notUpdateMenu(){
        updateMenu = false;
    }

    /**
     * Check to see if the menu needs to be updated
     * @return boolean indicating if the menu needs to be updated.
     */
    public boolean getUpdateMenu(){
        return updateMenu;
    }

    /**
     * Set to wait for an Async task
     */
    public void doWait(){
        waitForAsync = true;
    }

    /**
     * Set to not wait for an Async task.
     */
    public void stopWait(){
        waitForAsync = false;
    }


    /**
     * Check to see if waiting for an Async task to complete
     * @return boolean indicating if it should wait.
     */
    public boolean getWait(){
        return waitForAsync;
    }
    public GlobalApp getInstance(){
        return singleton;
    }

    /**
     * Set so a login is needed
     */
    public void loginNeeded(){
        doLogin = true;
    }

    /**
     * Set so a login is not needed.
     */
    public void loginNotNeeded(){
        doLogin = false;
    }

    /**
     * Check to see if a login is needed.
     * @return boolean indicating if login is needed.
     */
    public boolean isLoginNeeded(){
        return doLogin;
    }

    /**
     * Set so update is needed.
     */
    public void updateNeeded(){
        doUpdate = true;
    }

    /**
     * set so update is not needed.
     */
    public void updateNotNeeded(){
        doUpdate = false;
    }

    /**
     * Checks if an update is needed.
     * @return boolean indicating if an update is needed.
     */
    public boolean isUpdateNeeded(){
        return doUpdate;
    }
    public void onCreate(){
        super.onCreate();
        singleton = this;
    }

}
