import { NoteHead, NoteHeadList, NotesMsg, UserEnter, UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetCalls from "../../../network/netCalls";
import PdmNativeCryptModule, { dec, makeHash } from "../../../handlers/user";
import NotesHead from "../../../../views/Notes/NotesHead";
import { HeadsArg, HeadsUpdateArg } from "../../../models";
import { NativeModules } from "react-native";

const initialState = {
  heads: [],
  netHash: "",
} as NoteHeadList;

export const getHeads = createAsyncThunk('notesHead/getHeads', async (hua:HeadsUpdateArg)=>{
  const userinfo = hua.userinfo;
  const user = hua.user;
  // const { PdmNativeCryptModule } = NativeModules;

  
  // Get heads from server
  const headsP = await NetCalls.notesGetHeads(userinfo.sess, userinfo.email);
  const heads = await headsP?.json();
  
  // Check package integrity 
  // const integ = await makeHash(JSON.stringify(heads.heads));
  // console.log("integ", integ);
  // console.log("heads.hash", heads.hash);

  // Make new object to store decrypted
  let load = new NoteHeadList;
  load.heads = heads.content;
  load.netHash = heads.hash;
  
  // decrypt 
  const a = load.heads;
  let b = [];
  console.log(`decryptAllHeads ${JSON.stringify(load)}`);
  for (let i = 0; i < a.length; i++) {
    let h: NoteHead = JSON.parse(JSON.stringify(a[i]));
    let tmpH: NoteHead = new NoteHead;
    tmpH = h;
    tmpH.time = parseFloat(h.time);
    tmpH.id = parseInt(h.note_id);
    tmpH.update_time = parseFloat(h.update_time);
    let decO='';
    if (h.head != null && h.head != undefined){
      try {
        decO = await PdmNativeCryptModule.dec(user.upw, h.head);
      } catch (e) { console.log(e) }
    }
    tmpH.head = decO;
    console.log(`tmpH ${JSON.stringify(tmpH)}`);
    console.log(typeof tmpH.time);
    console.log(tmpH.time);
    b.push(tmpH);
  }

  load.heads = b;

  return JSON.parse(JSON.stringify(load));
});

// export const decHeads = createAsyncThunk('notesHead/decHeads', async(ha:HeadsArg)=>{

//   const a = ha.heads.heads;
//   let b = [];
//   console.log(`decryptAllHeads ${JSON.stringify(ha)}`);
//   for (let i = 0; i < a.length; i++) {
//     const h: NoteHead = a[i];
//     let tmpH: NoteHead = new NoteHead;
//     tmpH = h;
//     // tmpH.time = parseFloat(h.time.toString);
//     const decO = await dec(ha.user.upw, h.head);
//     if (decO != null)
//       tmpH.head = decO;
//     console.log(`tmpH ${JSON.stringify(tmpH)}`);
//     console.log(typeof tmpH.time);
//     console.log(tmpH.time);
//     b.push(tmpH);
//   }
//   return b;
// });

export const NotesHeadsSlice = createSlice({
  name: 'notesHead',
  initialState,
  reducers: {
    newHeads: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHeads.fulfilled, (state, action) => {
        state = {
          heads: action.payload.heads,
          netHash: action.payload.netHash
        };
        return state;
      })
  },
});

// actions
export const {
  newHeads,
} = NotesHeadsSlice.actions;

export default NotesHeadsSlice.reducer;

