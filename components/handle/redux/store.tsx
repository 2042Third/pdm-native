
import ChatInputViewReducer from './reducers/chat/chatViewReducer';
import {configureStore} from '@reduxjs/toolkit';
import UserinfoStatusReducer from "./reducers/user/userinfoReducer";
import NotesHeadsReducer from "./reducers/notes/notesHeadsReducer";
import NoteEditorReducer from "./reducers/notes/noteEditor";
import UserinfoEnterReducer from './reducers/user/userinfoEnter';
import AppSettingsReducer from './reducers/settings/appSettings';
// import AsyncStorage from '@react-native-community/async-storage';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Persist config
// const persistConfig = {
//   key: 'root',
//   storage
// };

export const store = configureStore({
  reducer: {
    chat: ChatInputViewReducer,
    userinfo: UserinfoStatusReducer,
    userEnter: UserinfoEnterReducer,
    noteHeads: NotesHeadsReducer,
    noteEditor: NoteEditorReducer,
    appSettings: AppSettingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
