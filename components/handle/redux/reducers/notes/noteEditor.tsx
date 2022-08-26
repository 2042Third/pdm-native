
import { createSlice } from "@reduxjs/toolkit";
import { NoteHead, NotesMsg, UserEnter } from "../../../types";
const initialState = {
  head: "",
  note_id: -1,
  id: -1,
  time: -1,
  update_time: -1,
  utime: '',
  ctime: '',
  key: '',
  constent: '',
  ntype: '',
  sess: '',
  
};

export const NoteEditorSlice = createSlice({
  name: 'userinfoEnter',
  initialState,
  reducers: {
    openNote: (state, action) => {
      return action.payload;
    },
  }
});

// actions
export const {
  openNote,
} = NoteEditorSlice.actions;

export default NoteEditorSlice.reducer;
