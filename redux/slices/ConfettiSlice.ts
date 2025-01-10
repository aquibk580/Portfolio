import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const confettiSlice = createSlice({
  name: "confetti",
  initialState,
  reducers: {
    showConfetti: (state) => {
     return true
    },
    hideConfetti: (state) => {
      return false;
    },
  },
});

export const { showConfetti, hideConfetti } = confettiSlice.actions;

export default confettiSlice.reducer;
