// redux/auth/LoginSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getAuthenticatedUser, loginThunk, registerThunk } from "../actions/thunk";
import type { User } from "../../interface/registerInterface";

type UserState = {
  loading: boolean;
  user: User | null;
  error: string;
};

const initialState: UserState = {
  loading: true,
  user: null,
  error: "",
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message || "Registration failed";
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message || "Login failed";
      })
      .addCase(getAuthenticatedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthenticatedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(getAuthenticatedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message || "Failed to fetch user";
      });

  },
});

export default loginSlice.reducer;
