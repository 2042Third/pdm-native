import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
import { useDispatch } from "react-redux";
import { dec } from "../../../handlers/user";
import PdmNativeCryptModule from "../../../native/NativeModule";
import NetCalls from "../../../network/netCalls";
import { UserEnter, UserInfoGeneral } from "../../../types";
import { useAppDispatch } from "../../hooks";
import { PdmActions } from "../actionType";
import { setUserSess } from "./userinfoEnter";



const netCallBack = async (user:UserEnter) => {
  return NetCalls.signin(user.umail, user.upwServer);
}

export const signinUser = createAsyncThunk('userStatus/signinUser', async (user:UserEnter) => {
  const dispatch = useAppDispatch();
  let netReturn: UserInfoGeneral = await netCallBack(user);
  const userName = await dec(user.upw, netReturn.receiver);
  if (userName!= null){
    netReturn.username = userName;
  } else {
    netReturn.status = "fail";
    netReturn.statusInfo = "Cannot decrypt the incoming user info.";
  }
  dispatch(setUserSess(netReturn.sess)); // set sess

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
