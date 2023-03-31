import { idolDataSlice } from "./idolData";
import { reportSchedulesSlice } from "./reportSchedules";

const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("./auth");

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reportSchedule: reportSchedulesSlice.reducer,
    idolData: idolDataSlice.reducer,
  },
});

export default store;
