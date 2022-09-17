import { ActivityIndicator, View } from "react-native";
// import { View, TextInput} from 'react-native';
import {styles, colors} from '../../../assets/Style';
import React, { useEffect, Suspense, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
// import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../handle/redux/hooks';
import { UpdateNoteArg } from '../../handle/models';
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { useDispatch } from 'react-redux';
import { NotesMsg } from '../../handle/types';
import { formatDistanceToNowStrict } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { newNotesHeaderInfo } from "../../handle/redux/reducers/notes/notesHeaderInfo";

const NotesView = ({}) => {
  const [headerValue, onChangeText] = React.useState('');
  const [noteValue, onChangeNote] = React.useState('');
  let writtingStatus = {dirty:false,wait:false};
  // const [writtingStatus, onWrittingStatus] = React.useState({dirty:false,wait:false});
  const [wait, onWait] = React.useState(false);
  const [dirty, onDirty] = React.useState(false);
  const [waitValue, onWaitValue] = React.useState(0);
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();

  const noteEditor:NotesMsg = useAppSelector(state => state.noteEditor);
  const user = useAppSelector(state => state.userEnter);

  const navigation = useNavigation();




  useEffect(() => {
    console.log("mounting");

    const interval = setInterval(()=>{
      dispatch(newNotesHeaderInfo(updateStatusText()));
      console.log(`Timeout set: ${updateStatusText()}`);
    },30000);
    return ()=>{
      clearInterval(interval);
      console.log("Cleared interval");
    }
  }, []);


  const updateStatusText = () => {
    if(!noteEditor || !noteEditor.update_time){
      return '';
    }
    return formatDistanceToNowStrict((noteEditor.update_time)*1000);
  };

  const onStartingWrite = () => {
    onWaitValue(waitValue=>0);
    onWait(wait=>false);
    if(!dirty){
      onDirty(dirty=>true);
      console.log(`pushing value => ${waitValue}, wait=${wait}, dirty=${dirty}`);
// waitAndCheck();
    }
    else {
      return;
    }
  }

  useEffect( ()=>{
    console.log(`waiting value => ${waitValue}, wait=${wait}, dirty=${dirty}`);
    let interval:NodeJS.Timer ;
      interval = setInterval(()=>{
        // if(wait){
          console.log(`now value => ${waitValue}, wait=${wait}, dirty=${dirty}`);
          // onWait(wait => false);
        if(dirty && waitValue>2) {
          console.log("I am writting...");
          onDirty(dirty => false);
          onWaitValue(waitValue=>0);
        }
        else if (dirty) {
          onWaitValue(waitValue=>waitValue+1);

        }
        // }
      },2000);
    // }

    return ()=> { clearInterval(interval)};
  });

  const onFinishedEditContent = async () => {
    if (noteEditor.status === "fail" || noteEditor.note_id === '') {
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
    const timestamp = updateStatusText();
    dispatch(newNotesHeaderInfo(timestamp));
    console.log(`update timestamp: ${timestamp}, value: ${noteEditor.update_time}`);
  }, [noteEditor]);

  useEffect(() => {
    onChangeNote(noteEditor.content);
    console.log(`There is editing, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.content]);

  useEffect(() => {

    onChangeText(noteEditor.head);
    console.log(`There is editing, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.head]);

  return (
    <View style={[{flex:1},styles.notesBox, styles.container]}>
      {/*Header Start*/}
      {/* <ScrollView> */}

          <TextInput
            // disallowInterruption={true}

            style={[
              styles.notesHeaderStyle,
              styles.inputAreaColorSecond,
              {
                backgroundColor: isFocused ?
                  colors['--background-tertiary'] : colors['--background-default'],
              },]}
            onFocus={() => { onFocusingHeader(true); }}
            onBlur={() => { onFocusingHeader(false); }}
            onChangeText={onChangeText}
            // onKeyPress={onStartingWrite}
            onEndEditing={onFinishedEditHead}
            placeholder={noteEditor.head === "" || noteEditor.head === null ? "Unnamed Note " + noteEditor.note_id : noteEditor.head}
            placeholderTextColor={colors['--foreground-tertiary']}
            value={headerValue}
          />
        {/* </ScrollView> */}
        {/*Header End*/}

        {/*Notes Edit Start*/}
        <TextInput
          multiline={true}
          scrollEnabled={true}
          contextMenuHidden={true}
          textAlignVertical={'top'}
          onKeyPress={onStartingWrite}
          style={[styles.notesEditStyle, styles.inputAreaColor]}
          onChangeText={onChangeNote}
          autoCorrect={false}
          onEndEditing={onFinishedEditContent}
          value={noteValue}
        />
      {/*Notes Edit End*/}
    </View>
  );
};

// export default gestureHandlerRootHOC(NotesView);
// export default NotesView;
export default React.memo(NotesView);
