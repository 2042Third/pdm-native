import { createSlice } from "@reduxjs/toolkit";
import { AppSettings } from "../../../types";

export const clearAppSettings = {
  lastPageOpened: "Notes",
  timesCanTry: 5
} as AppSettings

export const AppSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    lastPageOpened: "Notes",
    timesCanTry: 5
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
    // builder

  },
});

// actions
export const {
  changeSetting,
  changePageOpened,
} = AppSettingsSlice.actions;

export default AppSettingsSlice.reducer;
