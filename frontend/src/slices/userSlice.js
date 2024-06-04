import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  otp: {
    number: "",
    hash: "",
  },
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { setAuth, setOtp, setUser } = userSlice.actions;

export default userSlice.reducer;
