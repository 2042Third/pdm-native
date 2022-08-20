import { DrawerContentScrollView, DrawerItemList, useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { styles, colors } from "../../../assets/Style";
import Icon from "../../icons/Icon";
import Animated from 'react-native-reanimated';
import { NavUserStatus } from "./navUserStatus";

export default function CustomDrawerContentRight({ ...props }) {
  const progress = useDrawerProgress();
  let translateX;
  const window = useWindowDimensions();
  // @ts-ignore
  translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-(window.width / 2), 0],
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>Hello</Text>
        </View>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <DrawerItemList state={props.state}
            navigation={props.navigation} descriptors={props.descriptors} {...props} />
        </Animated.View>
      </DrawerContentScrollView>
      
    </SafeAreaView>
  );
}