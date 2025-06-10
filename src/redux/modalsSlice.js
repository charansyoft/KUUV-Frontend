import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modal",
  initialState: {
    open: null,
    modalProps: {},
  },
  reducers: {
    closeModal: (state, action) => {
      state.open = null;
      state.modalProps = {};
    },
    openModal: (state, action) => {
      state.open = action.payload.modalName;
      state.modalProps = action.payload.modalProps;
    },
  },
});

export const { closeModal, openModal } = modalsSlice.actions;
export default modalsSlice.reducer;
