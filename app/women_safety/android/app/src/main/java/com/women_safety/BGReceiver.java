package com.women_safety;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BGReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        //Toast.makeText(context,"recieved",Toast.LENGTH_SHORT).show();

        String action=intent.getStringExtra("action");
        if(action.equals("alert")){

            //USER PRESSED BUTTON


        //This is used to close the notification tray
        Intent it = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        context.sendBroadcast(it);

        }

    }

}