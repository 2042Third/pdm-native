import Slider from "@react-native-community/slider";
import React, { useEffect } from "react";
import { GestureResponderEvent, Text } from "react-native";
import { styles } from "../../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../../handle/redux/hooks";
import { changeTimesCanTry } from "../../../handle/redux/reducers/settings/appSettings";

export function SettingTimesCanTry ({...props}) {
  const appSettings = useAppSelector(state => state.appSettings);
  const dispatch = useAppDispatch();

  // Prints
  const touchCapture = (evt:GestureResponderEvent) => {
    console.log("SettingTimesCanTry Touch starts");
    return true;
  }

  const touchCaptureReject = (evt:GestureResponderEvent) => {
    console.log ("SettingTimesCanTry capture REJECTED.");
  }

  const touchCaptureGrant = (evt:GestureResponderEvent) => {
    console.log ("SettingTimesCanTry capture GRANTED.");
  }

  // Setters
  const onValueChange = (val:number) => {
    dispatch(changeTimesCanTry(val));
    console.log(`TimesCanTry Value changed to => ${val}`)
  }

  return (
    <>
      <Text style={[styles.lessNormalText, {padding:10}]}>
        Number of Times App Password Can Try
      </Text>
      <Text style={[styles.normalText,{paddingLeft:10}]}>
        {appSettings.timesCanTry} times
      </Text>
      <Slider
        onStartShouldSetResponder={touchCapture}
        onMoveShouldSetResponderCapture={touchCapture}
        onResponderGrant={touchCaptureGrant}
        onResponderReject={touchCaptureReject}
        onValueChange={onValueChange}
        value={appSettings.timesCanTry}
        style={[{height:18}]}
        minimumValue={1}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </>
  );
}
