import { NoteHead, NoteHeadList, UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heads: [],
} as NoteHeadList;

export const NotesHeadsSlice = createSlice({
  name: 'notesHead',
  initialState: initialState,
  reducers: {
    newHeads: (state, action) => {
      return action.payload;
    }
  }
});

// actions
export const {
  newHeads,
} = NotesHeadsSlice.actions;

export default NotesHeadsSlice.reducer;

