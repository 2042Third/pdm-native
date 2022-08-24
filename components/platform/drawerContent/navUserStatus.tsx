import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Icon from '../../icons/Icon';
import { useSelector } from "react-redux";
import { styles } from "../../../assets/Style";
import { UserInfoGeneral } from "../../handle/types";
import { useAppSelector } from "../../handle/redux/hooks";

export const NavUserStatus = (navigation: { navigate: (arg0: string) => void; }, { ...props }: any) => {
  // User status updates the color of the user icon
  // const selectUser = state => state.userinfo;
  const currentUser: UserInfoGeneral = useAppSelector(state => state.userinfo);
  useEffect(()=>{
    console.log(currentUser);

  },[currentUser]);
  return (
    <View style={styles.mainSigninStatus}>
      <Icon 
        onPress={() => { navigation.navigate('User'); }}
        name={'account'} size={24} 
        color={currentUser.status === 'success' ? "green" : "red"} />
      <Text style={styles.mainSigninStatusText} >{currentUser.username}</Text>
    </View>
  );
}