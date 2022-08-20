import { DrawerContentScrollView, DrawerItemList, useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import { styles, colors } from "../../../assets/Style";
import Icon from "../../icons/Icon";
import Animated from 'react-native-reanimated';
import { NavUserStatus } from "./navUserStatus";

export default function CustomDrawerContent({ ...props }) {
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
        <NavUserStatus navigation={props.navigation} ></NavUserStatus>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <DrawerItemList state={props.state}
            navigation={props.navigation} descriptors={props.descriptors} {...props} />
        </Animated.View>
      </DrawerContentScrollView>
      {/*footer*/}
      <View style={styles.footerViewStyle}>
        <View style={styles.footerContent}>
          <Icon
            name={'cog-outline'} size={24}
            onPress={() => props.navigation.navigate('Settings')}
            color={colors['--foreground-default']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}