import React,{} from 'react';
import {colors, styles} from '../../assets/Style';
import ChatView from '../views/Chat/ChatPage';
import UserView from '../views/User/UserPage';
import SettingView from '../views/Settings/SettingPage';
import {NavigationContainer} from '@react-navigation/native';
// import * as React from 'react';
import {useWindowDimensions,  } from "react-native";
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
// const ChatView =  lazy(()=>import ("../views/Chat/ChatPage"));

const Nav = (props: {Drawer: any}) => {
  const window = useWindowDimensions();
  const Drawer = props.Drawer;

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
    return (
      userInfo.status === "fail" &&
      eUserEnter.dateTimeUpdated > 0 &&
      userEnter.sess === ''
    );
  }

  const ModalObj = () => {
    if (shouldUserEnterPass()){
      return (
        <EnterModalOne visible={shouldUserEnterPass()} />
      );
    }
    else {
      return <></>;
    }
  }

  React.useEffect(
  ()=>{
    console.log("Page changed detected => " + currentPageOpened.lastPageOpened);
  },[currentPageOpened]);


  return (
    <>
      <ModalObj/>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            lazy: true,
            drawerStyle: [styles.drawerStyle, { width: window.width }],
            drawerContentStyle: styles.drawerContentStyle,
            drawerItemStyle: styles.drawerItemStyle,
            drawerInactiveTintColor: colors['--foreground-default'],
            drawerType: window.width >= 768 ? 'permanent' : 'slide',
            // defaultStatus: window.width >= 768 ? 'open' : 'closed',
            swipeMinDistance: window.width/7,
            swipeEdgeWidth: window.width,
            drawerPosition: "left",
          }}
          initialRouteName="Notes"
          // useLegacyImplementation
          drawerContent={
            (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>
              <CustomDrawerContent navigation={props.navigation} {...props} />}>
          {/*############################## LEFT DRAWER ##############################*/}
          {/*Notes*/}
          < Drawer.Screen
            name="Notes"
            component={DrawerRight}
            options={{
              keyboardDismissMode: "none",
              headerShown: false,
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
              headerLeft: () => <DrawerToggleButton tintColor={colors['--foreground-default']} />,
            }}
          />
          {/*User*/}
          <Drawer.Screen
            name="User"
            component={UserView}
            options={{
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
              headerLeft: () => <DrawerToggleButton tintColor={colors['--foreground-default']} />,
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


        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Nav;
// export default gestureHandlerRootHOC(Nav);

