import React, { Component } from "react";
import { Button, NativeModules, SectionList, StyleSheet, Text, TextInput, View } from "react-native";
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
        {
          title:"TestCppEncDec",
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

  // const help = () =>{
  //   PdmNativeCryptModule.help(inputText, back => {
  //     onNativeReturn(back);
  //   });
  // };
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

        {/*<Button title={'GetHash'}*/}
        {/*        onPress={help}></Button>*/}
      </View>
    </View>
  );
}

export function TestCppHash({...props}){
  const [inputText, onChangeInput] = React.useState("Hello!!!!");
  const [outputText, onChangeOutput] = React.useState("");
  const {PdmNativeCryptModule} = NativeModules;
  const getHash = () =>{
    PdmNativeCryptModule.getHash(inputText, back => {
      onChangeOutput(back);
    });
  };
  return (
    <View style={[styles.container,]}>
      <Text style={[styles.somet,styles.header]}>C++ Hash</Text>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>SHA3 256 bit hash code: </Text>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[ styles.inputAreaColor,lstyle.debugTextBox]}
          onChangeText={onChangeOutput}
          // onKeyDown={handleKeyDown}
          value={outputText}
          editable={false} selectTextOnFocus={false}
        />
      </View>
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.chatEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeInput}
        // onKeyDown={handleKeyDown}
        value={inputText}
      />
      <Button title={'GetHash'}
              onPress={getHash}></Button>
    </View>
  );
}

export function TestCppEncDec({...props}){
  const [inputText, onChangeInput] = React.useState("Hello!!!!");
  const [psText, onChangeps] = React.useState("12345");
  const [dec, onDec] = React.useState("");
  const [outputText, onChangeOutput] = React.useState("");
  const {PdmNativeCryptModule} = NativeModules;
  const onPress = () =>{
    PdmNativeCryptModule.enc(psText,inputText, back => {
      onChangeOutput(back);
      PdmNativeCryptModule.dec(psText,back, backCall => {
        onDec(backCall);
      });
    });

  };

  return (
    <View style={[styles.container,]}>
      <Text style={[styles.somet,styles.header]}>C++ Hash</Text>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>XChaCha20 256-bit Stream Cypher : </Text>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[ styles.inputAreaColor,lstyle.debugTextBox]}
          onChangeText={onChangeOutput}
          // onKeyDown={handleKeyDown}
          value={outputText}
          editable={false} selectTextOnFocus={false}
        />
      </View>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>Decrypted: </Text>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[ styles.inputAreaColor,lstyle.debugTextBox]}
          onChangeText={onDec}

          // onKeyDown={handleKeyDown}
          value={dec}
          editable={false} selectTextOnFocus={false}
        />
      </View>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>password: </Text>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[ styles.inputAreaColor,lstyle.debugTextBox]}
          onChangeText={onChangeps}
          value={psText}
        />
      </View>

      <Text style={[styles.somet]}>Type something to encrypt </Text>
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.chatEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeInput}
        // onKeyDown={handleKeyDown}
        value={inputText}
      />
      <Button title={'encrypt'}
              onPress={onPress}></Button>
    </View>
  );
}
const lstyle = StyleSheet.create({
  debugTextBox: {
    borderRadius: 7,
    padding: 7,
    margin: 3,
  },
  debugTextBoxOut: {
    flexGrow:1,
    flexDirection: "column",
    alignItems: "stretch",
    borderRadius: 7,
    padding: 7,
    margin: 3,

  },
});
