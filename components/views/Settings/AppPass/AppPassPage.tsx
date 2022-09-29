import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { styles } from "../../../../assets/Style";
import { SettingTimesCanTry } from "./AppPassSettings";

export function AppPassPage ({...props}) {
  const touchCapture = (evt:GestureResponderEvent) => {
    console.log ("AppPassPage capture starts.");
    return true;
  }
  const touchCaptureReject = (evt:GestureResponderEvent) => {
    console.log ("AppPassPage capture REJECTED.");
  }
  const touchCaptureGrant = (evt:GestureResponderEvent) => {
    console.log ("AppPassPage capture GRANTED.");
  }

  return (
    <View style={[{flex:1, padding:10},styles.mainColor]}
          onStartShouldSetResponder={touchCapture}
    >
      <SettingTimesCanTry {...props}
        onStartShouldSetResponder={touchCapture}
        onResponderGrant={touchCaptureGrant}
        onResponderReject={touchCaptureReject}
      />
    </View>
  )
}
