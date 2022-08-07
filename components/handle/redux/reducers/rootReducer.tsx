import chatViewReducer from './chatViewReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  chat: chatViewReducer,
});

export default rootReducer;
