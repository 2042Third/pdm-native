import { DrawerContentScrollView, DrawerItemList, useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { styles, colors } from "../../../assets/Style";
import Icon from "../../icons/Icon";
import Animated from 'react-native-reanimated';
import { NavUserStatus } from "./navUserStatus";
import NotesMenu from "../../views/Notes/NotesMenu";

export default function CustomDrawerContentRight({ ...props }) {
  const progress = useDrawerProgress();
  // let translateX;
  const window = useWindowDimensions();
  // @ts-ignore
  // translateX = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [-(window.width / 2), 0],
  // });
  // console.log(`progress: ${progress}`);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotesMenu navigation={props.navigation} {...props}></NotesMenu>
      {/* <DrawerContentScrollView {...props}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <DrawerItemList state={props.state}
            navigation={props.navigation} descriptors={props.descriptors} {...props} />
        </Animated.View>
      </DrawerContentScrollView> */}

      {/* <View style={styles.footerViewStyle}>
        <View style={styles.footerContent}>
          <Icon
            name={'cog-outline'} size={24}
            onPress={() => props.navigation.navigate('Settings')}
            color={colors['--foreground-default']}
          />
        </View>
      </View> */}
    </SafeAreaView>
  );
}