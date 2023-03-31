import { createSlice } from "@reduxjs/toolkit";

export const idolDataSlice = createSlice({
  name: "idolData",
  initialState: { idolData: [], searchIdolData: [] },
  reducers: {
    updateIdolData(state, actions) {
      state.idolData = actions.payload;
    },
    searchIdolData(state, actions) {
      state.searchIdolData = actions.payload;
    },
  },
});

export const idolDataActions = idolDataSlice.actions;
