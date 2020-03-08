package com.women_safety;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.widget.Toast;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

//import com.women_safety.BGService;

public class BGModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  BGModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;

      BroadcastReceiver geoLocationReceiver = new BroadcastReceiver() {
          @Override
          public void onReceive(Context context, Intent intent) {
              BGModule.this.sendEvent();
          }
      };
      LocalBroadcastManager.getInstance(getReactApplicationContext()).registerReceiver(geoLocationReceiver, new IntentFilter("GeoLocationUpdate"));
  }

 @Override
  public String getName() {
    return "BGmodule";
  }


    @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

 @ReactMethod
  public void startNoti() {
    Log.i("inside android ","startNoti");
    Intent intent = new Intent(getCurrentActivity(), BGService.class);
     getCurrentActivity().startService(intent);
    Toast.makeText(getReactApplicationContext(), "toast",Toast.LENGTH_SHORT).show();
  }

  public void sendEvent(){

      getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("updateLocation", null);
      Toast.makeText(getReactApplicationContext(), "sending event from andriod ",Toast.LENGTH_SHORT).show();

  }

}

