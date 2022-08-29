import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Icon from '../../icons/Icon';
import { useSelector } from "react-redux";
import { styles } from "../../../assets/Style";
import { UserInfoGeneral } from "../../handle/types";
import { useAppSelector } from "../../handle/redux/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const NavUserStatus = ( { ...props }: any) => {
  const navigation = useNavigation();
  const currentUser: UserInfoGeneral = useAppSelector(state => state.userinfo);
  useEffect(()=>{
    console.log(currentUser);
  },[currentUser]);

  const navToUser = () => {

    navigation.navigate("User", {});
  }

  return (
    <TouchableOpacity style={styles.mainSigninStatus}
      onPress={navToUser}
    >
      <Icon 
        onPress={() => { navigation.navigate('User'); }}
        name={'account'} size={24} 
        color={currentUser.status === 'success' ? "green" : "red"} />
      <Text style={styles.mainSigninStatusText} >{currentUser.username}</Text>
    </TouchableOpacity>
  );
}