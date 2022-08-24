import { NoteHead, NoteHeadList, NotesMsg, UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetCalls from "../../../network/netCalls";

const initialState = {
  heads: [],
  netHash: "",
} as NoteHeadList;

export const getHeads = createAsyncThunk('notesHead/getHeads', async(userinfo:UserInfoGeneral)=>{
  const headsP = await NetCalls.notesGetHeads(userinfo.sess, userinfo.email);
  const heads = await headsP?.json();
  console.log(`noteHeads net return: ${JSON.stringify(heads.content[0])}`);
  return heads;
});

export const NotesHeadsSlice = createSlice({
  name: 'notesHead',
  initialState,
  reducers: {
    newHeads: (state, action) => {
      return action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getHeads.fulfilled, (state, action) => {
        let load = state;
        load.heads = action.payload.content;
        load.netHash = action.payload.hash;
        return load;
      })
  },
});

// actions
export const {
  newHeads,
} = NotesHeadsSlice.actions;

export default NotesHeadsSlice.reducer;

