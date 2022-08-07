import { SafeAreaView, SectionList, Text, View } from "react-native";
import {styles} from '../../assets/Style';
import {NativeModules, Button} from 'react-native';
import React from 'react';
import { TestsJavaEcho, TestCppHash, SettingList } from "./settingsObjects";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Subsection = ({ title })=>(
  <SectionList
    sections={title.data}
    keyExtractor={(item2, index) => item2 + index}
    renderItem={({ item }) => item.obj
    }
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
    )}
  />
);
const Item = ({ title }) => (
  <View style={[styles.container]} >
    <Text style={[ styles.inputAreaColor]}>{title.title}</Text>
  </View>
);
const Stack = createNativeStackNavigator();
export default function SettingsScreen({...props}) {

  return (
    // <View style={styles.mview}>
    //   {testsJavaEcho.openView({...props})}
    // </View>
  <SafeAreaView style={styles.container}>

  <NavigationContainer independent={true} >
    <Stack.Navigator initialRouteName={"Settings"} >
      <Stack.Screen name={"TestCppHash"} component={TestCppHash}
                    {...props}
                    options={{
                      headerStyle: styles.drawerHeaderStyle,
                      headerTitleStyle: styles.drawerHeaderTitleStyle,
                    }}
      />
      <Stack.Screen name={"TestsJavaEcho"} component={TestsJavaEcho}
                    {...props}
                    options={{
                      headerStyle: styles.drawerHeaderStyle,
                      headerTitleStyle: styles.drawerHeaderTitleStyle,
                    }}
      />
      <Stack.Screen name={"Settings"} component={SettingList}
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
