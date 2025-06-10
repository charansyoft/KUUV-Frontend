// redux/UserSelectedAddress.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [], // List of { state, city } objects
};

const UserSelectedAddressSlice = createSlice({
  name: 'userSelectedAddress',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const { stateName, city } = action.payload;
      // Avoid duplicates
      const exists = state.addresses.some(
        (item) => item.stateName === stateName && item.city === city
      );
      if (!exists) {
        state.addresses.push({ stateName, city });
      }
    },
    clearAddresses: (state) => {
      state.addresses = [];
    },
  },
});

export const { addAddress, clearAddresses } = UserSelectedAddressSlice.actions;
export default UserSelectedAddressSlice.reducer;
