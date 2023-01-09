import Net from "./net";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import { NotesMsg, UserInfoGeneral } from "../types";
import { Platform } from "react-native";

export default class NetCalls {
  private static pdmRootURL: string = 'https://pdm.pw';
  private static signinURL: string = this.pdmRootURL + '/auth/signin';
  private static signupURL: string = this.pdmRootURL + '/auth/signup';
  private static notesGetHeadsURL: string = this.pdmRootURL + '/auth/note';

  private static notesGetHeadsType: string = 'heads';
  private static notesGetNoteType: string = 'retrieve';
  private static notesGetNewNoteType: string = 'new';
  private static notesUpdateNoteType: string = 'update';
  private static notesDeleteNoteType: string = 'delete';


  static async signin(umail: string, upw: string) {
    return Net.post(this.signinURL, JSON.stringify({
      "umail": umail,
      "upw": upw.toString() }))
      .then(function (res:any) {
        return res.json();
      });
  }

  static async signup(umail: string, upw: string, uname:string) {
    return Net.post(this.signupURL
      , JSON.stringify({
        "umail": umail,
        "upw": upw ,
        'uname':uname,
        'type': 'pdm mobile '+Platform.OS
      }))
      .then(function (res:any) {
        return res.json();
      });
  }

  /**
   * Gets the heads of notes for a user
   *
  */
  static async notesGetHeads(sessKey: string, email: string) {
    return Net.post(this.notesGetHeadsURL,
      JSON.stringify({
        "username": "", // should not send unencrypted username
        "content": "",
        "sess": sessKey,
        "ntype": this.notesGetHeadsType,
        "email": email,
      }));
  }

  /**
   * Gets a note for a user
   *
  */
  static async notesGetNote(sessKey: string, email: string, note_id: string) {
    return Net.post(this.notesGetHeadsURL,
      JSON.stringify({
        "username": "",
        "content": "",
        "sess": sessKey,
        "ntype": this.notesGetNoteType,
        "email": email,
        "note_id": note_id,
      }));
  }

  /**
   * Updates a Note
   *
   */
  static async notesUpdateNote(sessKey: string, email: string, noteMsg: NotesMsg) {
    return Net.post(this.notesGetHeadsURL,
      JSON.stringify({
        "username": "",
        "head": noteMsg.head,
        "content": noteMsg.content,
        "sess": sessKey,
        "ntype": this.notesUpdateNoteType,
        "email": email,
        "note_id": noteMsg.note_id,
      }));
  }

  /**
   * delete a Note
   *
   */
  static async notesDeleteNote(sessKey: string, email: string, noteMsg: NotesMsg) {
    return Net.post(this.notesGetHeadsURL,
      JSON.stringify({
        "sess": sessKey,
        "ntype": this.notesDeleteNoteType,
        "note_id": noteMsg.note_id,
      }));
  }

  /**
   * Updates a Note
   *
  */
  static async notesGetNewNote(sessKey: string, email: string, noteMsg: NotesMsg) {
    return Net.post(this.notesGetHeadsURL,
      JSON.stringify({
        "username": "",
        "head": "",
        "content": "",
        "sess": sessKey,
        "ntype": this.notesGetNewNoteType,
        "email": email,
        "note_id": noteMsg.note_id,
      }));
  }
}
