import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView, Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {colors, styles} from '../../../assets/Style';
import React, {useState, Suspense, } from 'react';
import {useSelector, shallowEqual, Provider, useDispatch} from 'react-redux';
import ChatBox from './ChatBox';
// const ChatBox = lazy(()=> import('./ChatBox'));
import { PdmActions } from "../../handle/redux/reducers/actionType";
import { inputEnter } from "../../handle/redux/reducers/chat/chatViewReducer";
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch } from "../../handle/redux/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { recordPageChange } from "../../handle/handlers/records";
import { changePageOpened } from "../../handle/redux/reducers/settings/appSettings";

export default function ChatView({}) {
  const [chatInputValue, onChangeChatInput] = React.useState('');
  const [thisFlatlist, setReferenceList] = useState(undefined);
  const dispatch = useAppDispatch();


  useFocusEffect(
    React.useCallback(() => {
      // console.log("mounting chat ");
      // recordPageChange("Chat");
      dispatch(changePageOpened("Chat"));
      return () => {
        // console.log("return mounting chat");
        // Useful for cleanup functions
      };
    }, [])
  );

  const setCurrentInput=(trimmedText:string) =>{
    if(trimmedText){
      onChangeChatInput('');// And clear out the text input
      dispatch(inputEnter( trimmedText ));// Dispatch the action with this text
    }
  }

  // Button "Send"
  const handlePress = (e: { nativeEvent: { key: any; }; type: any; }) => {
    console.log(`Key Press: ${e.nativeEvent.key}\nTarget Type: ${e.type}`);
    if (chatInputValue.length === 0) {
      return;
    }
    const trimmedText = chatInputValue.trim();
    dispatch(inputEnter(trimmedText));// Dispatch the action with this text
    onChangeChatInput("");// And clear out the text input
  };
  // Button "enter"
  const handleKeyPress = (e: { nativeEvent: { key: string; }; type: any; }) => {
    console.log(`Key Press: ${e.nativeEvent.key}\nTarget Type: ${e.type}`);
    if (chatInputValue.length === 0) {
      return;
    }
    const trimmedText = chatInputValue.trim();
    if(e.nativeEvent.key==='Enter' && trimmedText){
      dispatch(inputEnter(trimmedText));// Dispatch the action with this text
      setTimeout(()=>{
        onChangeChatInput('');// And clear out the text input
        },50);
    }
  };

  // CHAT DATA
  const selectChatIds = (state: { chat: { messages: any[]; }; }) => state.chat.messages.map((chat: { id: any; }) => chat.id);
  const chatIds = useSelector(selectChatIds, shallowEqual);


  return (
    <KeyboardAvoidingView
        style={[
          {flexGrow: 3},
          styles.chatMainBox,
          styles.mainColor,
          {flexDirection: 'column', },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Suspense fallback={
        <View style={[styles.centeredView]}>
          <ActivityIndicator />
        </View>
      }>
          <View style={[{
            flexGrow: 1,
            justifyContent: 'space-around'  }]}>

            {/*Chat Messages View*/}
            <View style={[{ flexGrow: 9 }]}>
              <FlatList
                removeClippedSubviews={true}
                style={[styles.inputAreaColor, {flex:1}]}
                data={chatIds}
                renderItem={({item}) => <ChatBox id={item} self={true} />}
                onTouchStart={() => Keyboard.dismiss()}
                ref={ref => {setReferenceList(ref);}}
                onContentSizeChange={() => thisFlatlist.scrollToEnd({animated: true})}
                onLayout={() => thisFlatlist.scrollToEnd({animated: true})}
              />
            </View>

            {/*Input Group*/}
            <View
              style={[{ flexGrow:0.01, },]}>

              {/*Input Box*/}
              <TextInput
                value={chatInputValue}
                multiline={true}
                textAlignVertical={'top'}
                style={[styles.chatEditStyle, styles.inputAreaColor, {
                  flexGrow: 1,
                  height: 30,
                  marginBottom: 36
                }]}
                onKeyPress={handleKeyPress}
                onChangeText={onChangeChatInput}
              />

              {/*"Send" Button*/}
              <TouchableOpacity
                style={[
                        { backgroundColor: colors['--background-tertiary'],
                          height: 30,
                          marginBottom: 36
                        },
                        styles.styledButton1,
                      ]}
                onPress={handlePress}
              >
                <Text
                  style={[
                    { backgroundColor: colors['--background-tertiary'],
                      color: colors['--foreground-default'] },]}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </Suspense>
    </KeyboardAvoidingView>
  );
}
