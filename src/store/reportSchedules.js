import { createSlice } from "@reduxjs/toolkit";

export const reportSchedulesSlice = createSlice({
  name: "reportSchedules",
  initialState: { reportData: [], searchData: [] },
  reducers: {
    updateSchedule(state, actions) {
      state.reportData = actions.payload;
    },
    searchSchedule(state, actions) {
      state.searchData = actions.payload;
    },
  },
});

export const reportSchedulesActions = reportSchedulesSlice.actions;
