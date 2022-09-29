import Slider from "@react-native-community/slider";
import React from "react";

export function SettingTimesCanTry ({...props}) {
  const touchCapture = (evt) => {
    console.log("Touch starts");
    return true;
  }

  return (
    <Slider
      onStartShouldSetResponder={touchCapture}
      // onMoveShouldSetResponderCapture={touchCapture}
      style={[{height:18}]}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  );
}
