
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  umail: '',
  upw:'',
  upwServer:''
} ;

export const UserinfoEnterSlice = createSlice({
  name: 'userinfoEnter',
  initialState: {
    umail: '',
    upw: '',
    upwServer: ''
  },
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