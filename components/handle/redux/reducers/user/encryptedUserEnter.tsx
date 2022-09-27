
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dec, enc } from "../../../handlers/user";
import { EncryptedUserEnterArg } from "../../../models";
import { EncrptedUserEnter, UserEnter, UserInfoGeneral } from "../../../types";
import { parseTimeShort } from "../helpers";
export const encryptedUserEnterClearData = {
  userEnter: '',
  dateTimeUpdated: -1,
} as EncrptedUserEnter;

export const saveUserEnter = createAsyncThunk('encryptedUserinfoEnter/saveUserEnter', async (encData: EncryptedUserEnterArg) => {

  return {
    userEnter: await enc(encData.epw, JSON.stringify(encData.user)),
    dateTimeUpdated: Date.now(),
    timeUnlock: Date.now()
  };
});

export const EncryptedUserinfoEnterSlice = createSlice({
  name: 'encryptedUserinfoEnter',
  initialState: {
    userEnter: '',
    dateTimeUpdated: -1,
    timeUnlock: Date.now()
  } as EncrptedUserEnter,
  reducers: {
    newEncUserinfoEnter: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveUserEnter.fulfilled, (state, action) => {

        return action.payload;
      })
  },
});

// actions
export const {
  newEncUserinfoEnter,
} = EncryptedUserinfoEnterSlice.actions;

export default EncryptedUserinfoEnterSlice.reducer;

function netCallBack(user: UserEnter): UserInfoGeneral | PromiseLike<UserInfoGeneral> {
  throw new Error("Function not implemented.");
}
