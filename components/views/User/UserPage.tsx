import {
  ActivityIndicator,
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors, styles } from "../../../assets/Style";
import React, { useEffect } from 'react';
import { getHash} from "../../handle/handlers/user";
import { UserEnter, UserInfoGeneral } from "../../handle/types";
import { updateUserStatus, userClearData } from "../../handle/redux/reducers/user/userinfoReducer";
import { newUserinfoEnter, setUserSess, userEnterClearData } from "../../handle/redux/reducers/user/userinfoEnter";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { changePageOpened } from "../../handle/redux/reducers/settings/appSettings";
import { saveUserEnter } from "../../handle/redux/reducers/user/encryptedUserEnter";
import KeyboardShift from "../../uiControl/KeyboardShift";
import { ScrollView } from "react-native-gesture-handler";
import { parseTime, parseTimeShort } from "../../handle/redux/reducers/helpers";
interface UserinfoArg  {
  userInfo: UserInfoGeneral,
};

const UserPage = () => {

  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(changePageOpened("User"));
      return () => {
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
    <View style={[{flex:1, flexDirection:"column", alignContent:"stretch"}]}>
      {userScreen()}
    </View>
  );
}

// USER PROFILE
const UserProfile = ({ userInfo }: UserinfoArg) => {
  const dispatch = useAppDispatch();
  console.log("Login success, rendering from profile.");
  const eUserEnter = useAppSelector(state => state.encryptedUserEnter);

  /**
   * Removes all in-memory data about the user
   *
  */
  const cleanCurrentStatus = () => {
    dispatch(updateUserStatus(userClearData));
    dispatch(newUserinfoEnter(userEnterClearData));
  }
  return (
    <View style={[styles.mainColor,  { flex: 1 , flexDirection:"column", alignContent: "space-between"}]}>
      <>
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
        <ScrollView style={[styles.plainViewPortLimitedHeight]}>
          <>
            <Text style={[styles.inputAreaColor]} >{userInfo.status}</Text>
            <Text style={[styles.inputAreaColor]} >
              {eUserEnter ? ("local store time: " + parseTimeShort(eUserEnter.dateTimeUpdated)) : ""}
            </Text>
            <Text style={[styles.inputAreaColor,]} >
              {eUserEnter ? ("local store :" + JSON.stringify(eUserEnter)) : ""}
            </Text>
          </>
        </ ScrollView>
      </>
      <Button title={'Log Out & Clear'} color={colors['--error-default']}
        onPress={cleanCurrentStatus}
      ></Button>
    </View>
  );
}

