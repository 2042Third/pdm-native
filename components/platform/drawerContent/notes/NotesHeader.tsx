import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../../../assets/Style";
import { useAppSelector } from "../../../handle/redux/hooks";

const NotesHeader =({props}) => {
  const note = useAppSelector( state => state.noteEditor);
  return (
    <View style={[styles.mainColor]}>
      <Text style={[styles.headerText]}>
        {note.statusInfo}
      </Text>
    </View>
  );
};

export default NotesHeader;
