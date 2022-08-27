import { oneOfType } from "prop-types";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { shallowEqual, useSelector } from "react-redux";
import { styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getNote } from "../../handle/redux/reducers/notes/noteEditor";
import { getHeads,  newHeads, selectNoteByKey } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NoteHeadList } from "../../handle/types";
import Icon from "../../icons/Icon";
import * as RootNavigation from "../../platform/RootNavigation";

import { useNavigation } from '@react-navigation/native';
const NotesMenu = ({  }) => {
  // const NotesMenu = ({navigation}) => {
  const dispatch = useAppDispatch();
  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);
  const navigation = useNavigation();

  useEffect(() => {
    if(user.sess !== ''){
      console.log(`Notes Menu update: ${userinfo.status}`);
      if (userinfo.status === "success") {
        dispatch(getHeads({ userinfo: userinfo, user: user }));
      }
    }
  }, [user]);

  useEffect(()=>{
    console.log("mountin note menu");
  },[]);

  const selectNoteId = (state: { noteHeads: { heads: NoteHead[]; }; }) => state.noteHeads.heads.map((head) => head.key);
  const noteids = useSelector(selectNoteId, shallowEqual);

  const onSelectNote = (key:string)=> {
    // if (navigationRef.isReady()) {
      // RootNavigation.toggleDrawer();
    // }
    navigation.navigate("NotesEdit",{});
    const selectedHead = selectNoteByKey(noteHead,key);
    console.log(JSON.stringify(selectedHead));
    dispatch(getNote({user:user,note_id:selectedHead.note_id}));
  };

  const NoteItemCell = (item:NoteHead) => {
    console.log("item mounting");
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => { onSelectNote(item.key) }}
      >
        <View style={[styles.notesListingItemContainer]}>
          <Text style={[styles.normalText]}>{item.head === '' ? 'Unnamed note ' + item.id : item.head}</Text>
          <Text style={[styles.smallText]}> {item.utime}</Text>
        </View>
      </TouchableOpacity>
      
    );
  } 

  const NoteItem = () => {
    console.log(`Menu re-render`);
    const children = noteHead.heads.map((item:NoteHead)=>(
      NoteItemCell(item)
    ));
    return (
      <>
        {children}
      </>
    )
  }
  
  const createNewNote = () => {

  };

  return (
    <View style={[]}>
      <TouchableOpacity
        style={[styles.lightContainerColor,styles.centerTextContainer, styles.centerTextPadding]}
        onPress={createNewNote}
      >
        <Icon style={[styles.menuButton]}
          name={'playlist-plus'} size={30}
        />
        <Text style={[styles.normalText]}>New Note</Text>
      </TouchableOpacity>
      <NoteItem></NoteItem>
    </View>
  )
}
// export default NotesMenu;
export default React.memo(NotesMenu);
