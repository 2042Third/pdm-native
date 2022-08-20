import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
import PdmNativeCryptModule from "../../../native/NativeModule";
import NetCalls from "../../../network/netCalls";
import { UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";

const netCallBack = async (user) => {
  return NetCalls.signin(user.umail, user.upw);
}

export const signinUser = createAsyncThunk('userStatus/signinUser',
  async (user) => {
    console.log("Making in progress")
    const netReturn = await netCallBack(user);
    return netReturn;
})

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
    netStatus: 'none'
  } as UserInfoGeneral,
  reducers: {
    updateUserStatus: (state, action) => {
      return action.payload;
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
 } = UserinfoStatusSlice.actions;

export default UserinfoStatusSlice.reducer;
