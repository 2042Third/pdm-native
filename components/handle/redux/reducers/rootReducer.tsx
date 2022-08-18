import chatViewReducer from './chat/chatViewReducer';
import {combineReducers} from 'redux';
import userinfoReducer from "./user/userinfoReducer";

// Not currently making anything
const rootReducer = combineReducers({
  chat: chatViewReducer,
  userinfo: userinfoReducer,
});

export default rootReducer;
