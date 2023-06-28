import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { SafeAreaView, Text, useWindowDimensions, View, Keyboard } from 'react-native';
import { colors, styles } from "../../assets/Style";
import NotesView from "../views/Notes/NotesPage";
import CustomDrawerContentRight from "./drawerContent/DrawerContentRight";
import NotesHeader from "./drawerContent/notes/NotesHeader";
import { useAppSelector } from "../handle/redux/hooks";

const DrawerRightMenu = createDrawerNavigator();
/**
 * Deprecated, currently only used for reference.
 * */
const DrawerRight = ({ navigation }) => {
  const window = useWindowDimensions();
  const header = useAppSelector(state => state.notesHeaderInfo);

  useEffect(() => {
    // const unsubscribe = navigation.addListener('drawerOpen', () => {
      Keyboard.dismiss();
    // });

    // return unsubscribe;
  }, [navigation]);

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
