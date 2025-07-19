import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fetchInterceptor from "../../services/fetchInterceptor";
import type { RegisterInterface } from "../../interface/registerInterface";
import { registerApi } from "../../services/authService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginThunk = createAsyncThunk(
  "login",
  async (formData: { email: string; password: string }) => {
    const response = await axios.post(
      BASE_URL + "/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const registerThunk = createAsyncThunk(
  "register",
  async (formData: RegisterInterface, { rejectWithValue }) => {
    try {
      return await registerApi(formData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAuthenticatedUser = createAsyncThunk("getAuthenticatedUser", async () => {
  const response = await fetchInterceptor.get(BASE_URL + "/auth/me");
  return response.data;
});
