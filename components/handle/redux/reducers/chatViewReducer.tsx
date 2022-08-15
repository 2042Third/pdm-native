import {ChatStore, ChatMsg} from '../../types';

const initialState = {
  messages: [],
  newChat: {msg: '', sentTime: -1} as ChatMsg,
} as ChatStore;

function nextChatId(chats) {
  const maxId = chats.messages.reduce(
    (maxId:number, chat:ChatMsg) => Math.max(chat.id, maxId),
    -1,
  );
  return maxId + 1;
}

export default function ChatViewReducer(state = initialState, action) {
  switch (action.type) {
    case 'chat/inputEnter':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: nextChatId(state),
            msg: action.payload,
          } as ChatMsg,
        ],
        newChat: {
          id: nextChatId(state),
          msg: action.payload,
        } as ChatMsg,
      };
    default:
      return state;
  }
}
