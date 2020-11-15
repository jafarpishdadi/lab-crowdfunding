/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import AppNavigation from './navigation';
import firebase from '@react-native-firebase/app'


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
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </>
  );
};

export default App;
