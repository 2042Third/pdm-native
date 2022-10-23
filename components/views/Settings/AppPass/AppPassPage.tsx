import React, { Suspense } from 'react';
import { ActivityIndicator, GestureResponderEvent, View } from "react-native";
import { styles } from "../../../../assets/Style";
// import { SettingTimesCanTry } from "./AppPassSettings";
const SettingTimesCanTry = React.lazy(()=> import ( "./AppPassSettings"));

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
        // onStartShouldSetResponder={touchCapture}
    >
      <Suspense fallback={<View ><ActivityIndicator /></View>}>
        <SettingTimesCanTry {...props}
                            onStartShouldSetResponder={touchCapture}
        />
      </Suspense>

    </View>
  )
}
