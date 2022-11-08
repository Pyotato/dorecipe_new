import { createSlice } from "@reduxjs/toolkit";

export const messageReducer = createSlice({
  initialState: {
    SET_MESSAGE: null,
    CLEAR_MESSAGE: null,
  },
  reducers: {
    hasMessage: (state, action) => {
      state.SET_MESSAGE = action.payload;
      state.CLEAR_MESSAGE = false;
    },
    removeMessage: (state) => {
      state.SET_MESSAGE = "";
      state.CLEAR_MESSAGE = true;
    },
  },
});

export const { hasMessage, removeMessage } = messageReducer.actions;
