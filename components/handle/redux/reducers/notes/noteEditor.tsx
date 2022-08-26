
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
import { GetNoteArg } from "../../../models";
import NetCalls from "../../../network/netCalls";
import { NoteHead, NotesMsg, UserEnter } from "../../../types";
import { useAppDispatch } from "../../hooks";
const userNoteEditorClearData = {
  head:  '',
  note_id:  '',
  id:  -1,
  time:  -1,
  update_time:  -1,
  utime:  '',
  ctime:  '',
  key:  '',
  content:  '',
  email:  '',
  session:  '',
  ntype: "", 
  sess:  '',
  h:  '',
  username:  '',
  status:  '',
  encry: "",
  hash:  '',
} as NotesMsg;

export const getNote = createAsyncThunk('noteHead/getNote', async (argu: GetNoteArg) => {
  const { PdmNativeCryptModule } = NativeModules;
  const user = argu.user;
  const note_id = argu.note_id;

  // Get note from server
  const netReturn = await NetCalls.notesGetNote(user.sess, user.umail, note_id);
  const note = await netReturn?.json();
  console.log(`Note received ${JSON.stringify(note)}`);

  // Decrypt
  // Make new object to store decrypted
  let load = new NotesMsg;
  load = JSON.parse(JSON.stringify(note));
  load.content = await PdmNativeCryptModule.dec(user.upw, load.content);
  load.head = await PdmNativeCryptModule.dec(user.upw, load.head);
  console.log(`Note decrypted ${JSON.stringify(load)}`);

  return load;
});
export const NoteEditorSlice = createSlice({
  name: 'userinfoEnter',
  initialState: {
    head: '',
    note_id: '',
    id: -1,
    time: -1,
    update_time: -1,
    utime: '',
    ctime: '',
    key: '',
    content: '',
    email: '',
    session: '',
    ntype: "",
    sess: '',
    h: '',
    username: '',
    status: '',
    encry: "",
    hash: '',
  } as NotesMsg,
  reducers: {
    openNote: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNote.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

// actions
export const {
  openNote,
} = NoteEditorSlice.actions;

export default NoteEditorSlice.reducer;
