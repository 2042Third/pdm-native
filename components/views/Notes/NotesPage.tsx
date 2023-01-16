import { ActivityIndicator, View } from "react-native";
// import { View, TextInput} from 'react-native';
import {styles, colors} from '../../../assets/Style';
import React, { useEffect, Suspense, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../handle/redux/hooks';
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { NotesMsg } from '../../handle/types';
import { formatDistanceToNowStrict } from "date-fns";
import { updateNotesHeaderInfo, updateNotesTimeDistance } from "../../handle/redux/reducers/notes/notesHeaderInfo";
import { useNavigation } from "@react-navigation/native";
import { userInfoStatus } from "../../handle/redux/selectors/selectorNoteHeads";

enum updateStatus{
  AllUpdated = "Up to date",
  Updating = "Updating...",
  UpdateFail = "Error Updating"
}

const NotesView = ({}) => {
  const noteEditor:NotesMsg = useAppSelector(state => state.noteEditor);
  const userStatus: string = useAppSelector(state => userInfoStatus);

  const [headerValue, onChangeText] = React.useState(noteEditor.head);
  const [noteValue, onChangeNote] = React.useState(noteEditor.content);
  const [dirty, onDirty] = React.useState(false);
  const [waitValue, onWaitValue] = React.useState(0);
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();
  // Other
  const navigation = useNavigation();
  useEffect(()=>{
    if(userStatus !== 'success'){
      navigation.navigate("User");
    }
  },[]);
  // Defaults
  const updateIntervalCheckTimeout: number = 1500;

  /**
   * Condition checkers.
   * */
  const shouldNotUpdateNote = () => {
    return noteEditor.status === "fail" || noteEditor.note_id === '';
  }

  const isDuplicateHead = () => {
    return headerValue === noteEditor.head;
  }

  const isDuplicateContent = () => {
    return noteValue === noteEditor.content;
  }

  const isDuplicateAll =() => {
    return isDuplicateContent() && isDuplicateHead();
  }

  const noUpdate = () => {
    console.log(`No update: head=${noteEditor.head}, noteHead=${headerValue}`)
  }
  const noUpdateContent = () => {
    console.log(`No update: Content=${noteEditor.content},\n noteContent=${noteValue}`)
  }

  /**
   * Update status displays
   *
   * */
  useEffect(() => {
    console.log("mounting");

    const interval = setInterval(()=>{
      dispatch(updateNotesTimeDistance(updateStatusText()));
      // console.log(`Timeout set: ${updateStatusText()}`);
    },10000);
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
    if(!dirty){
      onWaitValue(waitValue=>0);
      onDirty(dirty=>true);
      dispatch(updateNotesHeaderInfo(updateStatus.Updating));
      console.log(`pushing value => ${waitValue}, dirty=${dirty}`);
    }
  }

  /**
   * Update interval checker.
   * Updates the notes only when the user stops writing for some time.
   * */
  useEffect( ()=>{
    const interval:NodeJS.Timer = setInterval(()=>{
      // console.log(`Interval status: dirty=${dirty}, waitValue=${waitValue}`);
      if(dirty && waitValue>0) {
        if(!isDuplicateAll()){
          console.log("Update should attempt...");
          onFinishedEditAll()
            .then(r => {
              console.log("Finish update all.");
              if (noteEditor.status === 'fail'){
                // dispatch(updateNotesHeaderInfo(noteEditor.status));
                dispatch(updateNotesHeaderInfo(updateStatus.UpdateFail));
              }else {
                dispatch(updateNotesHeaderInfo(updateStatus.AllUpdated));
              }
            })
            .catch(e=>{
              console.log(e);
              dispatch(updateNotesHeaderInfo(updateStatus.UpdateFail))
            });
        }
        onDirty(dirty => false);
        onWaitValue(waitValue=>0);
        dispatch(updateNotesHeaderInfo(updateStatus.AllUpdated));
        clearInterval(interval);
      }
      else if (dirty) {
        dispatch(updateNotesHeaderInfo(updateStatus.Updating));
        onWaitValue(waitValue=>waitValue+1);
      }

    }, updateIntervalCheckTimeout);
    return ()=> { clearInterval(interval)};
  });

  /**
   * Update operations.
   *
   * */
  const onFinishedEditContent = async () => {
    if (shouldNotUpdateNote()) {
      return;
    }
    try {
      await dispatch(updateEditsContent( noteValue))
    }
    catch (e) {
      console.log("Dispatch update content failed.");
      console.log(e);
      return;
    }

    await dispatch(updateNote(noteValue,headerValue));
    console.log(`Finished update dispatch content. Note obj => ${JSON.stringify(noteEditor)}`);
  };
  /**
   * Only used in "on end edit"
   * */
  const onFinishedEditHead= async () => {
    if (shouldNotUpdateNote()) {
      return;
    }
    try {
      // await dispatch(updateEditsHead({ str: headerValue, noteMsg: noteEditor }));
      await dispatch(updateEditsHead(headerValue));
    }
    catch (e) {
      console.log("Dispatch update head failed.");
      console.log(e);
      return;
    }

    await dispatch(updateNote(noteValue, headerValue));
    console.log(`Finished update dispatch head. Note obj => ${JSON.stringify(noteEditor)}`);
  };

  const onFinishedEditAll = async () => {
    if (shouldNotUpdateNote()) {
      return;
    }
    try {
      // await dispatch(updateEditsHead({ str: headerValue, noteMsg: noteEditor }));
      await dispatch(updateEditsHead(headerValue));
      await dispatch(updateEditsContent( noteValue));
    }
    catch (e) {
      console.log("Dispatch update all failed.");
      console.log(e);
      return;
    }
    console.log(`Before finishing update dispatch all. Note obj => ${JSON.stringify(noteEditor)}`);
    await dispatch(updateNote(noteValue, headerValue));
    console.log(`Finished update dispatch all. Note obj => ${JSON.stringify(noteEditor)}`);
  }

  /**
   * Status update.
   * */
  useEffect(() => {
    const timestamp = updateStatusText();
    dispatch(updateNotesTimeDistance(timestamp));
    console.log(`update timestamp: ${timestamp}, value: ${noteEditor.update_time}`);
  }, [noteEditor]);


  /**
   * When receiving from the web
   *
   * */
  useEffect(() => {
    onChangeNote(noteEditor.content);
    console.log(`There is editing content, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.content]);

  useEffect(() => {

    onChangeText(noteEditor.head);
    console.log(`There is editing head, head \"${noteEditor.head}\", content: \"${noteEditor.content}\"`);
  }, [noteEditor.head]);

  return (
    <View style={[{flex:1},styles.notesBox, styles.container]}>
      {/*Header Start*/}
      <TextInput
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
        // onEndEditing={(!isDuplicateHead)?onFinishedEditHead:noUpdate}
        onEndEditing={onFinishedEditHead}
        placeholder={noteEditor.head === "" || noteEditor.head === null ? "Unnamed Note " + noteEditor.note_id : noteEditor.head}
        placeholderTextColor={colors['--foreground-tertiary']}
        value={headerValue}
      />
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
        onEndEditing={(!isDuplicateContent())?onFinishedEditContent:noUpdateContent}
        value={noteValue}
      />
      {/*Notes Edit End*/}
    </View>
  );
};

export default React.memo(NotesView);
