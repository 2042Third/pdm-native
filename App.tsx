
import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TextInput, Button} from 'react-native';
import {colors, styles} from './Style';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}
function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
class App extends Component {

    render() {
        return (
            <NavigationContainer>
                {/*<Stack.Navigator initialRouteName="Home">*/}
                {/*    <Stack.Screen name="Home" component={HomeScreen} />*/}
                {/*    <Stack.Screen name="Details" component={DetailsScreen} />*/}
                {/*</Stack.Navigator>*/}
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Details" component={DetailsScreen} />
                    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
const sty = StyleSheet.create({
    mview:{
        padding: 80,
        backgroundColor: colors["--background-secondary"],

    },
    somet: {
        fontSize: 20,
        color: colors["--foreground-default"]
    }
});
export default App;