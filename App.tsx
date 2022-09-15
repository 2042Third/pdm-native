import React, {Component, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler'; // Must import on Android and ios
import Nav from './components/platform/Nav';
import {persistor, store} from './components/handle/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
const Drawer = createDrawerNavigator();
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./assets/Style";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={
        <View style={[styles.centeredView]}>
          <ActivityIndicator />
        </View>
      } persistor={persistor}>
        <Nav Drawer={Drawer} />
      </PersistGate>
    </Provider>
  );
};
export default App;
