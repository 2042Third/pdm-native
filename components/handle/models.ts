import { NoteHeadList, UserEnter, UserInfoGeneral } from "./types";

export class HeadsArg {
  heads: NoteHeadList = new NoteHeadList;
  user: UserEnter = new UserEnter;
};
export class HeadsUpdateArg {
  userinfo: UserInfoGeneral = new UserInfoGeneral;
  user: UserEnter = new UserEnter;
};