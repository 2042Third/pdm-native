import {colors, styles} from '../../assets/Style';
import NotesView from '../views/Notes/NotesPage';
import ChatView from '../views/Chat/ChatPage';
import UserView from '../views/User/UserPage';
import SettingView from '../views/Settings/SettingPage';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, Text, useWindowDimensions, View} from 'react-native';
import Icon from '../icons/Icon';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { shallowEqual, useSelector } from "react-redux";
import { NavUserStatus } from './drawerContent/navUserStatus';
import CustomDrawerContent from './drawerContent/DrawerContentLeft';
import DrawerRight from './drawerContent/DrawerRight';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


const Nav = (props: {Drawer: any}) => {
  const window = useWindowDimensions();
  const Drawer = props.Drawer;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: [styles.drawerStyle, {width: window.width}],
          drawerContentStyle: styles.drawerContentStyle,
          drawerItemStyle: styles.drawerItemStyle,
          drawerInactiveTintColor: colors['--foreground-default'],
          drawerType: window.width >= 768 ? 'permanent' : 'slide',
          // defaultStatus: window.width >= 768 ? 'open' : 'closed',
          swipeEdgeWidth: window.width,
          drawerPosition: "left",
        }}
        initialRouteName="Notes"
        useLegacyImplementation
        drawerContent={
          (props: JSX.IntrinsicAttributes & { [x: string]: any; }) => 
          <CustomDrawerContent {...props} />}>
        {/*############################## LEFT DRAWER ##############################*/}
        {/*Notes*/}
        < Drawer.Screen
          name="Notes"
          component={DrawerRight}
          options={{

            headerShown: false,
            // headerStyle: styles.drawerHeaderStyle,
            // headerTitleStyle: styles.drawerHeaderTitleStyle,
          }
          }
        />
        {/*Chat*/}
        <Drawer.Screen
          name="Chat"
          component={ChatView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
        />
        {/*User*/}
        <Drawer.Screen
          name="User"
          component={UserView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
        />
        {/*Settings*/}
        <Drawer.Screen
          name="Settings"
          component={SettingView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
            drawerItemStyle: { display: 'none' },
            headerShown: false,
          }}
        />
        {/*############################## RIGHT DRAWER ##############################*/}
        {/* <Drawer.Screen
          name="NoteDrawer"
          component={DrawerRight}
          options={{
            // drawerLabel: () => null,
            // drawerItemStyle: { display: "none" },
            // drawerIcon: () => null,
          }}
        ></Drawer.Screen> */}

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default gestureHandlerRootHOC(Nav);

