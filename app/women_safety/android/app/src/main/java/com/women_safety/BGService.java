package com.women_safety;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BGService extends Service {
    private static final String TAG = "BGService";
    int volumePrev = 0;
    static  int id = 123454;
    private BroadcastReceiver broadcastReceiver;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
//        return super.onStartCommand(intent, flags, startId);

        Log.e(TAG, "onStartCommand: sevice started");
        Toast.makeText(getApplicationContext(), "service started",Toast.LENGTH_SHORT).show();
//
//        //This is the intent of PendingIntent
//        Intent intentAction = new Intent(getApplicationContext(),BGReceiver.class);
//
//        //This is optional if you have more than one buttons and want to differentiate between two
//        intentAction.putExtra("action","actionName");
//
//        PendingIntent pIntentlogin = PendingIntent.getBroadcast(this,1,intentAction,PendingIntent.FLAG_UPDATE_CURRENT);
//        Notification drivingNotifBldr = new Notification.Builder(this)
//                .setContentTitle("NoTextZone")
//                .setContentText("Driving mode it ON!")
//                //Using this action button I would like to call logTest
//                .addAction(R.drawable.ic_arrow, "Turn OFF driving mode", pIntentlogin)
//                .setOngoing(true).build();

//        startForeground(id,drivingNotifBldr);



        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {

                if ("android.media.VOLUME_CHANGED_ACTION".equals(intent.getAction())) {

                    int volume = intent.getIntExtra("android.media.EXTRA_VOLUME_STREAM_VALUE",0);

                    Log.i(TAG, "volume = " + volume);

                    if (volumePrev  < volume) {
                        Log.i(TAG, "You have pressed volume up button");

                        try {
                            try {
                                Intent intent2 = new Intent("GeoLocationUpdate");
                                LocalBroadcastManager.getInstance(getBaseContext()).sendBroadcast(intent2);
                                Toast.makeText(getBaseContext(), "got in service ",Toast.LENGTH_SHORT).show();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }catch (Error e){

                        }

                    } else {
                        Log.i(TAG, "You have pressed volume down button");
                    }
                    volumePrev = volume;
                }
            }
        };

        IntentFilter filter = new IntentFilter();
        filter.addAction("android.media.VOLUME_CHANGED_ACTION");
        registerReceiver(broadcastReceiver, filter);

        return START_STICKY;

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
