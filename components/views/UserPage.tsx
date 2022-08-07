import {Button, Text, View} from 'react-native';
import {styles} from '../../assets/Style';
import React from 'react';

export default function DetailsScreen({navigation}) {
  return (
    <View style={styles.mview}>
      <Text style={styles.somet}>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
