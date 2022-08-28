import { View} from 'react-native';
import {styles, colors} from '../../../assets/Style';
import React, { useEffect } from 'react';
import { TextInput, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../handle/redux/hooks';
import { UpdateNoteArg } from '../../handle/models';
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { useDispatch } from 'react-redux';
import { NotesMsg } from '../../handle/types';

const NotesView = () => {
  const [headerValue, onChangeText] = React.useState('');
  const [noteValue, onChangeNote] = React.useState('');
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();

  const noteEditor:NotesMsg = useAppSelector(state => state.noteEditor);
  const user = useAppSelector(state => state.userEnter);

  const onFinishedEditContent = async () => {
    if (noteEditor.status !== "success" || noteEditor.note_id === '') {
      return;
    }
    console.log(`START FINISHER content`)
    try {
      await dispatch(updateEditsContent({ str: noteValue, noteMsg: noteEditor }))
    }
    catch (e) {
      console.log("Dispatch update content failed.");
      console.log(e);
      return;
    }

    const arg: UpdateNoteArg = {
      user: user,
      noteMsg: { ...noteEditor, content: noteValue }
    };
    dispatch(updateNote(arg));
    console.log(`Finished update dispatch content. Note obj => ${JSON.stringify(noteEditor)}`);
  };

  const onFinishedEditHead= async () => {
    if (noteEditor.status !== "success" || noteEditor.note_id === '') {
      return;
    }
    console.log(`START FINISHER head`)
    try {
      await dispatch(updateEditsHead({ str: headerValue, noteMsg: noteEditor }));
    }
    catch (e) {
      console.log("Dispatch update head failed.");
      console.log(e);
      return;
    }
    const arg: UpdateNoteArg = {
      user: user,
      noteMsg: { ...noteEditor, head: headerValue }
    };
    dispatch(updateNote(arg));
    console.log(`Finished update dispatch head. Note obj => ${JSON.stringify(noteEditor)}`);
  };

  useEffect(() => {
    onChangeNote(noteEditor.content);
    console.log(`There is editing, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.content]);
  useEffect(() => {
    onChangeText(noteEditor.head);
    console.log(`There is editing, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.head]);

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
        onEndEditing={onFinishedEditHead}
        placeholder={noteEditor.head === "" || noteEditor.head=== null ? "Unnamed Note "+noteEditor.note_id:noteEditor.head}
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
        onEndEditing={onFinishedEditContent}
        value={noteValue}
      />
      {/*Notes Edit End*/}
    </View>
  );
};

// export default gestureHandlerRootHOC(NotesView);
export default React.memo(NotesView);
