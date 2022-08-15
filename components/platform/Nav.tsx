import {colors, styles} from '../../assets/Style';
import NotesView from '../views/NotesPage';
import ChatView from '../views/ChatPage';
import UserView from '../views/UserPage';
import SettingView from '../views/SettingPage';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, Text, useWindowDimensions, View} from 'react-native';
import Icon from '../icons/Icon';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

let Nav;

function CustomDrawerContent({...props}) {
  const progress = useDrawerProgress();
  let translateX;
  const window = useWindowDimensions();
  // @ts-ignore
  translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-(window.width/2), 0],
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.mview}>
          <Text style={styles.somet} ></Text>
          <Icon
            onPress={() => {props.navigation.navigate('User');}}
            name={'account'} size={24} color="red" />
        </View>
        <Animated.View style={{transform: [{translateX}]}}>
          <DrawerItemList {...props} />
        </Animated.View>
      </DrawerContentScrollView>
      {/*footer*/}
      <View style={styles.footerViewStyle}>
        <View style={styles.footerContent}>
          <Icon
            name={'cog-outline'} size={24}
            onPress={() => props.navigation.navigate('Settings')}
            color={colors['--foreground-default']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Nav = (props: {Drawer: any}) => {
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
        }}
        initialRouteName="Notes"
        useLegacyImplementation
        drawerContent={props => <CustomDrawerContent {...props} />}>
        {/*begin nav items*/}
        {/*Notes*/}
        <Drawer.Screen
          name="Notes"
          component={NotesView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
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
            drawerItemStyle: {display: 'none'},
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
