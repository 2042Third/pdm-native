import React, { useMemo } from "react";
import {colors, styles} from '../../assets/Style';
import ChatView from '../views/Chat/ChatPage';
import UserView from '../views/User/UserPage';
import SettingView from '../views/Settings/SettingPage';
import {NavigationContainer} from '@react-navigation/native';
// import * as React from 'react';
import {useWindowDimensions,  } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DrawerToggleButton,
} from "@react-navigation/drawer";
import CustomDrawerContent from './drawerContent/DrawerContentLeft';
import DrawerRight from './DrawerRight';
import { useAppDispatch, useAppSelector } from '../handle/redux/hooks';
import EnterModalOne from '../views/overlays/modalEnterOne';
import { useEffect } from 'react';
import { UserEnter } from '../handle/types';
import { signinUser } from '../handle/redux/reducers/user/userinfoReducer';
import { setUserSess } from "../handle/redux/reducers/user/userinfoEnter";
import Icon from "../icons/Icon";
// const ChatView =  lazy(()=>import ("../views/Chat/ChatPage"));

const Nav = (props: {Drawer: any, Tab: any}) => {
  const window = useWindowDimensions();
  const Drawer = props.Drawer;
  const Tab = props.Tab;

  const currentPageOpened = useAppSelector(state => state.appSettings);

  const userEnter = useAppSelector(state => state.userEnter);
  const userInfo = useAppSelector(state => state.userinfo);
  const eUserEnter = useAppSelector(state => state.encryptedUserEnter);

  const dispatch = useAppDispatch();

  /**
   * Checks user status after each signin action,
   * and updates session key when needed
   *
   */
  useEffect(() => {

    if (userInfo.status === 'success' ) {
      if(userEnter.sess === '' || userEnter.sess !== userInfo.sess) {
        console.log("dispatching user sess from reenter");
        dispatch(setUserSess(userInfo.sess)); // Signin
      }
    }
    else {
      console.log("user login failed, password incorrect, or no email and password  => "+ JSON.stringify(userInfo));

    }
  }, [userInfo.status]);

  /**
   * Signin button action, signs in the user using the given information
  */
  function userSigninAction() {
    const currentUserEnter: UserEnter = {
      umail: userEnter.umail,
      upw: userEnter.upw,
      upwServer: userEnter.upwServer,
      sess: "",
      timesTried: 0
    };
    return dispatch(signinUser(currentUserEnter)); // Signin
  }

  /**
   * Basically the return of the dispatch;
   * Defines the singin phase of UX.
   *
  */
  useEffect(() => {
    // the 'fail' checks if user is already signed in
    if (userEnter.umail.length > 0 && userInfo.status === 'fail') {
      userSigninAction().then(() => {
        console.log("Signin Done");
      });
    }
    else {
      console.log("Signin Failed => " + JSON.stringify(userInfo));
    }
  }, [userEnter]);

  const shouldUserEnterPass = () => {
    console.log(`User Status: 
        ${userInfo.status }, 
        ${eUserEnter.dateTimeUpdated }, 
        ${userEnter.sess}
      }`)
    return (
      userInfo.status === "fail" &&
      eUserEnter.dateTimeUpdated > 0 &&
      userEnter.sess === ''
    );
  }

  const ModalObj = React.memo(() => {
    const cond = shouldUserEnterPass();
    if(!cond){
      return <></>
    }
    return (
      <EnterModalOne visible={cond} />
    );
  })

  React.useEffect(
  ()=>{
    console.log("Page changed detected => " + currentPageOpened.lastPageOpened);
  },[currentPageOpened]);


  return (
    <>
      <ModalObj/>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarStyle: [styles.drawerStyle, { width: window.width }],
            tabBarContentStyle: styles.drawerContentStyle,
            tabBarItemStyle: styles.drawerItemStyle,
            tabBarInactiveTintColor: colors['--foreground-default'],
            tabBarType: window.width >= 768 ? 'permanent' : 'slide',
            tabBarHideOnKeyboard: true,
            // defaultStatus: window.width >= 768 ? 'open' : 'closed',
            swipeMinDistance: window.width/7,
            swipeEdgeWidth: window.width,
            drawerPosition: "left",
          }}
          initialRouteName="Notes"
          // useLegacyImplementation
          // drawerContent={
          //   (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>
          //     <CustomDrawerContent navigation={props.navigation} {...props} />}
        >
          {/*############################## LEFT DRAWER ##############################*/}
          {/*Notes*/}
          < Tab.Screen
            name="Notes"
            component={DrawerRight}
            options={{
              keyboardDismissMode: "none",
              tabBarLabel: ()=>null,
              headerShown: false,
              tabBarIcon: (props: boolean|string|number)  => <Icon
                                                                name={'note-text-outline'}
                                                                {...props}
                                                              />
            }}
          />
          {/*Chat*/}
          <Tab.Screen
            name="Chat"
            component={ChatView}
            options={{
              tabBarLabel: ()=>null,
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
              tabBarIcon: (props: boolean|string|number)  => <Icon
                name={'chat-outline'}
                {...props}
              />
            }}
          />
          {/*User*/}
          <Tab.Screen
            name="User"
            component={UserView}
            options={{
              tabBarLabel: ()=>null,
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
              tabBarIcon: (props: boolean|string|number)  => <Icon
                name={userInfo.status === 'success'? 'account-outline':'account-alert-outline'}
                {...props}
              />
              // headerLeft: () => <DrawerToggleButton tintColor={colors['--foreground-default']} />,
            }}
          />
          {/*Settings*/}
          <Tab.Screen
            name="Settings"
            component={SettingView}
            options={{
              tabBarLabel: ()=>null,
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
              // drawerItemStyle: { display: 'none' },
              headerShown: false,
              tabBarIcon: (props: boolean|string|number)  => <Icon
                                                                name={'cog-outline'}
                                                                {...props}
                                                              />
            }}
          />


        </Tab.Navigator>
        {/*<Drawer.Navigator*/}
        {/*  screenOptions={{*/}
        {/*    lazy: true,*/}
        {/*    drawerStyle: [styles.drawerStyle, { width: window.width }],*/}
        {/*    drawerContentStyle: styles.drawerContentStyle,*/}
        {/*    drawerItemStyle: styles.drawerItemStyle,*/}
        {/*    drawerInactiveTintColor: colors['--foreground-default'],*/}
        {/*    drawerType: window.width >= 768 ? 'permanent' : 'slide',*/}
        {/*    // defaultStatus: window.width >= 768 ? 'open' : 'closed',*/}
        {/*    swipeMinDistance: window.width/7,*/}
        {/*    swipeEdgeWidth: window.width,*/}
        {/*    drawerPosition: "left",*/}
        {/*  }}*/}
        {/*  initialRouteName="Notes"*/}
        {/*  // useLegacyImplementation*/}
        {/*  drawerContent={*/}
        {/*    (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>*/}
        {/*      <CustomDrawerContent navigation={props.navigation} {...props} />}>*/}
        {/*  /!*############################## LEFT DRAWER ##############################*!/*/}
        {/*  /!*Notes*!/*/}
        {/*  < Drawer.Screen*/}
        {/*    name="Notes"*/}
        {/*    component={DrawerRight}*/}
        {/*    options={{*/}
        {/*      keyboardDismissMode: "none",*/}
        {/*      headerShown: false,*/}
        {/*    }*/}
        {/*    }*/}
        {/*  />*/}
        {/*  /!*Chat*!/*/}
        {/*  <Drawer.Screen*/}
        {/*    name="Chat"*/}
        {/*    component={ChatView}*/}
        {/*    options={{*/}
        {/*      headerStyle: styles.drawerHeaderStyle,*/}
        {/*      headerTitleStyle: styles.drawerHeaderTitleStyle,*/}
        {/*      headerLeft: () => <DrawerToggleButton tintColor={colors['--foreground-default']} />,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  /!*User*!/*/}
        {/*  <Drawer.Screen*/}
        {/*    name="User"*/}
        {/*    component={UserView}*/}
        {/*    options={{*/}
        {/*      headerStyle: styles.drawerHeaderStyle,*/}
        {/*      headerTitleStyle: styles.drawerHeaderTitleStyle,*/}
        {/*      headerLeft: () => <DrawerToggleButton tintColor={colors['--foreground-default']} />,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  /!*Settings*!/*/}
        {/*  <Drawer.Screen*/}
        {/*    name="Settings"*/}
        {/*    component={SettingView}*/}
        {/*    options={{*/}
        {/*      headerStyle: styles.drawerHeaderStyle,*/}
        {/*      headerTitleStyle: styles.drawerHeaderTitleStyle,*/}
        {/*      drawerItemStyle: { display: 'none' },*/}
        {/*      headerShown: false,*/}
        {/*    }}*/}
        {/*  />*/}


        {/*</Drawer.Navigator>*/}
      </NavigationContainer>
    </>
  );
};

export default Nav;
// export default gestureHandlerRootHOC(Nav);

