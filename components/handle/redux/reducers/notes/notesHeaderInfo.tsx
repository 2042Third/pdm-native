
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dec, enc } from "../../../handlers/user";
import { EncryptedUserEnterArg } from "../../../models";
import { EncrptedUserEnter, NotesHeaderInfo, UserEnter, UserInfoGeneral } from "../../../types";
import { parseTimeShort } from "../helpers";


export const NotesHeaderInfoSlice = createSlice({
  name: 'notesHeaderInfo',
  initialState: {
    update_info: " "
  } as NotesHeaderInfo,
  reducers: {
    newNotesHeaderInfo: (state, action) => {
      return { update_info: action.payload };
    },
  },
  // extraReducers(builder) {
  //   builder
  // },
});

// actions
export const {
  newNotesHeaderInfo,
} = NotesHeaderInfoSlice.actions;

export default NotesHeaderInfoSlice.reducer;

