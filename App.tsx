
import React, {Component, useState} from 'react';
import {
    Text,
    View,
    Button,
    useWindowDimensions,
} from 'react-native';
import {colors, styles} from './assets/Style';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { useDimensions } from '@react-native-community/hooks'
import 'react-native-gesture-handler'; // Must import on Android and ios
import Nav from './components/platform/Nav';




// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Nav Drawer={Drawer}></Nav>
    );
};

export default App;