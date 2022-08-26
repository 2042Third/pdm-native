
import { createSlice } from "@reduxjs/toolkit";
import { UserEnter } from "../../../types";
const initialState = {
  umail: '',
  upw:'',
  upwServer:'',
  sess: '',
} as UserEnter;

export const UserinfoEnterSlice = createSlice({
  name: 'userinfoEnter',
  initialState: {
    umail: '',
    upw: '',
    upwServer: '',
    sess: '',
  } as UserEnter,
  reducers: {
    newUserinfoEnter: (state, action) =>{
      return action.payload;
    },
    setUserSess: (state, action)=>{
      return {
        ...state,
        sess: action.payload
      };
    }
  }
});

// actions
export const {
  newUserinfoEnter,
  setUserSess,
} = UserinfoEnterSlice.actions;

export default UserinfoEnterSlice.reducer;