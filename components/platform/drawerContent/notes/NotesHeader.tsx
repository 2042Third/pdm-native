import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../../../assets/Style";
import { useAppSelector } from "../../../handle/redux/hooks";

const NotesHeader =({props}) => {
  const note = useAppSelector( state => state.noteEditor);

  const updateStatusText = () => {
    return note.statusInfo;
  };

  return (
    <View style={[styles.mainColor]}>
      <Text style={[styles.headerText]}>
        {updateStatusText()}
      </Text>
    </View>
  );
};

export default NotesHeader;
