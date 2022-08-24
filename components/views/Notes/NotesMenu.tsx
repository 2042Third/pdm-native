import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import { styles } from "../../../assets/Style";
import { useAppDispatch, useAppSelector } from "../../handle/redux/hooks";
import { getHeads } from "../../handle/redux/reducers/notes/notesHeadsReducer";

const NotesMenu = () => {
  const dispatch = useAppDispatch();

  const userinfo = useAppSelector(state => state.userinfo);

  useEffect(() => {
    console.log(`Notes Menu update: ${userinfo.status}`);
    if (userinfo.status === "success"){
      dispatch(getHeads(userinfo));
    }
  }, [userinfo]);
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
