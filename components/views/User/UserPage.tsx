import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors, styles } from "../../../assets/Style";
import React from 'react';
import NetCalls from "../../handle/network/netCalls";
import User from "../../handle/handlers/user";

export default function UserPage({navigation}) {
  let emailPlaceHolder:string = 'email';
  let passwordPlaceHolder:string = 'password';
  let loginPlaceholder:string = 'login';
  const [isFocused1, onFocusingHeader1] = React.useState(false);
  const [isFocused2, onFocusingHeader2] = React.useState(false);
  const [umail, onUmail] = React.useState('');
  const [upw, onUpw] = React.useState('');

  const onSubmit=async () => {
    let user:User=new User();
    user.tryMakeUser(umail,upw);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.mainColor,{flex:1}]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.loginContainer]}>

          {/*email*/}
          <TextInput
            value={umail}
            onChangeText={onUmail}
            placeholder={emailPlaceHolder}
            style={[ styles.loginInput
              ,{ backgroundColor: isFocused1 ? colors['--background-tertiary'] : colors['--background-default']
              , }]}
            onFocus={() => {onFocusingHeader1(true);}}
            onBlur={() => {onFocusingHeader1(false);}}
          />

          {/* password input */}
          <TextInput
            value={upw}
            onChangeText={onUpw}
            placeholder={passwordPlaceHolder}
            secureTextEntry={true}
            style={[ styles.loginInput
              ,{ backgroundColor: isFocused2 ? colors['--background-tertiary'] : colors['--background-default']
                , }]}
            onFocus={() => {onFocusingHeader2(true);}}
            onBlur={() => {onFocusingHeader2(false);}}
          ></TextInput>
          <View style={[styles.btnContainer]}>
            <Button title={loginPlaceholder} color={colors['--background-light']}
                    onPress={onSubmit}
            ></Button>
          </View>
          <View style={[styles.btnContainer]}>
            <Button title={loginPlaceholder} color={colors['--background-light']}
                    onPress={onSubmit}
            ></Button>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
