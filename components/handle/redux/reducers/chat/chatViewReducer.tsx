import {ChatStore, ChatMsg} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';

function nextChatId(chats: ChatStore) {
  const maxIds = chats.messages.reduce(
    (maxId: number, chat: ChatMsg) => Math.max(chat.id, maxId),
    -1,
  );
  return maxIds + 1;
}

export const ChatInputViewSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    newChat: {msg: '', sentTime: -1} as ChatMsg,
  } as ChatStore,
  reducers: {
    inputEnter: (state, action) =>{
      state.messages.push(
        {
          id: nextChatId(state),
          msg: action.payload,
        } as ChatMsg
      );
      state.newChat= {
        id: nextChatId(state),
        msg: action.payload,
      } as ChatMsg;
    }
  }
});

// actions
export const { 
  inputEnter,
} = ChatInputViewSlice.actions;

export default ChatInputViewSlice.reducer;
