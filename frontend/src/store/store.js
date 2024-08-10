import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import utilitySlice from "../slices/utilitySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    utility: utilitySlice,
  },
});
