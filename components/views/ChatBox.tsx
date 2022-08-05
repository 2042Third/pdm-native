import { useSelector } from "react-redux";
import { FlatList, Text, View } from "react-native";
import React from "react";
import { styles } from "../../assets/Style";

let ChatBox;
export default ChatBox = ({id}) => {

  const selectChatById = (state, chatId) => {
    return state.chat.messages.find((chat) => chat.id === chatId)
  }

  const chat = useSelector((state) => selectChatById(state, id));
  const { msg, sentTime, color } = chat
  return (
    <View style={[styles.inputAreaColor,]}>

      <Text style={styles.somet}>{msg}</Text>
    </View>
  );
}
