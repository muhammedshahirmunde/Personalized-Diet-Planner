import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
