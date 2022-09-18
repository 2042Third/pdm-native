
import {  createSlice } from "@reduxjs/toolkit";
import { NotesHeaderInfo } from "../../../types";


export const NotesHeaderInfoSlice = createSlice({
  name: 'notesHeaderInfo',
  initialState: {
    updateInfo: "Up to date",
    updateTimeDistance: ""
  } as NotesHeaderInfo,
  reducers: {
    updateNotesHeaderInfo: (state, action) => {
      return {...state, updateInfo: action.payload };
    },
    updateNotesTimeDistance: (state, action) => {
      return {...state, updateTimeDistance: action.payload };
    },
  },
  // extraReducers(builder) {
  //   builder
  // },
});

// actions
export const {
  updateNotesHeaderInfo,
  updateNotesTimeDistance
} = NotesHeaderInfoSlice.actions;

export default NotesHeaderInfoSlice.reducer;

