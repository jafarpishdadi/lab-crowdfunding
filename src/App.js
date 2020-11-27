/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';
import AppNavigation from './navigation';
import firebase from '@react-native-firebase/app'
import OneSignal from 'react-native-onesignal'
import codePush from 'react-native-code-push'


var firebaseConfig = {
  apiKey: "AIzaSyCzJ_YkeI18SxkfKAGjo-RosywcGWqPBDA",
  authDomain: "lab-sanber-rna.firebaseapp.com",
  databaseURL: "https://lab-sanber-rna.firebaseio.com",
  projectId: "lab-sanber-rna",
  storageBucket: "lab-sanber-rna.appspot.com",
  messagingSenderId: "546285868427",
  appId: "1:546285868427:web:2e349c7ea94b05749f8b8e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const App: () => React$Node = () => {

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init("cd388ec0-9da3-4258-a65a-c686941c941e", {
      kOSSettingsKeyAutoPrompt : false, 
      kOSSettingsKeyInAppLaunchURL: false, 
      kOSSettingsKeyInFocusDisplayOption:2
    });
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('ids', onIds)

    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    }, SyncStatus)

    return () => {
      OneSignal.removeEventListener('received', onReceived)
      OneSignal.removeEventListener('opened', onOpened)
      OneSignal.removeEventListener('ids', onIds)
    }
  }, [])

  const SyncStatus = (status) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for Update...')
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading Package...')
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up to date...')
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update...')
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        alert('Update installed...')
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user...')
        break;
      default: 
        break;

    }
  }

  const onReceived = (notification) => { 
    console.log("🚀 ~ file: App.js ~ line 52 ~ onReceived ~ notification", notification)
  }

  const onOpened = (openResult) => {
    console.log("🚀 ~ file: App.js ~ line 56 ~ onOpened ~ openResult", openResult)
  }

  const onIds = (device) => {
    console.log("🚀 ~ file: App.js ~ line 60 ~ onIds ~ device", device)
  }
    
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </>
  );
};

export default App;
