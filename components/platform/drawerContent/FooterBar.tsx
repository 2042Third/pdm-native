import {colors, styles} from '../../../assets/Style';
import {Text, View} from 'react-native';
import * as React from 'react';
import Icon from '../../icons/Icon';

let FooterBar;
export default FooterBar = () => {
  return (
    <View style={styles.container}>
      <Icon
        name={'cog-outline'}
        size={24}
        color={colors['--foreground-default']}
      />
      <Text style={styles.somet}>Hi</Text>
    </View>
  );
};