// SIGNIN
const UserPageSignin = ({ userInfo }: UserinfoArg )=> {
  let emailPlaceHolder:string = 'email';
  let passwordPlaceHolder: string = 'password';
  let appPasswordPlaceHolder:string = 'application password';
  let loginPlaceholder:string = 'login';
  let signupPlaceholder:string = 'sign up';
  const [isFocused1, onFocusingHeader1] = React.useState(false);
  const [isFocused2, onFocusingHeader2] = React.useState(false);
  const [isFocused3, onFocusingHeader3] = React.useState(false);
  const [umail, onUmail] = React.useState('');
  const [upw, onUpw] = React.useState('');
  const [epw, onEpw] = React.useState('');
  const dispatch = useAppDispatch();

  // User's client-side information, not known to the server
  const userEnter = useAppSelector(state => state.userEnter);
  const eUserEnter = useAppSelector(state => state.encryptedUserEnter);

  /**
   * Makes the password that can be sent to server securely,
   * and signin.
   * */
  const onSubmit = async () => {
    const upwServer = await getHash(upw+upw);
    const currentUserEnter:UserEnter = {
      umail: umail, upw: upw, upwServer: upwServer,
      sess: "",timesTried:0
    };
    dispatch(newUserinfoEnter(currentUserEnter));
  };
  /**
   * Do some sign up stuff and get a user signed up.
   * */
  const onSignup = async () => {
    const upwServer = await getHash(upw+upw);
    const currentUserEnter:UserEnter = {
      umail: umail, upw: upw, upwServer: upwServer,
      sess: "",timesTried:0
    };
    // dispatch(newUserinfoEnter(currentUserEnter));
  };

  /**
   * Removes all in-memory data about the user
   *
  */
  const cleanCurrentStatus = () => {
    dispatch(updateUserStatus(userClearData));
    dispatch(newUserinfoEnter(userEnterClearData));
  }


  // Return true if can save data locally
  const shouldSaveLocal =()=>{
    return userEnter.umail.length > 0
    && userInfo.status === 'success'
    && epw !== '';
  };

  const UserEnterView = () => {
    if (userInfo.netStatus === 'loading'){
      return (
        <View style={[styles.loginContainer, styles.mainColor, {flex:1}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={[styles.loginContainer, styles.mainColor, {flex:1}]}>
          {/* Alerts */}
          <Text style={[styles.normalText,{color:userInfo.status === "fail"?colors["--error-default"]:colors['--background-default']}]}>
            {userInfo.statusInfo}
          </Text>
          {/*email*/}
          <TextInput
            value={umail}
            onChangeText={onUmail}
            placeholderTextColor={colors['--foreground-tertiary']}
            placeholder={emailPlaceHolder}
            style={[styles.loginInput, styles.inputAreaColor
              , {
                backgroundColor: isFocused1 ? colors['--background-tertiary'] : colors['--background-default']
                ,
              }]}
            onFocus={() => { onFocusingHeader1(true); }}
            onBlur={() => { onFocusingHeader1(false); }}
          />

          {/* password input */}
          <TextInput
            value={upw}
            onChangeText={onUpw}
            placeholderTextColor={colors['--foreground-tertiary']}
            placeholder={passwordPlaceHolder}
            secureTextEntry={true}
            style={[styles.loginInput, styles.inputAreaColor
              , {
                backgroundColor: isFocused2 ? colors['--background-tertiary'] : colors['--background-default']
                ,
              }]}
            onFocus={() => { onFocusingHeader2(true); }}
            onBlur={() => { onFocusingHeader2(false); }}
          ></TextInput>

          {/* app password input */}
          <TextInput
            value={epw}
            onChangeText={onEpw}
            placeholderTextColor={colors['--foreground-tertiary']}
            placeholder={appPasswordPlaceHolder}
            secureTextEntry={true}
            style={[styles.loginInput, styles.inputAreaColor
              , {
                backgroundColor: isFocused3 ? colors['--background-tertiary'] : colors['--background-default'],

              }
            ]}
            onFocus={() => { onFocusingHeader3(true); }}
            onBlur={() => { onFocusingHeader3(false); }}
          ></TextInput>

          {/* Buttons */}
          <View style={[styles.btnContainer]}>
            <Button title={loginPlaceholder} color={colors['--background-light']}
                    onPress={onSubmit}
            ></Button>
            <Button title={signupPlaceholder} color={colors['--background-light']}
                    onPress={onSignup}
            ></Button>
          </View>

          {/* Debug info */}
          <ScrollView style={[ styles.plainViewPortLimitedHeight]}>
            <>
              <Text style={[styles.inputAreaColor]} >{userInfo.status}</Text>
              <Text style={[styles.inputAreaColor]} >
                {eUserEnter ? ("local store time: "+parseTimeShort(eUserEnter.dateTimeUpdated)):""}
              </Text>
              <Text style={[styles.inputAreaColor, ]} >
                {eUserEnter ? ("local store :" + JSON.stringify(eUserEnter)) : ""}
              </Text>
            </>
          </ ScrollView>

        </View>
      );
    }
  }

  /**
   * Checks user status after each signin action
   *
  */
  useEffect(() => {
    if (userInfo.status === 'success' && userEnter.sess === '') {
      console.log("dispatching user sess");
      dispatch(setUserSess(userInfo.sess)); // Signin
      /**
     * After receiving success signin info from server, and updated the session key,
     * try to ask user to encrypt the data stored locally.
     * */
      if (shouldSaveLocal()) {
        // Make local store
        const currentUserEnter: UserEnter = {
          umail: userEnter.umail,
          upw: userEnter.upw,
          upwServer: userEnter.upwServer,
          sess: userInfo.sess,
          timesTried:0
        }
        console.log("attampt making local store");
        dispatch(saveUserEnter({ epw: epw, user: currentUserEnter }));
      }
    }
    else {
      console.log("user login failed, password incorrect, or no email and password  ");

    }
  }, [userInfo]);

  return (
    <KeyboardShift style={[styles.mainColor]}>
      {()=>(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={[styles.loginContainer, styles.mainColor, {flex:1}]}>
            {/* Alerts */}
            {userInfo.netStatus === 'pending' && <ActivityIndicator size="large" color="#0000ff" />}

            <Text style={[styles.normalText,{color:userInfo.status === "fail"?colors["--error-default"]:colors['--background-default']}]}>
              {userInfo.statusInfo}
            </Text>
            {/*email*/}
            <TextInput
              value={umail}
              onChangeText={onUmail}
              placeholderTextColor={colors['--foreground-tertiary']}
              placeholder={emailPlaceHolder}
              style={[styles.loginInput, styles.inputAreaColor
                , {
                  backgroundColor: isFocused1 ? colors['--background-tertiary'] : colors['--background-default']
                  ,
                }]}
              onFocus={() => { onFocusingHeader1(true); }}
              onBlur={() => { onFocusingHeader1(false); }}
            />

            {/* password input */}
            <TextInput
              value={upw}
              onChangeText={onUpw}
              placeholderTextColor={colors['--foreground-tertiary']}
              placeholder={passwordPlaceHolder}
              secureTextEntry={true}
              style={[styles.loginInput, styles.inputAreaColor
                , {
                  backgroundColor: isFocused2 ? colors['--background-tertiary'] : colors['--background-default']
                  ,
                }]}
              onFocus={() => { onFocusingHeader2(true); }}
              onBlur={() => { onFocusingHeader2(false); }}
            ></TextInput>

            {/* app password input */}
            <TextInput
              value={epw}
              onChangeText={onEpw}
              placeholderTextColor={colors['--foreground-tertiary']}
              placeholder={appPasswordPlaceHolder}
              secureTextEntry={true}
              style={[styles.loginInput, styles.inputAreaColor
                , {
                  backgroundColor: isFocused3 ? colors['--background-tertiary'] : colors['--background-default'],

                }
              ]}
              onFocus={() => { onFocusingHeader3(true); }}
              onBlur={() => { onFocusingHeader3(false); }}
            ></TextInput>

            {/* Buttons */}
            <View style={[styles.btnContainer]}>
              <Button title={loginPlaceholder} color={colors['--background-light']}
                      onPress={onSubmit}
              ></Button>
              <Button title={signupPlaceholder} color={colors['--background-light']}
                      onPress={onSignup}
              ></Button>
            </View>

            {/* Debug info */}
            <ScrollView style={[ styles.plainViewPortLimitedHeight]}>
              <>
                <Text style={[styles.inputAreaColor]} >{userInfo.status}</Text>
                <Text style={[styles.inputAreaColor]} >
                  {eUserEnter ? ("local store time: "+parseTimeShort(eUserEnter.dateTimeUpdated)):""}
                </Text>
                <Text style={[styles.inputAreaColor, ]} >
                  {eUserEnter ? ("local store :" + JSON.stringify(eUserEnter)) : ""}
                </Text>
              </>
            </ ScrollView>

          </View>
        </TouchableWithoutFeedback>
      )}
    </KeyboardShift>
  );
}

export default UserPage;
