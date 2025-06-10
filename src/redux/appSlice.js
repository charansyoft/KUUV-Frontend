import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    location: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = appSlice.actions;
export default appSlice.reducer;
