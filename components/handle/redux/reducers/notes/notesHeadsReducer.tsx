import { NoteHead, NoteHeadList, NotesMsg, UserEnter, UserInfoGeneral } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetCalls from "../../../network/netCalls";
import { GetNoteArg, HeadsArg, HeadsUpdateArg, UpdateNoteArg } from "../../../models";
import { NativeModules } from "react-native";
import { parseTime } from "../helpers";

const initialState = {
  heads: [],
  netHash: "",
  netStatus: "pending",
} as NoteHeadList;

 /**
  * HELPERS
  *
 */
export const selectNoteByKey = (noteHeads: { heads: any[]; } , key: string) => {
  return noteHeads.heads.find((head: { key: any; }) => head.key === key);
};

function nextNoteHeadId(heads: NoteHead[]) {
  const maxIds = heads.reduce(
    (maxId: number, head: NoteHead) => Math.max(head.key, maxId),
    -1,
  );
  return maxIds + 1;
}



/**
 * THUNKS
 *
*/


export const getHeads = createAsyncThunk('notesHead/getHeads', async (hua:HeadsUpdateArg)=>{
  const userinfo = hua.userinfo;
  const user = hua.user;
  const { PdmNativeCryptModule } = NativeModules;


  // Get heads from server
  const headsP = await NetCalls.notesGetHeads(user.sess, user.umail);
  const heads = await headsP?.json();
  console.log(`Note received ${JSON.stringify(heads.content.length)}`);

  // Check package integrity
  // Note: the incoming noteheads package lists the heads under "content" not "heads"
  const integ = await PdmNativeCryptModule.getHash(JSON.stringify(heads.content).toString());
  console.log(`Note head integrety check passed.`);
  if (integ !== heads.hash) {
    throw new Error("Package integrety compromised, location: Note head \"getHeads\" thunk.");
    return;
  }

  // Make new object to store decrypted
  let load = new NoteHeadList;
  load.heads = heads.content;
  load.netHash = heads.hash;

  // decrypt
  const a = load.heads;
  let b = [];
  for (let i = 0; i < a.length; i++) {
    let h: NoteHead = JSON.parse(JSON.stringify(a[i]));
    let tmpH: NoteHead = new NoteHead;
    tmpH = h;
    tmpH.time = parseFloat(h.time);
    tmpH.id = parseInt(h.note_id);
    tmpH.update_time = parseFloat(h.update_time);
    tmpH.key = nextNoteHeadId(b);
    let decO='';

    if (h.head != null){
      try {
        decO = await PdmNativeCryptModule.dec(user.upw, h.head);
      } catch (e) { console.log(e) ; return;}
    }
    tmpH.head = decO;
    // console.log(`tmpH ${JSON.stringify(tmpH)}`);

    // Get the time stamps
    tmpH.ctime = parseTime(tmpH.time);
    tmpH.utime = parseTime(tmpH.update_time);
    // console.log(`Created at ${tmpH.ctime}`);
    // console.log(`Updated at ${tmpH.utime}`);

    b.push(tmpH);
  }

  load.heads = b;

  return JSON.parse(JSON.stringify(load));
});

export const newNote = createAsyncThunk('noteHead/newNote', async (argu: UpdateNoteArg) => {
  const { PdmNativeCryptModule } = NativeModules;
  const user = argu.user;
  let noteMsg = argu.noteMsg;

  // Get note from server
  const netReturn = await NetCalls.notesGetNewNote(user.sess, user.umail, noteMsg);
  const note: NotesMsg = await netReturn?.json();
  console.log(`New Note received ${JSON.stringify(note)}`);
  // const note = newNote; // FAKE

  return JSON.parse(JSON.stringify(note));
});

export const deleteNote = createAsyncThunk('noteHead/deleteNote', async (argu: UpdateNoteArg)=>{

  const user = argu.user;
  let noteMsg = argu.noteMsg;
  // Get note from server
  const netReturn = await NetCalls.notesDeleteNote(user.sess, user.umail, noteMsg);
  const note: NotesMsg = await netReturn?.json();
  console.log(`Delete Note received ${JSON.stringify(note)}`);
  // const note = newNote; // FAKE

  return JSON.parse(JSON.stringify(note));
  });

/**
 * STORE
 *
*/
export const NotesHeadsSlice = createSlice({
  name: 'notesHead',
  initialState:{
    heads: [],
    netHash: "",
    netStatus: "pending",
  } as NoteHeadList,
  reducers: {
    newHeads: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {// pending/fulfilled/rejected
    builder
      .addCase(getHeads.fulfilled, (state, action) => {
        state = {
          heads: action.payload.heads,
          netHash: action.payload.netHash
        };
        return state;
      })
      .addCase(getHeads.pending, (state, action) => {
        state = {
          ...state,
          netStatus: "pending"
        };
        return state;
      })
      .addCase(newNote.fulfilled, (state, action) => {
        return {
          ...state,
          netStatus: "fulfilled",
          heads: [
            ...state.heads,
            action.payload,
          ]
        };
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        return {
          ...state,
          netStatus: 'fulfilled',
        };
      })
  },
});

// actions
export const {
  newHeads,
} = NotesHeadsSlice.actions;

export default NotesHeadsSlice.reducer;

