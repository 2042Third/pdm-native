import { NoteHeadList, NotesMsg, UserEnter, UserInfoGeneral } from "./types";

export class HeadsArg {
  heads: NoteHeadList = new NoteHeadList;
  user: UserEnter = new UserEnter;
}
export class HeadsUpdateArg {
  userinfo: UserInfoGeneral = new UserInfoGeneral;
  user: UserEnter = new UserEnter;
}
export class GetNoteArg {
  user: UserEnter = new UserEnter;
  note_id: string = '';
}
export class UpdateNoteArg {
  user: UserEnter = new UserEnter;
  noteMsg: NotesMsg = new NotesMsg;
}
export class UpdareNoteWithString {
  str: string = '';
  noteMsg: NotesMsg = new NotesMsg;
}
export class EncryptedUserEnterArg {
  user: UserEnter = new UserEnter();
  epw: string = '';
}
export class UserEnterLocalDec {
  encUserEnter: string = '';
  epw: string = '';

}
