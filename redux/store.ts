import { configureStore } from "@reduxjs/toolkit";
import confettiReducer from "./slices/ConfettiSlice";

export const store = configureStore({
  reducer: { confetti: confettiReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
