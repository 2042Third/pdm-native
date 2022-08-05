import React, {Component, useState} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import 'react-native-gesture-handler'; // Must import on Android and ios
import Nav from './components/platform/Nav';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Nav Drawer={Drawer }></Nav>
  );
};
export default App;
