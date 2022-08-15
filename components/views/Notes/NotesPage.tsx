import {TextInput, View} from 'react-native';
import {styles, colors} from '../../../assets/Style';
import React from 'react';

const NotesView = () => {
  const [headerValue, onChangeText] = React.useState('');
  const [noteValue, onChangeNote] = React.useState('');
  const [isFocused, onFocusingHeader] = React.useState(false);
  return (
    <View style={[styles.notesBox, styles.container]}>
      {/*Header Start*/}
      <TextInput
        style={[
          styles.notesHeaderStyle,
          styles.inputAreaColorSecond,
          { backgroundColor: isFocused ?
              colors['--background-tertiary'] : colors['--background-default'],
          },]}
        onFocus={() => {onFocusingHeader(true);}}
        onBlur={() => {onFocusingHeader(false);}}
        onChangeText={onChangeText}
        placeholder="Unnamed Note"
        placeholderTextColor={colors['--foreground-tertiary']}
        value={headerValue}
      />
      {/*Header End*/}
      {/*Notes Edit Start*/}
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.notesEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeNote}
        value={noteValue}
      />
      {/*Notes Edit End*/}
    </View>
  );
};
export default NotesView;
