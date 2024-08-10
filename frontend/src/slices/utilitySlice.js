import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavBarVisible: true,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setIsNavbarVisible: (state, action) => {
      state.isNavBarVisible = action.payload;
    },
  },
});

export const { setIsNavbarVisible } = utilitySlice.actions;

export default utilitySlice.reducer;
