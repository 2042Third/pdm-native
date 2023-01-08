import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dec } from "../../../handlers/user";
import NetCalls from "../../../network/netCalls";
import { UserEnter, UserEnterExt, UserInfoGeneral } from "../../../types";
import { parseTimeShort } from "../helpers";



const netCallBackSignIn = async (user:UserEnter) => {
  return NetCalls.signin(user.umail, user.upwServer);
}
const netCallBackSignUp = async (user:UserEnterExt) => {
  return NetCalls.signup(user.umail, user.upwServer, user.uName);
}

export const userClearData = {
  msg: "",
  username: "",
  msgh: "",
  email: "",
  val: "",
  type: "",
  h: "",
  sender: "",
  sess: '',
  status: "fail",
  receiver: "",
  authdata: "",
  time: -1,
  update_time: -1,
  utime: '',
  pdmSecurityVersion: '',
  checker: "",
  ctime: '',
  netStatus: 'none',
  statusInfo: "None"
} as UserInfoGeneral;

export const signinUser = createAsyncThunk('userStatus/signinUser'
  , async (user:UserEnter) => {
    let netReturn: UserInfoGeneral = await netCallBackSignIn(user);
    if (netReturn.status === "fail"){
      netReturn.status = "fail";
      console.log("UserInfo update failure: " + JSON.stringify(netReturn));
      return netReturn;
    }
    const userName =  user.upw === undefined ?
      null:
      await dec(user.upw, netReturn.receiver);
    if (userName!= null){
      netReturn.username = userName;
    } else {
      netReturn.status = "fail";
      return netReturn;
    }

    if (netReturn.time !== null) {
      netReturn.ctime = parseTimeShort(parseFloat(netReturn.time));
    }
    return netReturn;
  });

export const signupUser = createAsyncThunk('userStatus/signupUser'
  , async (user:UserEnterExt) => {
    let netReturn: UserInfoGeneral = await netCallBackSignUp(user);
    if (netReturn.status === "fail"){
      netReturn.status = "fail";
      console.log("UserInfo update failure: " + JSON.stringify(netReturn));
      return netReturn;
    }
    console.log("UserSign up return => "+ JSON.stringify(netReturn));
    return netReturn;
  });

export const UserinfoStatusSlice = createSlice({
  name:'userStatus',
  initialState: {
    msg: "",
    username: "",
    msgh: "",
    email: "",
    val: "",
    type: "",
    h: "",
    sender: "",
    sess: '',
    status: "fail",
    receiver: "",
    authdata: "",
    time: -1,
    update_time: -1,
    utime: '',
    pdmSecurityVersion: '',
    checker: "",
    ctime: '',
    netStatus: 'none',
    statusInfo: "None"
  } as UserInfoGeneral,
  reducers: {
    updateUserStatus: (state, action) => {
      return action.payload;
    },
    updateUsername: (state, action) => {
      let load: UserInfoGeneral = state;
      load.username = action.payload;
      return load;
    },
  },
  extraReducers(builder ){
    builder
    .addCase(signinUser.fulfilled, (state, action) => {
      let load:UserInfoGeneral=action.payload;
      load.netStatus = 'success';
      return load;
    })
  },
});

export const {
  updateUserStatus,
  updateUsername,
 } = UserinfoStatusSlice.actions;

export default UserinfoStatusSlice.reducer;
