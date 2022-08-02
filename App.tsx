
import React, {Component, useState} from 'react';

import {createDrawerNavigator} from "@react-navigation/drawer";
import 'react-native-gesture-handler'; // Must import on Android and ios
import Nav from './components/platform/Nav';
import {SafeAreaProvider} from "react-native-safe-area-context";




// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <SafeAreaProvider><Nav Drawer={Drawer}></Nav></SafeAreaProvider>
    );
};

export default App;