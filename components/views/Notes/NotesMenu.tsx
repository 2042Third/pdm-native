import { oneOfType } from "prop-types";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import { shallowEqual, useSelector } from "react-redux";
import { styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getNote } from "../../handle/redux/reducers/notes/noteEditor";
import { getHeads,  newHeads, selectNoteByKey } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NoteHeadList } from "../../handle/types";


const NotesMenu = ({navigation}) => {
  const dispatch = useAppDispatch();

  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);

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
    navigation.toggleDrawer();
    const selectedHead = selectNoteByKey(noteHead,key);
    console.log(JSON.stringify(selectedHead));
    dispatch(getNote({user:user,note_id:selectedHead.note_id}));
  };

  const NoteItem = () => {
    const children = noteHead.heads.map((item:NoteHead)=>(
      <TouchableOpacity
        key={item.key}
        onPress={ ()=>{onSelectNote(item.key)}}
      >
        <View  style={[styles.notesListingItemContainer]}>
          <Text style={[styles.normalText]}>{item.head===''?'Unnamed note '+item.id:item.head}</Text>
          <Text style={[styles.smallText]}> {item.utime}</Text>
        </View>
      </TouchableOpacity>
    ));

    return (
      <>
        {children}
      </>
    )
  }

  return (
    <View style={[]}>
      <NoteItem></NoteItem>
    </View>
  )
}
export default NotesMenu;
