import {colors, styles} from "../../assets/Style";
import NotesView from "../views/NotesPage";
import ChatView from "../views/ChatPage";
import SettingView from "../views/UserPage";
import {NavigationContainer} from "@react-navigation/native";
import * as React from 'react';
import {Button, Text, TouchableOpacity, useWindowDimensions, View,} from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerProgress,} from "@react-navigation/drawer";

import Animated from 'react-native-reanimated';
let Nav;

function CustomDrawerContent(props) {
    const progress = useDrawerProgress();

    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    return (
        <DrawerContentScrollView style{...props}>
            <View style={styles.mview}>
                <Text style={styles.somet}></Text>
                <Text style={styles.somet}></Text>
                <MaterialCommunityIcons name="account" size={24} color="red" />
            </View>
            <Animated.View style={{ transform: [{ translateX }] }}>

                <DrawerItemList {...props} />
            </Animated.View>
            {/*<TouchableOpacity>*/}
            {/*    <View style={styles.item}>*/}
            {/*        <View style={styles.iconContainer}>*/}
            {/*            <Ionicons*/}
            {/*                // onPress={() => props.navigation.navigate('Settings')}*/}
            {/*                name="ios-settings"  size={34} color={colors["--foreground-default"]} />*/}
            {/*        </View>*/}
            {/*        /!*<Text style={styles.label}>Logout</Text>*!/*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
        </DrawerContentScrollView>
    );
}

export default  Nav =(props)=> {
    const window = useWindowDimensions();
    const Drawer = props.Drawer;
    return (<NavigationContainer >
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: styles.drawerStyle,
                drawerContentStyle:  styles.drawerContentStyle,
                drawerItemStyle: styles.drawerContentStyle,
                drawerInactiveTintColor: colors["--foreground-default"],
                drawerType: window.width >= 768 ? 'permanent' : 'slide',
                swipeEdgeWidth: window.width,
            }}
            initialRouteName="Notes"
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            // useLegacyImplementation={false}
        >

            {/*begin nav items*/}
            {/*<Text> Account Status</Text>*/}
            <Drawer.Screen name="Notes"  component={NotesView}
                           options={{headerStyle: styles.drawerHeaderStyle, headerTitleStyle: styles.drawerHeaderTitleStyle,}}/>
            <Drawer.Screen name="Chat" component={ChatView}
                           options={{headerStyle: styles.drawerHeaderStyle, headerTitleStyle: styles.drawerHeaderTitleStyle,}}/>
            <Drawer.Screen name="Settings" component={SettingView} hidden={true}
                           options={{headerStyle: styles.drawerHeaderStyle,
                               headerTitleStyle: styles.drawerHeaderTitleStyle,
                               title: '',
                               drawerIcon: ({focused, size}) => (
                                   <TouchableOpacity>
                                       <View style={styles.item}>
                                           <View style={styles.iconContainer}>
                                               <Ionicons
                                                   // onPress={() => props.navigation.navigate('Settings')}
                                                   name="ios-settings"  size={34} color={colors["--foreground-default"]} />
                                           </View>
                                           {/*<Text style={styles.label}>Logout</Text>*/}
                                       </View>
                                   </TouchableOpacity>
                               ),
                           }}/>
        </Drawer.Navigator>
    </NavigationContainer>);
};

