
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
    sortingBy: NoteSortingTypes.SORT_BY_ID,
    sortingOrder: "asc",
    currentNotePage: 1,
  } as NotesMenu,
  reducers: {
    updateNotesSorting: (state, action) => {
      return {...state, sortingBy: action.payload };
    },
    updateSortingOrder: (state, action) => {
      return {...state, sortingOrder: action.payload };
    },
    currentNotePage: (state, action) => {
      return {...state, currentNotePage: action.payload };
    },
  },
});

// actions
export const {
  updateNotesSorting,
  updateSortingOrder,
  currentNotePage,
} = NotesMenuSlice.actions;

export default NotesMenuSlice.reducer;

