package com.pdmnotes;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class PdmNativeCryptModule extends ReactContextBaseJavaModule {
    //        System.out.println(jni.getHash());
    PdmNativeCryptModule(ReactApplicationContext context) {
        super(context);
    }
    PdmCrypt jni = new PdmCrypt();

    @NonNull
    @Override
    public String getName() {
        return "PdmNativeCryptModule";
    }
    @ReactMethod
    public void echoer(String input , Callback callback ) {
        PdmCrypt jni = new PdmCrypt();
        Log.d("CryptModule", "echoer called with name: " + getName()
                + " and location: " + input);
        System.out.printf("Java echoer %s \n",input);
        callback.invoke(input);
        System.out.println("THIS IS THE STRING MANIPULATOR!!");
        System.out.println(jni.help("asdfxvcbiojdasaisdf hello world,,,"));
        System.out.println("THIS IS HASH!!");
        System.out.println(jni.getHash(input));
    }
    @ReactMethod
    public void getHash(String input , Promise promise) {
        try{
            String out = jni.getHash(input);
            promise.resolve(out);
        }
        catch(Exception e) {
            promise.reject("Get hash error", "Get Hash error", e);
        }
    }
    @ReactMethod
    public void enc(String a ,String b , Promise promise) {
        try{
            String out = jni.loaderCheck(a,b);
            promise.resolve(out);
        }
        catch(Exception e) {
            promise.reject("loaderCheck error", "loaderCheck error", e);
        }
    }
    @ReactMethod
    public void dec(String a ,String b, Promise promise ) {
        try{
            String out = jni.loaderOut(a,b);
            promise.resolve(out);
        }
        catch(Exception e) {
            promise.reject("loaderOut error", "loaderOut error", e);
        }
    }
    @ReactMethod
    public void getHashC(String input , Callback callback ) {
        callback.invoke(jni.getHash(input));
    }
    @ReactMethod
    public void encC(String a ,String b, Callback callback ) {
        callback.invoke(jni.loaderCheck(a,b));
    }
    @ReactMethod
    public void decC(String a ,String b, Callback callback ) {
        callback.invoke(jni.loaderOut(a,b));
    }
}
