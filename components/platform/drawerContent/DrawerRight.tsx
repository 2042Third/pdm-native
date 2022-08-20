import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { colors, styles } from "../../../assets/Style";
import NotesView from "../../views/Notes/NotesPage";
import CustomDrawerContentRight from "./DrawerContentRight";

const DrawerRightMenu = createDrawerNavigator();

const DrawerRight = () => {
  const window = useWindowDimensions();
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
        swipeEdgeWidth: window.width/2,
      }}
      useLegacyImplementation
      initialRouteName="Notes"
      drawerContent={
        (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>
          <CustomDrawerContentRight {...props} />}
    >
      < DrawerRightMenu.Screen
        name="Notes"
        component={NotesView}
        options={{
          headerStyle: styles.drawerHeaderStyle,
          headerTitleStyle: styles.drawerHeaderTitleStyle,
        }
        }
      />
    </DrawerRightMenu.Navigator>
  );
}

export default DrawerRight;
