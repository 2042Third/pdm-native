import { createSelector } from "reselect";
import React, { useCallback, useEffect } from "react";
import { NoteHead, NotesMenu } from "../../types";
import { createStoreHook, shallowEqual, useSelector } from "react-redux";
import { useAppSelector } from "../hooks";
// @ts-ignore
import get from "lodash/get";
// @ts-ignore
import orderBy from "lodash/orderBy";
import { NoteSortingTypes } from "../reducers/notes/notesMenuReducer";
import { selectNoteByKey } from "../reducers/notes/notesHeadsReducer";
import { RootState } from "../store";
import notesMenu from "../../../views/Notes/NotesMenu";
// const noteSorts = useAppSelector(state => state.notesMenu);
//
// const noteHead = useAppSelector(state => state.noteHeads);
// const selectNoteHead = state => state.noteHeads;
//
// const selectNoteId = (state: RootState) => state.noteHeads.heads.map((head) => head.key);
//
//  export const useSelectNoteIds = ()=>{
//   const noteIDs = useAppSelector(selectNoteId, shallowEqual);
//   return noteIDs;
//  }


// export const selectNoteId = (state: RootState) => state.noteHeads;
// export const noteMenuOptions =( state:RootState) => state.notesMenu.sortingBy;
// // export const selectNoteIds = getSortedNotes.map((head) => head.key);
// export const getSortedNotes = createSelector(
//   [selectNoteId, noteMenuOptions],
//   (noteIDs, sort) =>
//     noteIDs.heads
//       .sort((a,b)=> (orderByType(a,sort)>orderByType(b,sort)))
//       .map((head) => head.key )
// );
// function orderByType(data:NoteHead, type) {
//   switch (type) {
//     case NoteSortingTypes.SORT_BY_ID:
//       return data.key;
//     case NoteSortingTypes.SORT_BY_NAME:
//       return data.head;
//     case NoteSortingTypes.SORT_BY_CREATE_TIME:
//       return data.time;
//     case NoteSortingTypes.SORT_BY_UPDATE_TIME:
//       return data.update_time;
//     default:
//       return data;
//   }
// }


