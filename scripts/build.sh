========== 佈署手機 步驟 ===========

1. add platform
```

ionic cap add android
ionic cap add ios
```
2. ionic run live
```
ionic cap run android -l
ionic cap run ios -l

ionic cap build android
ionic cap build --release android

native-run.cmd android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device --verbose
```
3. edge debug console log
- edge://inspect/#devices

========== 編譯錯誤 除錯 步驟 ===========
1. ng compile
```
ng serve
```
2. gradle error
```
cd android
./gradlew assembleDebug
```
# windows 編譯注意
android/local.properties => sdk.dir=C\:\\Users\\theha\\Library\\Android\\sdk

3. devices
```
log 裡面有
```
4. cordova plugin
```
cordova plugin remove cordova-plugin-local-notification
npm uninstall @awesome-cordova-plugins/local-notifications 
```

自製 capacitor plugin
https://capacitorjs.com/docs/android/custom-code

======= 隨手紀錄 ==========
Error : import android.support.v4.app.NotificationCompat
https://github.com/react-native-webrtc/react-native-callkeep/issues/344
npx jetifier

# https://ionicframework.com/docs/angular/your-first-app/deploying-mobile

ionic cap add ios
ionic cap add android

ionic cap copy

ionic cap sync


# windows 編譯注意
android/local.properties => sdk.dir=C\:\\Users\\theha\\Library\\Android\\sdk

ionic cap build ios
ionic cap build android

android studio run

==================另外方法==================

ionic cap run ios
ionic cap run android --verbose

ionic capacitor run android -l --external

# edge://inspect/#devices => inspects


cd android
./gradlew assembleDebug

native-run android --list

#遇到invalid device => 需要撤銷授權，重新授權