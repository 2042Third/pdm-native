package com.pdmnotes;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class PdmNativeCryptModule extends ReactContextBaseJavaModule {
    PdmCrypt jni = new PdmCrypt();
    //        System.out.println(jni.getHash());
    PdmNativeCryptModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "PdmNativeCryptModule";
    }
    @ReactMethod
    public void echoer(String input , Callback callback ) {
        Log.d("CryptModule", "echoer called with name: " + getName()
                + " and location: " + input);
        System.out.printf("Java echoer %s \n",input);
        callback.invoke(input);
        jni.getHashTest();
    }
}