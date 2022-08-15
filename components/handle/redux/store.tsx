import {createStore} from 'redux';
import ChatViewReducer from './reducers/chatViewReducer';
import {configureStore} from '@reduxjs/toolkit';
import userinfoReducer from "./reducers/userinfoReducer";
import NotesHeadsReducer from "./reducers/notesHeadsReducer";
export const store = configureStore({
  reducer: {
    chat: ChatViewReducer,
    userinfo: userinfoReducer,
    noteHeads: NotesHeadsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
