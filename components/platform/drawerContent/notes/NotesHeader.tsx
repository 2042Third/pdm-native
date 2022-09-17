import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../../../assets/Style";

const NotesHeader =({header}) => {
  console.log("nav state +++++++++++ "+header.update_info);
  return (
    <View style={[styles.mainColor]}>
      <Text style={[styles.headerText]}>
        {header.update_info}
      </Text>
    </View>
  );
};

export default NotesHeader;
