import React from 'react';
import {Platform} from 'react-native';
// import Icon from "react-native-ionicons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let Icons;

Icon.loadFont();
export default Icons = ({...props}) => {
  // console.log( `Loading icon: ${props.name}`);
  return (
    <Icon
      name={`${props.name}`}
      // name={Platform.OS === "ios" ? `ios-${props.name}` : `md-${props.name}`}
      {...props}
    />
  );
};
