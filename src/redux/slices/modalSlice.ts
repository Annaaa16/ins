import { createSlice } from '@reduxjs/toolkit';

// types
import { ModalSliceState } from '../types';

const initialState: ModalSliceState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
