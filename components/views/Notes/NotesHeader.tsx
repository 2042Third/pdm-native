
import { DrawerActions } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-ui-lib';
import { styles } from '../../../assets/Style';
import Icon from '../../icons/Icon';

const NotesHeader = ({navigation}) => {
  return (
    <View style={[styles.drawerHeaderStyle]}>
      <View style={[styles.drawerHeaderIconLeft]}>
        <Icon
          onPress={() => { navigation.getParent().toggleDrawer() }}
          // onPress={(navigation) => { navigation.dispatch(DrawerActions.openDrawer()) }}
          name={'menu'} size={24}
        />
      </View>
      <View >
        <Text style={[styles.drawerHeaderTitleStyle]}> Note</Text>
      </View>
      <View style={[styles.drawerHeaderIconRight]}>
        <Icon
          onPress={() => { navigation.toggleDrawer() }}
          // onPress={(navigation) => { navigation.dispatch(DrawerActions.openDrawer()) }}
          name={'menu'} size={24}
        />
      </View>
    </View>
  ) ;
};

export default NotesHeader;
