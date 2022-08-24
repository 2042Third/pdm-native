import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { TabController } from "react-native-ui-lib";
import { colors, styles } from "../../../assets/Style";
import NotesMenu from "../../views/Notes/NotesMenu";
import NotesView from "../../views/Notes/NotesPage";
import CustomDrawerContentRight from "./DrawerContentRight";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Icon from "../../icons/Icon";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const DrawerRightMenu = createDrawerNavigator();

const DrawerRight = () => {
  const window = useWindowDimensions();
  const navigation2 = useNavigation();
  return (
    <DrawerRightMenu.Navigator
      screenOptions={{
        drawerStyle: [styles.drawerStyle, { width: window.width }],
        drawerContentStyle: styles.drawerContentStyle,
        drawerItemStyle: styles.drawerItemStyle,
        drawerInactiveTintColor: colors['--foreground-default'],
        drawerType: window.width >= 768 ? 'permanent' : 'slide',
        headerShown: true,
        drawerPosition: "right",
        // defaultStatus: window.width >= 768 ? 'open' : 'closed',
        swipeEdgeWidth: window.width/3,
      }}
      useLegacyImplementation
      initialRouteName="NotesEdit"
      drawerContent={
        (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>
          <CustomDrawerContentRight {...props} />}
    >
      < DrawerRightMenu.Screen
        name="NotesEdit"
        component={NotesView}
        options={{
          lazy: true,
          headerStyle: styles.drawerHeaderStyle,
          headerTitleStyle: styles.drawerHeaderTitleStyle,
          drawerItemStyle: { display: 'none' },
          headerLeft: () => <Icon style={[styles.menuButton]}
            onPress={() => { navigation2.toggleDrawer() }}
            name={'menu'} size={24}/>,
          headerRight: () => <DrawerToggleButton tintColor={colors['--foreground-default']}/>,

          }}/>
    </DrawerRightMenu.Navigator>

  );
}

export default DrawerRight;


