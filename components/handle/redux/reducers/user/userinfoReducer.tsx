import { createSlice } from "@reduxjs/toolkit";
import { UserInfoGeneral } from "../../../types";
import { PdmActions } from "../actionType";

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
    ctime: ''
  } as UserInfoGeneral,
  reducers: {
    updateUserStatus: (state, action) => {
      return action.payload;
    },
  }
});

export const { 
  updateUserStatus,
 } = UserinfoStatusSlice.actions;

export default UserinfoStatusSlice.reducer;
