
import ChatInputViewReducer from './reducers/chat/chatViewReducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import UserinfoStatusReducer from "./reducers/user/userinfoReducer";
import NotesHeadsReducer from "./reducers/notes/notesHeadsReducer";
import NoteEditorReducer from "./reducers/notes/noteEditor";
import UserinfoEnterReducer from './reducers/user/userinfoEnter';
import AppSettingsReducer from './reducers/settings/appSettings';
import storage from 'redux-persist/lib/storage'
// import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import EncryptedUserinfoEnterReducer from './reducers/user/encryptedUserEnter';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['userinfo', 'userEnter', "noteHeads", 'noteEditor'],
  whitelist: ['encryptedUserEnter', "chat", 'appSettings'],
};

export const rootReducer = combineReducers({
  chat: ChatInputViewReducer,
  userinfo: UserinfoStatusReducer,
  userEnter: UserinfoEnterReducer,
  noteHeads: NotesHeadsReducer,
  noteEditor: NoteEditorReducer,
  appSettings: AppSettingsReducer,
  encryptedUserEnter: EncryptedUserinfoEnterReducer,
});

// Persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
