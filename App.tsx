
import React, {Component, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    Button,
    useWindowDimensions,
    AppRegistry
} from 'react-native';
import {colors,} from './Style';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { useDimensions } from '@react-native-community/hooks'
import 'react-native-gesture-handler'; // Must import on Android and IOS

// AppRegistry.registerComponent('main', () => App);
// const { width, height } = useDimensions().window;
function HomeScreen({ navigation }) {
    const window = useWindowDimensions();
    return (
        <View style={styles.mview}>
            <Text style={styles.somet}>Home Screen</Text>
            <Text style={styles.somet}>window width: ${window.width}</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={styles.mview}>
            <Text style={styles.somet}>Details Screen</Text>
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
        <View style={styles.mview}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    const window = useWindowDimensions();
    return (
        <NavigationContainer >
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: styles.drawerStyle,
                    drawerContentStyle:  styles.drawerContentStyle,
                    drawerItemStyle: styles.drawerContentStyle,
                    drawerInactiveTintColor: colors["--foreground-default"],
                    drawerType: window.width >= 768 ? 'permanent' : 'slide',
                }}
                initialRouteName="Home" useLegacyImplementation={false} >
                <Drawer.Screen  name="Home" component={HomeScreen} />
                <Drawer.Screen name="Details" component={DetailsScreen} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    mview:{
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    somet: {
        fontSize: 20,
        color: colors["--foreground-default"]
    },
    drawerStyle: {
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
    },
    drawerContentStyle: {
        backgroundColor: colors["--background-secondary"],
        color: colors["--foreground-default"],
    },
});
export default App;