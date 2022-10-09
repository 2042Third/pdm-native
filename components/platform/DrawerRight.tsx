import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
// import { TabController } from "react-native-ui-lib";
import { colors, styles } from "../../assets/Style";
import NotesMenu from "../views/Notes/NotesMenu";
import NotesView from "../views/Notes/NotesPage";
import CustomDrawerContentRight from "./drawerContent/DrawerContentRight";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Icon from "../icons/Icon";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import NotesHeader from "./drawerContent/notes/NotesHeader";
import { useAppSelector } from "../handle/redux/hooks";

const DrawerRightMenu = createDrawerNavigator();

const DrawerRight = () => {
  const window = useWindowDimensions();
  const navigation2 = useNavigation();
  const header = useAppSelector(state => state.notesHeaderInfo);
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
        swipeMinDistance: window.width / 7,
        // defaultStatus: window.width >= 768 ? 'open' : 'closed',
        swipeEdgeWidth: window.width,
      }}
      initialRouteName="NotesEdit"
      drawerContent={
        (props: JSX.IntrinsicAttributes & { [x: string]: any; }) =>
          <CustomDrawerContentRight {...props} />}
    >
      < DrawerRightMenu.Screen
        name="NotesEdit"
        component={NotesView}
        options={(route)=>({
          params:{title:""},
          lazy: true,
          headerStyle: styles.drawerHeaderStyle,
          headerTitleStyle: styles.drawerHeaderTitleStyle,
          headerTitle: () => < NotesHeader header={header} />,
          drawerItemStyle: { display: 'none' },
          keyboardDismissMode: "none",
          headerLeft: () => null,
          headerRight: () => <DrawerToggleButton tintColor={colors['--foreground-default']}/>,

          })}/>
    </DrawerRightMenu.Navigator>

  );
}

export default DrawerRight;


