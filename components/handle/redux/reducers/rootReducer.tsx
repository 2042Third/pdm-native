import chatViewReducer from './chatViewReducer';
import {combineReducers} from 'redux';
import userinfoReducer from "./userinfoReducer";

// Not currently making anything
const rootReducer = combineReducers({
  chat: chatViewReducer,
  userinfo: userinfoReducer,
});

export default rootReducer;
