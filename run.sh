#! /bin/bash


# this script is just to make it easier for me to run the app on the linux computer
set -e

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH


echo "metro"
npx react-native start &


echo "android-run"
npx react-native run-android
