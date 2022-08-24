import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../../assets/Style";
import { NoteHead } from "../../handle/types";

const NotesHead = (note:NoteHead) => {
  return (
    <View style={[styles.mainColor]}>
      <Text style={[styles.inputAreaColor]}>
        {}
      </Text>
    </View>
  );
};
export default NotesHead;