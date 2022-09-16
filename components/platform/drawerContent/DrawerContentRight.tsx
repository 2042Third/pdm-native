import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import NotesMenu from "../../views/Notes/NotesMenu";
import { styles } from "../../../assets/Style";

export default function CustomDrawerContentRight({ ...props }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <NotesMenu navigation={props.navigation} {...props}></NotesMenu>
    </SafeAreaView>
  );
}
