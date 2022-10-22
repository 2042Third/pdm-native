import { createSelector } from "reselect";
import React, { useCallback, useEffect } from "react";
import { NoteHead, NotesMenu } from "../../types";
import { NoteSortingTypes } from "../reducers/notes/notesMenuReducer";
import { RootState } from "../store";

export const selectNoteId = ( state:RootState)  => state.noteHeads;
export const noteMenuOptions =( state:RootState) => state.notesMenu.sortingBy;
export const getSortedNotes = createSelector(
  [selectNoteId, noteMenuOptions],
  (noteIDs, sort) =>(
    [...noteIDs.heads]
      .sort((a,b)=> (orderByType(a,sort)>orderByType(b,sort)))
      .map((head) => head.key ))
);

function orderByType(data:NoteHead, type) {
  switch (type) {
    case NoteSortingTypes.SORT_BY_ID:
      return data.key;
    case NoteSortingTypes.SORT_BY_NAME:
      return data.head;
    case NoteSortingTypes.SORT_BY_CREATE_TIME:
      return data.time;
    case NoteSortingTypes.SORT_BY_UPDATE_TIME:
      return data.update_time;
    default:
      return data;
  }
}

