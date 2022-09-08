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
import { signinUser,  updateUserStatus, userClearData } from "../../handle/redux/reducers/user/userinfoReducer";
import userinfoEnter, { newUserinfoEnter, setUserSess, userEnterClearData } from "../../handle/redux/reducers/user/userinfoEnter";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { recordPageChange } from "../../handle/handlers/records";
import { changePageOpened } from "../../handle/redux/reducers/settings/appSettings";

interface UserinfoArg  {
  userInfo: UserInfoGeneral,
};

const UserPage = () => {

  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      // console.log("mounting userPage ");
      // recordPageChange("User");
      dispatch(changePageOpened("User"));
      return () => {
        // console.log("return mounting userPage");
        // Useful for cleanup functions
      };
    }, [])
  );

  const userEnter = useAppSelector(state => state.userEnter);
  const userInfo = useAppSelector(state => state.userinfo);

  const userScreen = () => {
    if (userInfo.status === 'fail' || userEnter.sess === "") {
      return (<UserPageSignin userInfo={userInfo}  />)
    }
    else {
      return (< UserProfile userInfo={userInfo} />);
    }
  }
  return (
    <>
      {userScreen()}
    </>
  );
}

// USER PROFILE
const UserProfile = ({ userInfo }: UserinfoArg) => {
  const dispatch = useAppDispatch();
  console.log("Login success, rendering from profile.");

  /**
   * Removes all in-memory data about the user
   * 
  */
  const cleanCurrentStatus = () => {
    dispatch(updateUserStatus(userClearData));
    dispatch(newUserinfoEnter(userEnterClearData));
  }
  return (
    <View style={[styles.mainColor,  { flex: 1 , flexDirection:"column"}]}>
      <Text style={[styles.normalText, styles.centerTextPadding]}>
         {userInfo.username}
      </Text>
      <Text style={[styles.smallText, styles.centerTextPadding]}>
        Email: 
      </Text>
      <Text style={[styles.normalText, styles.centerTextPadding]}>
        {userInfo.email}
      </Text>
      <Text style={[styles.smallText, styles.centerTextPadding]}>
        Account Created:
      </Text>
      <Text style={[styles.normalText, styles.centerTextPadding]}>
        {userInfo.ctime}
      </Text>
      <Button title={'clear'} color={colors['--background-light']}
        onPress={cleanCurrentStatus}
      ></Button>
    </View>
  );
}

// SIGNIN
const UserPageSignin = ({ userInfo }: UserinfoArg )=> {
  let emailPlaceHolder:string = 'email';
  let passwordPlaceHolder:string = 'password';
  let loginPlaceholder:string = 'login';
  const [isFocused1, onFocusingHeader1] = React.useState(false);
  const [isFocused2, onFocusingHeader2] = React.useState(false);
  const [umail, onUmail] = React.useState('');
  const [upw, onUpw] = React.useState('');
  const dispatch = useAppDispatch();
  // User's client-side information, not known to the server
  const userEnter = useAppSelector(state => state.userEnter);
  // const userInfo = useAppSelector(state => state.userinfo);

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

  /**
   * Removes all in-memory data about the user
   * 
  */
  const cleanCurrentStatus = () => {
    dispatch(updateUserStatus(userClearData));
    dispatch(newUserinfoEnter(userEnterClearData));
  }

  /**
   * Signin button action, signs in the user using the given information
  */
  function userSigninAction ()  {
    const currentUserEnter: UserEnter = {
      umail: userEnter.umail,
      upw: userEnter.upw,
      upwServer: userEnter.upwServer,
      sess: ""
    };
    return dispatch(signinUser(currentUserEnter)); // Signin
  }

  /**
   * Basically the return of the dispatch
   * 
  */
  useEffect(() => { 
    if (userEnter.umail.length > 0 && userInfo.status === 'fail') {
      userSigninAction().then(() => {
        console.log("Signin Done");
      });
    }
    else {
      console.log("Signin Failed => "+ JSON.stringify(userInfo));
    }
  }, [userEnter]);

  /**
   * Checks user status after each signin action
   * 
  */
  useEffect(() => {
    if (userInfo.status === 'success' && userEnter.sess === '') {
      console.log("dispatching user sess");
      dispatch(setUserSess(userInfo.sess)); // Signin
    }
    else {
      console.log("user login failed, password incorrect, or no email and password  ");

    }
  }, [userInfo]);

  return (
    <KeyboardAvoidingView
      style={[styles.mainColor,{flex:1}]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.loginContainer, styles.mainColor]}>

          {/*email*/}
          <TextInput
            value={umail}
            onChangeText={onUmail}
            placeholder={emailPlaceHolder}
            style={[ styles.loginInput, styles.inputAreaColor
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
            style={[styles.loginInput, styles.inputAreaColor
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
            <Button title={'clear'} color={colors['--background-light']}
                    onPress={cleanCurrentStatus}
            ></Button>
            <Text style={[styles.inputAreaColor ]} >{userInfo.status}</Text>
            <Text style={[styles.inputAreaColor]} >{userInfo.statusInfo}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default UserPage;
