import {colors, styles} from "../../assets/Style";
import NotesView from "../views/NotesPage";
import ChatView from "../views/ChatPage";
import SettingView from "../views/UserPage";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {useWindowDimensions, } from "react-native";
import { getHeaderTitle } from '@react-navigation/elements';

let Nav;


export default  Nav =(props)=> {
    const window = useWindowDimensions();
    var Drawer = props.Drawer;
    return (<NavigationContainer >
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: styles.drawerStyle,
                drawerContentStyle:  styles.drawerContentStyle,
                drawerItemStyle: styles.drawerContentStyle,
                drawerInactiveTintColor: colors["--foreground-default"],
                drawerType: window.width >= 768 ? 'permanent' : 'slide',
                swipeEdgeWidth: window.width/2,
            }}

            initialRouteName="Notes" useLegacyImplementation={false}
        >

            {/*begin nav items*/}
            {/*<Text> Account Status</Text>*/}
            <Drawer.Screen name="Notes"  component={NotesView}
                           options={{headerStyle: styles.drawerHeaderStyle, headerTitleStyle: styles.drawerHeaderTitleStyle,}}/>
            <Drawer.Screen name="Chat" component={ChatView}
                           options={{headerStyle: styles.drawerHeaderStyle, headerTitleStyle: styles.drawerHeaderTitleStyle,}}/>
            <Drawer.Screen name="Settings" component={SettingView}
                           options={{headerStyle: styles.drawerHeaderStyle, headerTitleStyle: styles.drawerHeaderTitleStyle,}}/>
        </Drawer.Navigator>
    </NavigationContainer>);
};

