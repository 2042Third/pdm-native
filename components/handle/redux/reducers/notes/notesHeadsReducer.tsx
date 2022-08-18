import { NoteHead, NoteHeadList, UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";

const initialState = {
  heads: [],
} as NoteHeadList;

export default function NotesHeadsReducer (state:NoteHeadList = initialState, action:any) {
  switch (action.type){
    case PdmActions.note.edit.addNew:
      return action.payLoad;
    default:
      return state;
  }
}
