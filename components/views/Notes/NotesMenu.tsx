import { oneOfType } from "prop-types";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import { styles } from "../../../assets/Style";
import { dec } from "../../handle/handlers/user";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getHeads, newHeads } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NoteHeadList } from "../../handle/types";
import NotesHead from "./NotesHead";


const NotesMenu = () => {
  const dispatch = useAppDispatch();

  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);

  useEffect(() => {
    console.log(`Notes Menu update: ${userinfo.status}`);
    if (userinfo.status === "success") {
      dispatch(getHeads({ userinfo: userinfo, user: user }));
    }
  }, [userinfo]);

  const NoteItem = () => {
    const children = noteHead.heads.map((item:NoteHead)=>(
      <View key={item.key} style={[styles.notesListingItemContainer]}>
        <Text>{item.head===''?'Unnamed note '+item.id:item.head}</Text>
      </View>
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
