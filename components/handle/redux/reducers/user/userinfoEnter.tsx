
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dec } from "../../../handlers/user";
import { EncryptedUserEnterArg, UserEnterLocalDec } from "../../../models";
import { UserEnter, UserInfoGeneral } from "../../../types";
export const userEnterClearData = {
  umail: '',
  upw:'',
  upwServer:'',
  sess: '',
  timesTried: 0,
} as UserEnter;

export const decryptLocal = createAsyncThunk('userinfoEnter/decryptLocal'
  , async (decLocal: UserEnterLocalDec) => {
  console.log("Trying decrypt");
  const decReturn = await dec(decLocal.epw, decLocal.encUserEnter);
  console.log("Decrypt => "+ decReturn);
  if(decReturn)
    return { ...JSON.parse(decReturn), sess: ''};
  else {
    return { ...userEnterClearData, timesTried: decLocal.timesTried + 1 };
  }
});

export const UserinfoEnterSlice = createSlice({
  name: 'userinfoEnter',
  initialState: {
    umail: '',
    upw: '',
    upwServer: '',
    sess: '',
    timesTried:0
  } as UserEnter,
  reducers: {
    newUserinfoEnter: (state, action) =>{
      return action.payload;
    },
    setUserSess: (state, action)=>{
      return {
        ...state,
        sess: action.payload,

      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(decryptLocal.fulfilled, (state, action) => {

        return { ...action.payload };
      })
  },
});

// actions
export const {
  newUserinfoEnter,
  setUserSess,
} = UserinfoEnterSlice.actions;

export default UserinfoEnterSlice.reducer;
