import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increase(state) {
      state.value++;
    },
    decrease(state) {
      state.value++;
    },
    increaseByMount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
