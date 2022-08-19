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
import React, { useEffect } from 'react';
import NetCalls from "../../handle/network/netCalls";
import { tryMakeUser } from "../../handle/handlers/user";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import { UserInfoGeneral } from "../../handle/types";
import { signinUser, updateUserStatus } from "../../handle/redux/reducers/user/userinfoReducer";
import userinfoEnter, { newUserinfoEnter } from "../../handle/redux/reducers/user/userinfoEnter";

export default function UserPage({}) {
  let emailPlaceHolder:string = 'email';
  let passwordPlaceHolder:string = 'password';
  let loginPlaceholder:string = 'login';
  const [isFocused1, onFocusingHeader1] = React.useState(false);
  const [isFocused2, onFocusingHeader2] = React.useState(false);
  const [umail, onUmail] = React.useState('');
  const [upw, onUpw] = React.useState('');
  const dispatch = useDispatch();

  const onSubmit=async () => {
    // await dispatch(signinUser({umail: umail,upw: upw})).unwrap();
    tryMakeUser(umail,upw, (res:string)=>{ // callback from crypt-module
      console.log(`res: ${res}`);

      dispatch(newUserinfoEnter({umail:umail,upw:upw,upwServer:res}));
    });
    // tryMakeUser(umail, upw, (res: string) => { // callback from crypt-module
    //   NetCalls.signin(umail, res) // then calls http to signin
    //     .then(function (res: UserInfoGeneral) {
    //       console.log(JSON.stringify(res));
    //       dispatch(updateUserStatus(res));
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // });
  }
  const userEnter = useSelector(state => state.userEnter);
  useEffect(() => { 
    console.log("makeing");
    console.log(JSON.stringify(userEnter));
    if(userEnter.umail.length>0){
      dispatch(signinUser({ umail: userEnter.umail, upw: userEnter.upwServer }));
    }
  }, [userEnter]);
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
            <Text>{userEnter.umail}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
