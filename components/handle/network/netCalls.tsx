import Net from "./net";
import { useSelector, shallowEqual, Provider, useDispatch } from "react-redux";
import { UserInfoGeneral } from "../types";

export default class NetCalls {
  private static signinURL: string='https://pdm.pw/auth/signin';
  static async signin(umail:any, upw:any){
    // const dispatch = useDispatch();
    return Net.post(this.signinURL, JSON.stringify({ "umail": umail, "upw": upw }))
      .then(function(res){
        return res.json();
      });

  }
}
