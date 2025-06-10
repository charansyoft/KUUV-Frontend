import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import modalsSlice from "./modalsSlice";
import userReducer from "./userSlice";
import locationReducer from "./locationSlice";
import userSelectedAddress from "./UserSelectedAddress"
const store = configureStore({
  reducer: {
    app: appSlice,
    user: userReducer,
    modals: modalsSlice,
    location: locationReducer,
    userSelectedAddress: userSelectedAddress,
  },
});

export default store;
