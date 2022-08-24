import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import { styles } from "../../../assets/Style";
import { dec } from "../../handle/handlers/user";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { decHeads, getHeads, newHeads } from "../../handle/redux/reducers/notes/notesHeadsReducer";
import { NoteHead, NoteHeadList } from "../../handle/types";
import NotesHead from "./NotesHead";


const NotesMenu = () => {
  const dispatch = useAppDispatch();

  const userinfo = useAppSelector(state => state.userinfo);
  const user = useAppSelector(state => state.userEnter);
  const noteHead = useAppSelector(state => state.noteHeads);

  

  const decryptAllHeads = async (input:NoteHeadList) => {
    const a = input.heads;
    let b = [];
    console.log(`decryptAllHeads ${JSON.stringify(input)}`);
    for (let i = 0; i < a.length; i++) {
      const h: NoteHead = a[i];
      let tmpH:NoteHead = new NoteHead;
      tmpH = h;
      const decO = await dec(user.upw, h.head);
      if (decO!= null)
        tmpH.head = decO;
      console.log(`tmpH ${JSON.stringify(tmpH)}`);
      b.push(tmpH);
    }
    dispatch(newHeads({
      heads: b,
      netHash: input.netHash
    }));
    return b;
  };

  useEffect(() => {
    console.log(`Notes Menu update: ${userinfo.status}`);
    if (userinfo.status === "success") {
      dispatch(getHeads({ userinfo: userinfo, user: user }));
      // setTimeout(async () => {
      //   dispatch(decHeads({heads:noteHead, user:user})); //decryptAllHeads(noteHead);
      // }, 1000);
    }
  }, [userinfo]);

  // useEffect(() => {
  //   console.log(`Notes Menu head update: ${userinfo.status}`);
  //   dispatch(newHeads({
  //     heads: decryptAllHeads(noteHead.heads),
  //     netHash: noteHead.netHash
  //   }));
  // }, [noteHead]);

  return (
    <View style={[styles.container]}>
      {/* <FlatList
                removeClippedSubviews={true}
        style={[styles.inputAreaColor, { flex: 1 }]}
        data={chatIds}
        renderItem={({ item }) => <ChatBox id={item} self={true} />}
        onTouchStart={() => Keyboard.dismiss()}
        ref={ref => { setReferenceList(ref); }}
        onContentSizeChange={() => thisFlatlist.scrollToEnd({ animated: true })}
        onLayout={() => thisFlatlist.scrollToEnd({ animated: true })}
      /> */}
    </View>
  )
}
export default NotesMenu;
