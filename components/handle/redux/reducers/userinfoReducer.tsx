import { UserInfoGeneral } from "../../types";

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
    case 'user/overrideStatus':
      return action.payLoad;
    default:
      return state;
  }
}
