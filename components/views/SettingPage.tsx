import { Text, View} from "react-native";
import {styles} from "../../assets/Style";
import { NativeModules, Button } from 'react-native';
import React from "react";

export default function SettingsScreen({ navigation }) {
  const [nativeReturn,onNativeReturn]=React.useState('Nothing');
  const { PdmNativeCryptModule } = NativeModules;

  const onPress = () => {
    let nReturn;
    PdmNativeCryptModule.echoer(
      "This from react native!!!",
      (back)=>{
        onNativeReturn(back)
      }
    );
  };
  return (
      <View style={styles.mview}>
          <Text >{nativeReturn}</Text>
          <Button
            title={"Test Native modules(Java)."}
            onPress={onPress}
          ></Button>
      </View>
  );
}
