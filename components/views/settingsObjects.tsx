import React, { Component } from "react";
import { Button, NativeModules, SectionList, Text, View } from "react-native";
import { styles } from "../../assets/Style";

// interface SettingsObjects {
//   static openView({...props}): JSX.Element;
// }

export function SettingList({navigation}){
  const DATA = [
    {
      title: "Debug",
      data: [
        {
          title:"TestsJavaEcho",
          data: ""
        },
        {
          title:"TestCppHash",
          data: ""
        },
      ]
    },

  ];
  const nav=navigation;
  return (
    <View style={[styles.container,styles.settingsMenu]}>
      <SectionList
                   sections={DATA}
        // keyExtractor={(item, index) => item + index}
                   renderItem={({ item } ) =>
                     <Text style={[styles.inputAreaColor,styles.settingsItem]}
                     onPress={()=>{ nav.navigate(item.title) }}
                     >{item.title}</Text>
                   }
                   renderSectionHeader={({ section: { title } }) => (
                     <Text style={[styles.header,styles.somet]}>{title}</Text>
                   )}
      />
    </View>
  );


}
export function TestsJavaEcho({...props}){

  const [nativeReturn, onNativeReturn] = React.useState('Nothing');
  const {PdmNativeCryptModule} = NativeModules;

  const onPress = () => {
    let nReturn;
    PdmNativeCryptModule.echoer('This from react native!!!', back => {
      onNativeReturn(back);
    });
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.settingsContainer]}>
        <Text style={[styles.somet]}>{nativeReturn}</Text>
        <Button
          onPress={onPress}
          title="Test"
          color="#841584"
          accessibilityLabel='Test Native modules(Java).'
        />
      </View>
    </View>
  );


}
export function TestCppHash({...props}){

  const {PdmNativeCryptModule} = NativeModules;

  return (
    <View style={[styles.container,]}>

      <Text style={[styles.somet]}>C++ Hash</Text>
    </View>
  );


}
