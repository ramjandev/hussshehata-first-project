import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "./loginTypes";

interface AuthState {
  user: LoginResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setAccessToken, setUser, setRefreshToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
