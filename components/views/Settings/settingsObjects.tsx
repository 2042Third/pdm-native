import React, {Component} from 'react';
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
import PdmNativeCryptModule from '../../handle/native/NativeModule';
import KeyboardShift from "../../uiControl/KeyboardShift";
// interface SettingsObjects {
//   static openView({...props}): JSX.Element;
// }

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
  const onPress = () => {
    PdmNativeCryptModule.echoer('This from react native!!!'.toString(), back => {
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
  const getHash = () => {
    PdmNativeCryptModule.getHash(inputText, back => {
      onChangeOutput(back);
    });
    PdmNativeCryptModule.getHash(inputText+inputText, back => {
      console.log(`Hasher:${back}`);
      onChangeOutputDouble(back);
    });
  };
  return (
    <ScrollView style={[styles.container]}>
      <View style={[lstyle.debugTextBoxOut]}>
        <Text style={[styles.somet]}>SHA3 256 bit hash code: </Text>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[styles.inputAreaColor, lstyle.debugTextBox]}
          onChangeText={onChangeOutput}
          // onKeyDown={handleKeyDown}
          value={outputText}
          editable={false}
          selectTextOnFocus={true}
        />
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[styles.inputAreaColor, lstyle.debugTextBox]}
          onChangeText={onChangeOutputDouble}
          // onKeyDown={handleKeyDown}
          value={outputTextDouble}
          editable={false}
          selectTextOnFocus={true}
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
      <Button title={'GetHash'} onPress={getHash} />
    </ScrollView>
  );
}

export function TestCppEncDec({...props}) {
  const [inputText, onChangeInput] = React.useState('Hello!!!!');
  const [psText, onChangeps] = React.useState('12345');
  const [dec, onDec] = React.useState('');
  const [outputText, onChangeOutput] = React.useState('');
  const {PdmNativeCryptModule} = NativeModules;
  const onPress = () => {
    PdmNativeCryptModule.enc(psText, inputText, back => {
      onChangeOutput(back);
      PdmNativeCryptModule.dec(psText, back, backCall => {
        onDec(backCall);
      });
    });
  };

  const window = useWindowDimensions();
  return (
    <KeyboardShift style={[styles.mainColor]}>
      {()=>(
          <View style={[styles.mainColor, {flexDirection: 'column', flexGrow: 3}]}>
              <View
                {...props}
                style={[
                  lstyle.debugTextBoxOut,
                  {flexGrow: 3, maxHeight: window.height / 5},
                ]}>
                <Text style={[styles.mainColor]}>
                  XChaCha20 256-bit Stream Cypher :{' '}
                </Text>
                <TextInput
                  multiline={true}
                  textAlignVertical={'top'}
                  style={[styles.inputAreaColor, lstyle.debugTextBox]}
                  onChangeText={onChangeOutput}
                  value={outputText}
                  editable={false}
                />
              </View>
              <View
                {...props}
                style={[
                  lstyle.debugTextBoxOut,
                  {flexGrow: 3, alignContent: 'stretch', maxHeight: window.height / 5},
                ]}>
                <Text style={[styles.mainColor]}>Decrypted: </Text>
                <TextInput
                  multiline={true}
                  textAlignVertical={'top'}
                  style={[styles.inputAreaColor, lstyle.debugTextBox]}
                  onChangeText={onDec}
                  value={dec}
                  editable={false}
                />
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
                  style={[, lstyle.debugTextBox, styles.inputAreaColor]}
                  onChangeText={onChangeInput}
                  // onKeyDown={handleKeyDown}
                  value={inputText}
                />
                <Button title={'encrypt'} onPress={onPress} />
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
