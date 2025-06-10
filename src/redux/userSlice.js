import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { phone: null },
  reducers: {
    setUser: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
