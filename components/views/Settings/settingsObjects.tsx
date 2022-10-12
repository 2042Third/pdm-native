import React, { Component, useEffect, useRef } from "react";
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import {
  Button,
  KeyboardAvoidingView,
  NativeModules,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from '../../../assets/Style';
// import PdmNativeCryptModule from '../../handle/native/NativeModule';
import KeyboardShift from "../../uiControl/KeyboardShift";
import Slider from "@react-native-community/slider";


export function SettingList({navigation}) {
  const DATA = [
    {
      title: 'Debug',
      data: [
        {
          title: 'TestsJavaOrObjCEcho',
          data: '',
        },
        {
          title: 'TestCppHash',
          data: '',
        },
        {
          title: 'TestCppEncDec',
          data: '',
        },
      ],
    },
    {
      title: 'Security',
      data: [
        {
          title: 'AppPassPage',
          data: '',
        },
      ]
    }
  ];
  const nav = navigation;
  return (
    <View style={[styles.container, styles.settingsMenu]}>
      <SectionList
        sections={DATA}
        // keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Text
            style={[styles.inputAreaColor, styles.settingsItem]}
            onPress={() => {
              nav.navigate(item.title);
            }}>
            {item.title}
          </Text>
        )}
        renderSectionHeader={({section: {title}}) =>
          (<Text style={[styles.header, styles.somet]}>{title}</Text>)
        }
      />
    </View>
  );
}

export function TestsJavaEcho({...props}) {
  const [nativeReturn, onNativeReturn] = React.useState('Nothing');
  // const {PdmNativeCryptModule} = NativeModules;
  const {PdmNativeCryptModule} = NativeModules;
  const onPress = async () => {
    const back: string = await PdmNativeCryptModule.echoer('This from react native!!!'.toString());
    onNativeReturn(back);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.settingsContainer]}>
        <Text style={[styles.somet]}>{nativeReturn}</Text>
        <Button
          onPress={onPress}
          title="Test"
          color="#841584"
          accessibilityLabel="Test Native modules(Java)."
        />
      </View>
    </View>
  );
}

export function TestCppHash({...props}) {

  const [inputText, onChangeInput] = React.useState('Hello!!!!');
  const [outputText, onChangeOutput] = React.useState('');
  const [outputTextDouble, onChangeOutputDouble] = React.useState('');
  const {PdmNativeCryptModule} = NativeModules;

  const getHash = async () => {

    const back: string = await PdmNativeCryptModule.getHash(inputText);
    onChangeOutput(back);
    const backD: string = await PdmNativeCryptModule.getHash(inputText+inputText);
    onChangeOutputDouble(backD);

  };
  return (
    <ScrollView style={[styles.container]}>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>SHA3 256 bit hash code: </Text>
        <Text
          style={[styles.inputAreaColor, lstyle.debugTextBox]}
        >{outputText}</Text>
        <Text
          style={[styles.inputAreaColor, lstyle.debugTextBox]}
        >{outputTextDouble}</Text>
      </View>
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.chatEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeInput}
        value={inputText}
      />
      <Button title={'GetHash'} onPress={getHash} />
    </ScrollView>
  );
}

export function TestCppEncDec({...props}) {
  const [inputText, onChangeInput] = React.useState('Hello!!!!');
  const [psText, onChangeps] = React.useState('12345');
  const [timesEnc, onTimesEnc] = React.useState(1);
  const [timesEncProgress, onTimesEncProgress] = React.useState(0);
  const [dec, onDec] = React.useState('');
  const [outputText, onChangeOutput] = React.useState('');
  const {PdmNativeCryptModule} = NativeModules;

  /**
   * Run the encryption decryption demo
   *
  */
  const onPress = async () => {
    for (let i=0;i<timesEnc;i++){
      console.log(`Run onpress ${i}'s time oo=${timesEnc}`);
      const encBack:string = await PdmNativeCryptModule.enc(psText, inputText);
      console.log(`encBack: \'${encBack}\'`);
      onChangeOutput(encBack);
      const decBack:string = await PdmNativeCryptModule.dec(psText, encBack.toString());
      console.log(`decBack: \'${decBack}\'`);
      onDec(decBack);
      onTimesEncProgress(i+1);
    }
  };

  useEffect(()=>{
    console.log("Times change");
    onTimesEncProgress(0);
  },[timesEnc]);
  const window = useWindowDimensions();
  // @ts-ignore
  return (
    <KeyboardShift style={[styles.mainColor]}>
      {()=>(
          <View style={[styles.mainColor, {flexDirection: 'column', flexGrow: 3}]}>
              <View
                {...props}
                style={[lstyle.debugTextBoxOut, {flexGrow: 3, maxHeight: window.height / 5},]}>
                <Text style={[styles.mainColor]}>XChaCha20 256-bit Stream Cypher :{' '}</Text>
                <Text style={[styles.inputAreaColor, lstyle.debugTextBox]}>{outputText}</Text>
              </View>
              <View
                {...props}
                style={[lstyle.debugTextBoxOut, {flexGrow: 3, alignContent: 'stretch', maxHeight: window.height / 5},]}>
                <Text style={[styles.mainColor]}>Decrypted: </Text>
                <Text style={[styles.inputAreaColor, lstyle.debugTextBox]}>{dec}</Text>
              </View>
              <View
                {...props}
                style={[
                  lstyle.debugTextBoxOut,
                  {flexGrow: 3, maxHeight: window.height / 7},
                ]}>
                <Text style={[styles.mainColor]}>password: </Text>
                <TextInput
                  multiline={true}
                  textAlignVertical={'top'}
                  style={[styles.inputAreaColor, lstyle.debugTextBox]}
                  onChangeText={onChangeps}
                  value={psText}
                />
              </View>
              <View
                {...props}
                style={[
                  lstyle.debugTextBoxOut,
                  {flexGrow: 3, maxHeight: window.height / 5},
                ]}>
                <Text style={[styles.mainColor]}>Type something to encrypt </Text>
                <TextInput
                  multiline={true}
                  textAlignVertical={'top'}
                  style={[lstyle.debugTextBox, styles.inputAreaColor]}
                  onChangeText={onChangeInput}
                  // onKeyDown={handleKeyDown}
                  value={inputText}
                />
                <Picker
                  selectedValue={timesEnc}
                  onValueChange={(itemValue, itemIndex) =>
                    onTimesEnc(itemValue)
                  }>
                  <Picker.Item label="1 times" value={1} />
                  <Picker.Item label="5 times" value={5} />
                  <Picker.Item label="10 times" value={10} />
                  <Picker.Item label="20 times" value={20} />
                  <Picker.Item label="200 times" value={200} />
                  <Picker.Item label="2000 times" value={2000} />
                </Picker>

                <View style={[styles.mainColor,styles.centering, {padding:5,
                  flexDirection: 'column',}]}>
                  <Progress.Bar  progress={timesEncProgress/timesEnc} width={200}
                  />
                  <Text style={[styles.mainColor]}>
                    {(timesEncProgress/timesEnc*100).toFixed(1)+"%"}
                  </Text>
                </View>
                <View >
                  <Button disabled={!(timesEncProgress==0||timesEncProgress==timesEnc)} title={'encrypt'} onPress={onPress} />
                </View>

              </View>
          </View>
        )}
    </KeyboardShift>
  );
}



const lstyle = StyleSheet.create({
  debugTextBox: {
    overflow: 'scroll',
    borderRadius: 7,
    padding: 7,
    margin: 3,
  },
  debugTextBoxOut: {
    borderRadius: 7,
    padding: 7,
    margin: 3,
  },
});
