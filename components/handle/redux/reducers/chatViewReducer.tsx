import {ChatStore, ChatMsg} from "../types";



const initialState = {
  messages: [],
  newChat: {msg:'',sentTime:-1} as ChatMsg,
} as ChatStore;

export default function ChatViewReducer (state = initialState, action){
  switch (action.type) {
    case 'chat/inputEnter':
      return {
        ...state,
        messages: [...state.messages,action.payload],
        newChat: action.payload,
      };
    default:
      return state;
  }
}
