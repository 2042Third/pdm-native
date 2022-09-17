import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../../../assets/Style";
import { useAppSelector } from "../../../handle/redux/hooks";
import { formatDistanceToNowStrict } from 'date-fns'

const NotesHeader =({navigation}) => {


  return (
    <View style={[styles.mainColor]}>
      <Text style={[styles.headerText]}>
        {navigation.state.param.currentNoteUpdated}
      </Text>
    </View>
  );
};

export default NotesHeader;
