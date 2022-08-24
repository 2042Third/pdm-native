import Net from "./net";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import { UserInfoGeneral } from "../types";
import { Platform } from "react-native";

export default class NetCalls {
  private static pdmRootURL: string = 'https://pdm.pw';
  private static signinURL: string = this.pdmRootURL + '/auth/signin';
  private static signupURL: string = this.pdmRootURL + '/auth/signin';

  static async signin(umail: any, upw: any) {
    return Net.post(this.signinURL, JSON.stringify({ "umail": umail, "upw": upw }))
      .then(function (res:any) {
        return res.json();
      });
  }

  static async signup(umail: any, upw: any, uname:string) {
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
   * Finish this implementation!
   * 
  */
  static async notesGetHeads(sessKey:string, ) {

  }
}
