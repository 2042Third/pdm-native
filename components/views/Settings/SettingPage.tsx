import {SafeAreaView, SectionList, Text, View} from 'react-native';
import {styles} from '../../../assets/Style';
import {NativeModules, Button} from 'react-native';
import React from 'react';
import {
  TestsJavaEcho,
  TestCppHash,
  SettingList,
  TestCppEncDec,
} from './settingsObjects';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import { recordPageChange } from '../../handle/handlers/records';
import { changePageOpened } from '../../handle/redux/reducers/settings/appSettings';
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";

const Subsection = ({title}) => (
  <SectionList
    sections={title.data}
    keyExtractor={(item2, index) => item2 + index}
    renderItem={({item}) => item.obj}
    renderSectionHeader={({section: {title}}) => (
      <Text style={styles.header}>{title}</Text>
    )}
  />
);
const Item = ({title}) => (
  <View style={[styles.container]}>
    <Text style={[styles.inputAreaColor]}>{title.title}</Text>
  </View>
);




const Stack = createNativeStackNavigator();
export default function SettingsScreen({...props}) {
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      console.log("mounting settings ");
      recordPageChange("Settings");
      dispatch(changePageOpened("Settings"));
      return () => {
        console.log("return mounting settings");
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    // <View style={styles.mview}>
    //   {testsJavaEcho.openView({...props})}
    // </View>
    <SafeAreaView style={[styles.container, styles.tooLongScroll]}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={'Settings'}>
          <Stack.Screen
            name={'TestCppHash'}
            component={TestCppHash}
            {...props}
            options={{
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
            }}
          />
          <Stack.Screen
            name={'TestsJavaOrObjCEcho'}
            component={TestsJavaEcho}
            {...props}
            options={{
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
            }}
          />
          <Stack.Screen
            name={'Settings'}
            component={SettingList}
            {...props}
            options={{
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
            }}
          />
          <Stack.Screen
            name={'TestCppEncDec'}
            component={TestCppEncDec}
            {...props}
            options={{
              headerStyle: styles.drawerHeaderStyle,
              headerTitleStyle: styles.drawerHeaderTitleStyle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
