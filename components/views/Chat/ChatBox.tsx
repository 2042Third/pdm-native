import {useSelector} from 'react-redux';
import {FlatList, Text, View} from 'react-native';
import React, { PureComponent } from "react";
import {colors, styles} from '../../../assets/Style';
import { ChatStore } from "../../handle/types";

let ChatBox;
export default ChatBox = ({id, ...props}) => {
  const selectChatById = (state, chatId) => {
    return state.chat.messages.find(chat => chat.id === chatId);
  };
  const isSelf = props.self;
  const chat = useSelector(state => selectChatById(state, id));
  const {msg, sentTime, color} = chat;
  return (
    <View style={[styles.inputAreaColor]}>
      <Text
        style={[
          styles.chatBox,
          {
            color: 'black',
            backgroundColor: isSelf
              ? colors['--chat-box-1']
              : colors['--chat-box-2'],
            textAlign: isSelf ? 'right' : 'left',
          },
        ]}>
        {msg}
      </Text>
    </View>
  );
};
