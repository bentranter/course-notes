package speedstudy.speedstudy;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by Pita on 3/13/2015.
 */
public class StartNotification extends BroadcastReceiver{
    Context context;
    Intent intent;
    final int NOTIFY_ID = 1;
    @Override
    public void onReceive(Context c, Intent intent){
        context = c;
        NotificationManager notif = (NotificationManager) c.getSystemService(context.NOTIFICATION_SERVICE);
        NotificationCompat.Builder notif_msg = new NotificationCompat.Builder(context)
                .setContentTitle("New StudyPiggy Reviews!")
                .setContentText("You have "+countReviews(context.getFilesDir())+" new reviews.")
                .setSmallIcon(R.drawable.ic_folder_special);


        PendingIntent contentIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class), 0);
        notif_msg.setContentIntent(contentIntent);
        notif.notify(NOTIFY_ID, notif_msg.build());
    }


    public int countReviews(File dir){
        File[] files = dir.listFiles();
        int cardCount = 0;
        for (int i=0;i<files.length;i++){
            if (files[i].isDirectory()){
                cardCount +=countReviews(files[i]);
            }
            else{
                if (files[i].getPath().contains(".cards")){
                    cardCount +=readCards(files[i]);
                }
            }
        }
        return cardCount;

    }

    public int readCards(File dir){
        int cardCount = 0;
        BufferedReader reader;

        try {
            reader = new BufferedReader(new FileReader(dir));

            String line;
            while ((line = reader.readLine()) != null) {
                JSONObject temp = new JSONObject(line);
                Date now = new Date();
                Date reviewDate = new Date(temp.getLong("nextReview"));

                if (reviewDate.before(now)) {

                    cardCount++;
                }

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return cardCount;

    }
}
