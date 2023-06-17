
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dec } from "../../../handlers/user";
import { EncryptedUserEnterArg, UserEnterLocalDec } from "../../../models";
import { UserEnter, UserEnterExt, UserInfoGeneral } from "../../../types";
export const userEnterClearData = {
  umail: '',
  upw:'',
  upwServer:'',
  sess: '',
  timesTried: 0,
  uName:"",
  loadStatus:"",
} as UserEnterExt;

export const decryptLocal = createAsyncThunk('userinfoEnter/decryptLocal'
  , async (decLocal: UserEnterLocalDec) => {
  console.log("Trying decrypt");
  const decReturn = await dec(decLocal.epw.toString(), decLocal.encUserEnter.toString())
    .catch((error: any) => {
      console.log("Decryption user logging failed!");
      console.info(error);
    });
  console.log("Decrypt => "+ decReturn);
  await new Promise(r => setTimeout(r, 200));

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
    timesTried:0,
    uName: "",
    loadStatus: "idle",
  } as UserEnterExt,
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

        return {
          ...action.payload,
          loadStatus: "fulfilled",
        };
      })
      .addCase(decryptLocal.pending,(state, action)=> {
        return {
          ...state,
          loadStatus: "idle",
        }
      } )
      .addCase(decryptLocal.rejected, (state, action) => {
        return {
          ...state,
          loadStatus: "fail",
        }
      })
  },
});

// actions
export const {
  newUserinfoEnter,
  setUserSess,
} = UserinfoEnterSlice.actions;

export default UserinfoEnterSlice.reducer;
