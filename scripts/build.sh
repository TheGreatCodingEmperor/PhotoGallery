# https://ionicframework.com/docs/angular/your-first-app/deploying-mobile

ionic cap add ios
ionic cap add android

ionic cap copy

ionic cap sync

ionic cap build ios
ionic cap build Android

# windows 編譯注意
android/local.properties => sdk.dir=C\:\\Users\\theha\\Library\\Android\\sdk

android studio run

==================另外方法==================

ionic cap run ios
ionic cap run android --verbose

ionic capacitor run android -l --external


cd android
./gradlew assembleDebug

native-run android --list