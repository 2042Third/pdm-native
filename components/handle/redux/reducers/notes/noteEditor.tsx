
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
import { GetNoteArg, UpdateNoteArg } from "../../../models";
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
/**
 * 
 * THUNKS
 * 
*/
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
  if (load.content === null || load.content === '') {
    load.content = "";
  } else {
    load.content = await PdmNativeCryptModule.dec(user.upw, load.content);
  }
  if (load.head === null || load.head === '') {
    // load.head = "Unnamed Note " + load.note_id;
  } else {
    load.head = await PdmNativeCryptModule.dec(user.upw, load.head);
  }
  console.log(`Note decrypted ${JSON.stringify(load)}`);

  return load;
});

export const updateNote = createAsyncThunk('noteHead/updateNote', async (argu: UpdateNoteArg) => {
  const { PdmNativeCryptModule } = NativeModules;
  const user = argu.user;
  let noteMsg = argu.noteMsg;

  // Encrypt
  console.log(`Update Note before encrypt ${JSON.stringify(noteMsg)}`);
  console.log(`Update Note before encrypt\n`
    + `args upw: ${user.upw}\n`
    + `args head: ${noteMsg.head}\n`
    + `args content: ${noteMsg.content}`
    );
  const out = await PdmNativeCryptModule.enc(user.upw, noteMsg.content);
  console.log(`Update Note after out ${out}`);
  const outhead = await PdmNativeCryptModule.enc(user.upw, noteMsg.head);
  console.log(`Update Note after outhead ${outhead}`);
  const newNote = {
    ...noteMsg,
    head: outhead,
    content: out,
  };
  console.log(`Update Note  after ${JSON.stringify(newNote)}`);

  // Get note from server
  const netReturn = await NetCalls.notesUpdateNote(user.sess, user.umail, newNote);
  const note = await netReturn?.json();
  console.log(`Update Note received ${JSON.stringify(note)}`);
  // const note = newNote; // FAKE

  // Decrypt
  // Make new object to store decrypted
  let load = new NotesMsg;
  load = JSON.parse(JSON.stringify(note));
  if (load.content === null || load.content === '') {
    load.content = "";
  } else {
    load.content = await PdmNativeCryptModule.dec(user.upw, load.content);
  }
  if (load.head === null || load.head === '') {
    // load.head = "Unnamed Note " + load.note_id;
  } else {
    load.head = await PdmNativeCryptModule.dec(user.upw, load.head);
  }
  console.log(`Note decrypted ${JSON.stringify(load)}`);

  return load;
});

export const updateEditsContent = createAsyncThunk('noteHead/updateEditsContent', async (content: string) => {
  console.log(`Note contant request: ${content}`);
  return content;
});

export const updateEditsHead = createAsyncThunk('noteHead/updateEditsHead', async (head: string) => {
  console.log(`Note head request: ${head}`); 
  return head;
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
  extraReducers(builder) { // pending/fulfilled/rejected
    builder
      .addCase(getNote.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateEditsContent.fulfilled, (state, action) => {
        let load = state;
        load.content = action.payload;
        return load;
      })
      .addCase(updateEditsHead.fulfilled, (state, action) => {
        let load = state;
        load.head = action.payload;
        return load;
      })
  },
});

// actions
export const {
  openNote,
} = NoteEditorSlice.actions;

export default NoteEditorSlice.reducer;
