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
import { getHash} from "../../handle/handlers/user";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import { UserEnter, UserInfoGeneral } from "../../handle/types";
import { signinUser,  updateUserStatus } from "../../handle/redux/reducers/user/userinfoReducer";
import userinfoEnter, { newUserinfoEnter, setUserSess } from "../../handle/redux/reducers/user/userinfoEnter";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";

export default function UserPage({}) {
  let emailPlaceHolder:string = 'email';
  let passwordPlaceHolder:string = 'password';
  let loginPlaceholder:string = 'login';
  const [isFocused1, onFocusingHeader1] = React.useState(false);
  const [isFocused2, onFocusingHeader2] = React.useState(false);
  const [umail, onUmail] = React.useState('');
  const [upw, onUpw] = React.useState('');
  const dispatch = useAppDispatch();


  /**
   * Makes the password that can be sent to server securely,
   * and signin.
   * */ 
  const onSubmit = async () => {
    const upwServer = await getHash(upw+upw);
    const currentUserEnter:UserEnter = {
      umail: umail, upw: upw, upwServer: upwServer,
      sess: ""
    };
    dispatch(newUserinfoEnter(currentUserEnter));
  };

  const userEnter = useAppSelector(state => state.userEnter);
  const userInfo = useSelector(state => state.userinfo);

  useEffect(() => { 
    if (userEnter.umail.length > 0 && userEnter.sess === '') {
      const currentUserEnter: UserEnter = {
        umail: userEnter.umail,
        upw: userEnter.upw,
        upwServer: userEnter.upwServer,
        sess: ""
      };
      dispatch(signinUser(currentUserEnter))
      .then(()=>{
        console.log("Signin Done");
        // dispatch(setUserSess(userInfo.sess)); // Signin
      })
      ; // Signin
    }
  }, [userEnter]);

  // useEffect(() => {
  //   if (userInfo.status === 'success') {
  //     dispatch(setUserSess(userInfo.sess)); // Signin
  //   }
  // }, [userInfo]);

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
