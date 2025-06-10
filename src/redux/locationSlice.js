// redux/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedLocation: {
      state: "",
      city: "",
    },
  },
  reducers: {
    handleLocationSelect: (state, action) => {
      state.selectedLocation = {
        state: action.payload.state,
        city: action.payload.city,
      };
    },
  },
});

export const { handleLocationSelect } = locationSlice.actions;
export default locationSlice.reducer;
