
import {  createSlice } from "@reduxjs/toolkit";
import { NotesMenu } from "../../../types";

export enum NoteSortingTypes {
  SORT_BY_ID="id",
  SORT_BY_NAME='name',
  SORT_BY_CREATE_TIME='ctime',
  SORT_BY_UPDATE_TIME='time',
}

export const NotesMenuSlice= createSlice({
  name: 'notesHeaderInfo',
  initialState: {
    sortingBy: NoteSortingTypes.SORT_BY_ID
  } as NotesMenu,
  reducers: {
    updateNotesSorting: (state, action) => {
      return {...state, sortingBy: action.payload };
    },
  },
});

// actions
export const {
  updateNotesSorting,
} = NotesMenuSlice.actions;

export default NotesMenuSlice.reducer;

