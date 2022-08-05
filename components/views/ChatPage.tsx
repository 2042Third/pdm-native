import { Button, FlatList, ScrollView, TextInput, useWindowDimensions, View } from "react-native";
import {styles} from "../../assets/Style";
import React from "react";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import ChatBox from "./ChatBox";
export default function ChatView({navigation}) {

  const [chatInputValue, onChangeNote] = React.useState('');
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    // If the user pressed the Enter key:
    const trimmedText = chatInputValue.trim()
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'chat/inputEnter', payload: trimmedText })
      // And clear out the text input
      onChangeNote('')
    }
  }
  const handlePress =(e) =>{
    const trimmedText = chatInputValue.trim()
    dispatch({ type: 'chat/inputEnter', payload: trimmedText })
    // And clear out the text input
    onChangeNote('')
  }
  // CHAT DATA

  const selectChatIds = (state) => state.chat.messages.map((chat) => chat.id);
  const chatIds = useSelector(selectChatIds, shallowEqual);

  return (
      <View style={[styles.chatMainBox,styles.container]}>
          {/*<ScrollView style={[styles.chatDisplayBox, styles.inputAreaColor]}>*/}
            <FlatList
              style={[styles.chatDisplayBox, styles.inputAreaColor]}
              data={chatIds}
              renderItem={({item}) =>
                <ChatBox key={item} id={item}></ChatBox>
              }
            >
            </FlatList>
          {/*</ScrollView>*/}
          <TextInput
            multiline={true}
            textAlignVertical={'top'}
            style={[styles.chatEditStyle, styles.inputAreaColor]}
            onChangeText={onChangeNote}
            // onKeyDown={handleKeyDown}
            value={chatInputValue}></TextInput>
          <Button title={"Send"}
            onPress={handlePress}
          ></Button>

    </View>
  );
}
