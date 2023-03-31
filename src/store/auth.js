const { createSlice } = require("@reduxjs/toolkit");

const initialData = {
  pick: { idolPk: null, schedulePk: null },
  is_admin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { authState: initialData },
  reducers: {
    logIn(state, actions) {
      state.authState = actions.payload;
    },
    logOut(state) {
      state.authState = initialData;
    },
    adminModify(state, actions) {
      state.authState.pick = actions.payload;
    },
  },
});

export const authActions = authSlice.actions;
