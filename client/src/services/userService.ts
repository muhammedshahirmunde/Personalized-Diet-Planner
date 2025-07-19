// src/services/bookingService.ts
import { type UserMetricsPayload } from "../interface/profileInterface";
import fetchInterceptor from "./fetchInterceptor";

const path = "/user";


export const createUserProfile = (payload: UserMetricsPayload) =>
  fetchInterceptor.post(path + '/submit-metrics', payload).then((res) => res.data);


export const fetchBMIData = (userId : string) =>
  fetchInterceptor.get(path + '/metrics' + `?userId=${userId}`).then((res) => res.data);