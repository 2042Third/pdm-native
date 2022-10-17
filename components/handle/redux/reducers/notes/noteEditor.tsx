
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
import { GetNoteArg, UpdareNoteWithString, UpdateNoteArg } from "../../../models";
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
  key:  -1,
  content:  '',
  email:  '',
  session:  '',
  ntype: "",
  sess:  '',
  statusInfo: 'none',
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
    load.head = "";
  } else {
    load.head = await PdmNativeCryptModule.dec(user.upw, load.head);
  }
  console.log(`Note decrypted ${JSON.stringify(load)}`);

  return load;
});
export const updateNote = (noteValue: string, headerValue:string) => async (dispatch: (arg0: { payload: any; type: string; }) => void, getState: () => any) =>{

  const beforeState = getState();
// export const updateNote = createAsyncThunk('noteHead/updateNote', async (argu: UpdateNoteArg) => {
  const { PdmNativeCryptModule } = NativeModules;
  const user = beforeState.userEnter;
  let noteMsg = beforeState.noteEditor;

  // Encrypt
  const out = await PdmNativeCryptModule.enc(user.upw, noteValue);
  const outhead = await PdmNativeCryptModule.enc(user.upw, headerValue);
  const newNote = {
    ...noteMsg,
    head: outhead,
    content: out,
  };

  // Get note from server
  const netReturn = await NetCalls.notesUpdateNote(user.sess, user.umail, newNote);
  const note = await netReturn?.json();
  console.log(`Update Note received ${JSON.stringify(note)}`);
  // const note = newNote; // FAKE

  // Decrypt
  // Make new object to store decrypted
  let load:NotesMsg = new NotesMsg;
  load = JSON.parse(JSON.stringify(note)) as NotesMsg;
  if (!load.content) {
    load.content = "";
  } else {
    load.content = await PdmNativeCryptModule.dec(user.upw, load.content);
  }
  if (!load.head) {
    load.head = "";
  } else {
    load.head = await PdmNativeCryptModule.dec(user.upw, load.head);
  }
  // load.update_time = parseFloat(load.update_time);
  console.log(`Note decrypted ${JSON.stringify(load)}`);
  dispatch(changeNoteAll(load));
}


export const updateEditsContent = (noteValue:string) => async (dispatch: (arg0: { payload: any; type: string; }) => void, getState: () => any) =>{
  const { PdmNativeCryptModule } = NativeModules;
  const beforeState = getState();
  await PdmNativeCryptModule.getHash(noteValue);
  if (noteValue === '' || beforeState.noteEditor.noteValue === null) {
    dispatch(changeNoteHead({
      content: beforeState.noteEditor.content,
      statusInfo: "rejected"
    }));
  }else {
    dispatch(changeNoteHead({
      content: noteValue,
      statusInfo: "fulfilled"
    }));
  }
}

export const updateEditsHead = (header:string) => async (dispatch: (arg0: { payload: any; type: string; }) => void, getState: () => any) =>{
  const { PdmNativeCryptModule } = NativeModules;
  const beforeState = getState();
  await PdmNativeCryptModule.getHash(header);
  if (header === '' || beforeState.noteEditor.head === null) {
    dispatch(changeNoteHead({
      ...beforeState.noteEditor,
      statusInfo: "rejected"
    }));
  }else {
    dispatch(changeNoteHead({
      ...beforeState.noteEditor,
      head: header,
      statusInfo: "fulfilled"
    }));
  }

}

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
    key: -1,
    content: '',
    email: '',
    session: '',
    ntype: "",
    sess: '',
    h: '',
    username: '',
    status: '',
    statusInfo: 'none',
    encry: "",
    hash: '',
  } as NotesMsg,
  reducers: {
    openNote: (state, action) => {
      return action.payload;
    },
    changeNoteHead: (state, action) => {
      return {
        ...state,
        head        : action.payload.head,
        statusInfo  : action.payload.statusInfo
      };
    },
    changeNoteAll: (state, action) => {
      return {
        ...state,
        statusInfo  : "fulfilled", // should change this
        update_time : action.payload.update_time,
        time        : action.payload.time,
        content     : action.payload.content,
        status      : action.payload.status,
        head        : action.payload.head
      };
    },
    changeNoteContent: (state, action) => {
      return {
        ...state,
        content     : action.payload.content,
        statusInfo  : action.payload.statusInfo
      };
    }
  },
  extraReducers(builder) { // pending/fulfilled/rejected
    builder

      // Get Note
      .addCase(getNote.fulfilled, (state, action) => {
        return action.payload;
      })

      // // Update Note
      // .addCase(updateNote.pending, (state, action)=>{
      //   return {...state,
      //     statusInfo: "pending"
      //   };
      // })
      // .addCase(updateNote.fulfilled, (state, action)=>{
      //   return {...state,
      //     statusInfo  : "fulfilled",
      //     update_time : action.payload.update_time,
      //     time        : action.payload.time,
      //     content     : action.payload.content,
      //     status      : action.payload.status,
      //     head        : action.payload.head
      //   };
      // })
  },
});

// actions
export const {
  openNote,
  changeNoteHead,
  changeNoteContent,
  changeNoteAll,
} = NoteEditorSlice.actions;

export default NoteEditorSlice.reducer;
