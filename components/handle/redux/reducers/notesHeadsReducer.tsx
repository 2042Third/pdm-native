import { NoteHead, NoteHeadList, UserInfoGeneral } from "../../types";

const initialState = {
  heads: [],
} as NoteHeadList;

export default function NotesHeadsReducer (state:NoteHeadList = initialState, action:any) {
  switch (action.type){
    case 'note/heads/update':
      return action.payLoad;
    default:
      return state;
  }
}
