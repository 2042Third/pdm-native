import { UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";
const initialState = {
  msg: "",
  username:"",
  msgh:"",
  email:"",
  val: "",
  type:  "",
  h: "",
  sender:  "",
  sess:  '',
  status:  "fail",
  receiver:  "",
  authdata: "",
  time: -1,
  update_time: -1,
  utime: '',
  pdmSecurityVersion: '',
  checker:  "",
  ctime: ''
} as UserInfoGeneral;

export default function UserinfoReducer (state:UserInfoGeneral = initialState, action:any) {
  switch (action.type){
    case PdmActions.user.status.update:
      return action.payLoad;
    default:
      return state;
  }
}
