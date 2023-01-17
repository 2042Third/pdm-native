import { createSelector } from "reselect";
import React, { useCallback, useEffect } from "react";
import { NoteHead, NotesMenu } from "../../types";
import { NoteSortingTypes } from "../reducers/notes/notesMenuReducer";
import { RootState } from "../store";

export const selectNoteId = ( state:RootState)  => state.noteHeads;
export const noteMenuOptions =( state:RootState) => state.notesMenu.sortingBy;
export const userInfoStatus = (state:RootState) => state.userinfo.status;


// Sorting
export const getSortedNotes = createSelector(
  [selectNoteId, noteMenuOptions],
  (noteIDs, sort) => {
    return [...noteIDs.heads]
      .sort((a, b) => {
        if(orderByType(a, sort) > orderByType(b, sort))
          return 1;
        else if(orderByType(a, sort) < orderByType(b, sort))
          return -1;
        else
          return 0;
      })
      .map((head) => head.key)
  }
);

// Sorting helper
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

