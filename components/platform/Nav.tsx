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
  DrawerToggleButton,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { shallowEqual, useSelector } from "react-redux";
import { NavUserStatus } from './drawerContent/navUserStatus';
import CustomDrawerContent from './drawerContent/DrawerContentLeft';
import DrawerRight from './DrawerRight';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../handle/redux/hooks';
import EnterModalOne from '../views/overlays/modalEnterOne';
import { useEffect } from 'react';
import { UserEnter } from '../handle/types';
import { signinUser } from '../handle/redux/reducers/user/userinfoReducer';


const Nav = (props: {Drawer: any}) => {
  const window = useWindowDimensions();
  const Drawer = props.Drawer;

  const currentPageOpened = useAppSelector(state => state.appSettings);

  const userEnter = useAppSelector(state => state.userEnter);
  const userInfo = useAppSelector(state => state.userinfo);
  const eUserEnter = useAppSelector(state => state.encryptedUserEnter);

  const dispatch = useAppDispatch();
  /**
   * Signin button action, signs in the user using the given information
  */
  function userSigninAction() {
    const currentUserEnter: UserEnter = {
      umail: userEnter.umail,
      upw: userEnter.upw,
      upwServer: userEnter.upwServer,
      sess: ""
    };
    return dispatch(signinUser(currentUserEnter)); // Signin
  }

  /**
   * Basically the return of the dispatch;
   * Defines the singin phase of UX.
   *
  */
  useEffect(() => {

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
    </>
  );
};

export default Nav;
// export default gestureHandlerRootHOC(Nav);

