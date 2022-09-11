import { DrawerContentScrollView, DrawerItemList, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { Keyboard, SafeAreaView, useWindowDimensions, View } from "react-native";
import { styles, colors } from "../../../assets/Style";
import Icon from "../../icons/Icon";
import Animated from 'react-native-reanimated';
import { NavUserStatus } from "./navUserStatus";

export default function CustomDrawerContent({ ...props }) {

  const isDrawerOpen = useDrawerStatus();

  useEffect(()=>{
    if(isDrawerOpen === "open" ){
      Keyboard.dismiss();
    }
  },[isDrawerOpen]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <NavUserStatus navigation={props.navigation} ></NavUserStatus>
        <Animated.View style={{
            }}>
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
