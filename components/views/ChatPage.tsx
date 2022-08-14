import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView, Platform, ScrollView,
  Text,
  TextInput,
  TouchableOpacity, TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import {colors, styles} from '../../assets/Style';
import React, {useState} from 'react';
import {useSelector, shallowEqual, Provider, useDispatch} from 'react-redux';
import ChatBox from './ChatBox';
import {useRef} from 'react';

export default function ChatView({navigation}) {
  const [chatInputValue, onChangeNote] = React.useState('');
  const [inputBlur, onInputBlur] = React.useState(false);
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const handleKeyDown = e => {
    // If the user pressed the Enter key:
    const trimmedText = chatInputValue.trim();
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({type: 'chat/inputEnter', payload: trimmedText});
      // And clear out the text input
      onChangeNote('');
    }
  };
  const handlePress = e => {
    if (chatInputValue.length === 0) {
      return;
    }
    const trimmedText = chatInputValue.trim();
    dispatch({type: 'chat/inputEnter', payload: trimmedText});
    // And clear out the text input
    onChangeNote('');
  };
  // CHAT DATA
  const [thisFlatlist, setReference] = useState(null);
  // const thisFlatlist:React.MutableRefObject<FlatList> = useRef(null);
  const selectChatIds = state => state.chat.messages.map(chat => chat.id);
  const chatIds = useSelector(selectChatIds, shallowEqual);

  return (
    <KeyboardAvoidingView
        style={[
          {flexGrow: 3},
          styles.chatMainBox,
          styles.mainColor,
          {flexDirection: 'column',

          },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      {/*<View style={[*/}
      {/*  {flex: 9}*/}
      {/*]}>*/}
      {/*  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
          <View style={[{
            flexGrow: 1,
            justifyContent: 'space-around'  }]}>

            <View
              style={[{
                flexGrow: 9
                // maxHeight: window.height * 0.88
              }]}>
              <FlatList
                style={[styles.inputAreaColor, {flex:1}]}
                data={chatIds}
                renderItem={({item}) => <ChatBox key={item} id={item} self={true} />}
                onTouchStart={() => Keyboard.dismiss()}
                ref={ref => {
                  setReference(ref);
                }}
                onContentSizeChange={() => thisFlatlist.scrollToEnd({animated: true})}
                onLayout={() => thisFlatlist.scrollToEnd({animated: true})}
              />
            </View>
            <View
              style={[
                {

                  flexGrow:0.01,
                  // flexDirection: 'row',
                  // height: 90,
                },
              ]}>
              <TextInput
                multiline={true}
                textAlignVertical={'top'}
                style={[styles.chatEditStyle, styles.inputAreaColor, {
                  flexGrow: 1,
                  height: 30,
                  marginBottom: 36
                }]}
                onChangeText={onChangeNote}
                // onKeyDown={handleKeyDown}
                value={chatInputValue}
              />
              <TouchableOpacity
                style={[
                  {backgroundColor: colors['--background-tertiary'],
                    height: 30,
                    marginBottom: 36
                    // minHeight: 30,
                  },
                  styles.styledButton1,
                ]} onPress={handlePress}>
                <Text
                  style={[
                    { backgroundColor: colors['--background-tertiary'],
                      color: colors['--foreground-default'] },]}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        {/*</TouchableWithoutFeedback>*/}

      {/*</View>*/}
    </KeyboardAvoidingView>
  );
}
