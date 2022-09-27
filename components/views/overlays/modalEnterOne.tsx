import React, { useEffect } from "react";
import { Component } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";
import connect from "react-redux/es/components/connect";
import { colors, styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { parseTimeShort } from "../../handle/redux/reducers/helpers";
import { encryptedUserEnterClearData, newEncUserinfoEnter, saveUserEnter } from "../../handle/redux/reducers/user/encryptedUserEnter";
import { decryptLocal, setUserSess } from "../../handle/redux/reducers/user/userinfoEnter";
import { UserEnter } from "../../handle/types";

export class EnterModalOneType{
  visible:boolean=true;
}

const EnterModalOne = ({ visible }: EnterModalOneType ) => {
  const modalVisible = visible;
  const [epw, onEpw] = React.useState('');
  const [isFocused3, onFocusingHeader3] = React.useState(false);
  const dispatch = useAppDispatch();
  const eUserEnter = useAppSelector(state => state.encryptedUserEnter);
  const userInfo = useAppSelector(state => state.userinfo);
  const userEnter = useAppSelector(state => state.userEnter);

  const onSubmit = () => {
    console.log("Logging local");
    dispatch(
      decryptLocal({
        timesTried: userEnter.timesTried,
        epw: epw,
        encUserEnter: eUserEnter.userEnter
      })
    )
  };

  const deleteLocalData = () => {
    dispatch(newEncUserinfoEnter(encryptedUserEnterClearData));
  }

  // Return true if can save data locally
  const shouldSaveLocal = () => {
    return userEnter.umail.length > 0
      && userInfo.status === 'success'
      && epw !== '';
  };
  /**
   * Checks user status after each signin action
   *
  */
  useEffect(() => {

    if (userInfo.status === 'success' ) {


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
          timesTried: 0
        };
        console.log("attampt making local store");
        dispatch(saveUserEnter({ epw: epw, user: currentUserEnter }));
      }
    }
    else {
      console.log("user login failed, password incorrect, or no email and password  => "+ JSON.stringify(userInfo));

    }
  }, [userInfo.status]);

    console.log("EnterModalOne rendering ... ");
    return(
        <Modal
          visible={modalVisible}
          style={[]}
        >
        <View style={[styles.loginContainer, styles.mainColor, { flex: 1 }]}>
            <Text style={[styles.mainColor]}>
            {"Encrypted local data from \n" + parseTimeShort(eUserEnter.dateTimeUpdated) +"\nPlease enter application password"}
            </Text>
          {/* Alerts */}
          <Text style={[styles.normalText,{color:userEnter.timesTried>0?colors["--error-default"]:colors['--background-default']}]}>
            {userEnter.timesTried}
          </Text>
          {/* Input */}
          <TextInput
            value={epw}
            onChangeText={onEpw}
            placeholderTextColor={colors['--foreground-tertiary']}
            placeholder={"Application Password"}
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
            <Button title={"Done"} color={colors['--background-light']}
              onPress={onSubmit}
            ></Button>
            <Button title={"Clear local data"} color={colors['--background-light']}
              onPress={deleteLocalData}
            ></Button>
          </View>
        </View>
      </Modal>
    );
};

export default EnterModalOne;
