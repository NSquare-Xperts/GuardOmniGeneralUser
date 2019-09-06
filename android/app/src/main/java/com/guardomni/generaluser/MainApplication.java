package com.guardomni.generaluser;

import android.app.Application;


import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.actionsheet.ActionSheetPackage;
import com.google.firebase.FirebaseApp;
import com.swmansion.reanimated.ReanimatedPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new ReactVideoPackage(),
            new LinearGradientPackage(),
            new OrientationPackage(),
            new KCKeepAwakePackage(),
            new RNFirebasePackage(),
            new ActionSheetPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
              new RNFirebaseMessagingPackage(),
              new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    System.out.println("sharedpreferences_tokenid ");
    try{
      FirebaseApp.initializeApp(this);
    }catch (Exception e){
      System.out.println("sharedpreferences_tokenid Exception e"+e);
    }
  }
}
