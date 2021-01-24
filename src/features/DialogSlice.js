import { createSlice } from "@reduxjs/toolkit";

const DialogSlice = createSlice({
  name: "Dialog",
  initialState: {
    addList: { open: false },
    addInventory: { open: false },
    send: { open: false, item: null },
  },
  reducers: {
    toggleOpen(state, action) {
      const { type, item } = action.payload;
      state[type].open = !state[type].open;
      if (type === "send") {
        state[type].item = item;
      }
    },
  },
});

export const { toggleOpen } = DialogSlice.actions;

export default DialogSlice.reducer;
