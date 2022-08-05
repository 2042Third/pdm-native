import React, {Component, useState} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import 'react-native-gesture-handler'; // Must import on Android and ios
import Nav from './components/platform/Nav';
import {store} from "./components/handle/redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <Nav Drawer={Drawer }></Nav>
    </Provider>
  );
};
export default App;
