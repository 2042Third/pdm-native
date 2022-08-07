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
  // @ts-ignore
  translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.mview}>
          <Text style={styles.somet} />
          <Text style={styles.somet} />
          <Icon name={'account'} size={24} color="red" />
        </View>
        <Animated.View style={{transform: [{translateX}]}}>
          <DrawerItemList {...props} />
        </Animated.View>
      </DrawerContentScrollView>
      {/*footer*/}
      <View style={styles.footerViewStyle}>
        {/*<Text style={styles.footerContentText}>pdm Notes</Text>*/}
        {/*<FooterBar ></FooterBar>*/}
        <View style={styles.footerContent}>
          <Icon
            name={'cog-outline'}
            size={24}
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
          drawerStyle: styles.drawerStyle,
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
        <Drawer.Screen
          name="Notes"
          component={NotesView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
        />
        <Drawer.Screen
          name="Chat"
          component={ChatView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingView}
          options={{
            headerStyle: styles.drawerHeaderStyle,
            headerTitleStyle: styles.drawerHeaderTitleStyle,
            drawerItemStyle: {display: 'none'},
            headerShown: false
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
