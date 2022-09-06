import { createSlice } from "@reduxjs/toolkit";
import { AppSettings } from "../../../types";

export const AppSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    lastPageOpened: "Notes"
  } as AppSettings,
  reducers: {
    changeSeting: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) { // pending/fulfilled/rejected
    builder
      
  },
});

// actions
export const {
  changeSeting,
} = AppSettingsSlice.actions;

export default AppSettingsSlice.reducer;
