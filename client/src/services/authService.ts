import axios, { AxiosError } from "axios";
import type { RegisterInterface } from "../interface/registerInterface";
import fetchInterceptor from "./fetchInterceptor";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerApi = async (formData: RegisterInterface): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData,  {
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Handle Axios-specific error
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const response = await fetchInterceptor.get(BASE_URL + '/auth/me');
      return response.data;
  } catch (error) {
    throw error;
  }
}


