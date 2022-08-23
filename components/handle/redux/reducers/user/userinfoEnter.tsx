
import { createSlice } from "@reduxjs/toolkit";
import { UserEnter } from "../../../types";
const initialState = {
  umail: '',
  upw:'',
  upwServer:''
} as UserEnter;

export const UserinfoEnterSlice = createSlice({
  name: 'userinfoEnter',
  initialState: {
    umail: '',
    upw: '',
    upwServer: ''
  } as UserEnter,
  reducers: {
    newUserinfoEnter: (state, action) =>{
      return action.payload;
    }
  }
});

// actions
export const {
  newUserinfoEnter,
} = UserinfoEnterSlice.actions;

export default UserinfoEnterSlice.reducer;