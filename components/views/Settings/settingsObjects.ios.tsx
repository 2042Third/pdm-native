import React, { Component, useEffect, useRef } from "react";

import * as Progress from 'react-native-progress';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput, TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import {styles} from '../../../assets/Style';
import KeyboardShift from "../../uiControl/KeyboardShift";
import Slider from "@react-native-community/slider";
import { ActionSheet } from "react-native-ui-lib";
import { dec, enc, useCancelToken } from "../../handle/handlers/user";


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
  const [decStr, onDec] = React.useState('');
  const [outputText, onChangeOutput] = React.useState('');
  const [encTimesSelect, setEncTimesSelect] = React.useState(false);
  const [startStop, setStartStop] = React.useState(false);
  const [token, cancel] = useCancelToken();
  const inputRef = React.createRef();
  const inputRef2 = React.createRef();
  /**
   * Run the encryption decryption demo
   *
   */
  const onPress = async (t: { cancelled: boolean }) => {
    onTimesEncProgress(0);
    setStartStop(true);
    t.cancelled = false;
    for (let i=0;i<timesEnc; i++) {
      if(t.cancelled) {
        // setStartStop(false);
        break;
      }
      const encBack:string = await enc(psText, inputText);
      onChangeOutput(encBack);
      const decBack:string = await dec(psText, encBack);
      onDec(decBack);
      onTimesEncProgress(i+1);
    }
    t.cancelled = true;
    setStartStop(false);
    return;
  };

  useEffect(()=>{
    console.log("Times change");
    onTimesEncProgress(0);
  },[timesEnc]);


  const window = useWindowDimensions();
  // @ts-ignore
  return (
    <KeyboardShift style={[styles.mainColor]}>
      {(onFocus)=>(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              <Text style={[styles.inputAreaColor, lstyle.debugTextBox]}>{decStr}</Text>
            </View>
            <View
              {...props}
              style={[
                lstyle.debugTextBoxOut,
                {flexGrow: 3, maxHeight: window.height / 7},
              ]}>
              <Text style={[styles.mainColor]}>password: </Text>
              <TextInput
                ref={inputRef}
                multiline={true}
                textAlignVertical={'top'}
                style={[styles.inputAreaColor, lstyle.debugTextBox]}
                onChangeText={onChangeps}
                value={psText}
                onFocus={()=>onFocus(inputRef)}
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
                ref={inputRef2}
                multiline={true}
                textAlignVertical={'top'}
                style={[lstyle.debugTextBox, styles.inputAreaColor]}
                onChangeText={onChangeInput}
                // onKeyDown={handleKeyDown}
                value={inputText}
                onFocus={()=>onFocus(inputRef2)}
              />

              <ActionSheet
                message={'Number of times to encrypt:'}
                cancelButtonIndex={6}
                style={[styles.mainColor]}
                destructiveButtonIndex={0}
                options={[
                  { label: '1 time', onPress: () => onTimesEnc(1) },
                  { label: '10 time', onPress: () => onTimesEnc(10) },
                  { label: '50 time', onPress: () => onTimesEnc(50) },
                  { label: '100 time', onPress: () => onTimesEnc(100) },
                  { label: '1000 time', onPress: () => onTimesEnc(1000) },
                ]}
                visible={encTimesSelect}
                useNativeIOS
                showCancelButton
                onDismiss={() => setEncTimesSelect( false )}
              />

              {/*<InteractionsComponent/>*/}
              <>
                {!(timesEncProgress==0||timesEncProgress==timesEnc) &&
                  <View style={[styles.mainColor,styles.centering,
                    {padding:5, flexDirection: 'column',}]}>
                    <>
                      <Progress.Bar  progress={timesEncProgress/timesEnc} width={200} />
                      <Text style={[styles.mainColor]}>
                        {(timesEncProgress/timesEnc*100).toFixed(1)+"%"}
                      </Text>
                    </>
                  </View>
                }
                {(timesEncProgress==0||timesEncProgress==timesEnc||token.cancelled) &&
                  <View >
                    <Button title={`${timesEnc} Times`} onPress={()=>setEncTimesSelect(true)} />
                  </View>
                }
                { token.cancelled && <Button title={'Encrypt'} onPress={()=>onPress(token)} />}
                {!token.cancelled && <Button title={'Cancel'}  onPress={ () => cancel()}/>}
              </>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
