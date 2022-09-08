import { createSlice } from "@reduxjs/toolkit";
import { AppSettings } from "../../../types";

export const AppSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    lastPageOpened: "Notes"
  } as AppSettings,
  reducers: {
    changeSetting: (state, action) => {
      return action.payload;
    },
    changePageOpened: (state, action) => {
      return {
        ...state,
        lastPageOpened: action.payload
      }
    }
  },
  extraReducers(builder) { // pending/fulfilled/rejected
    builder
      
  },
});

// actions
export const {
  changeSetting,
  changePageOpened,
} = AppSettingsSlice.actions;

export default AppSettingsSlice.reducer;
