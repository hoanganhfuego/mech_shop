import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateAuth: (state, action) => {
      state.auth = {
        ...state.auth,
        ...(action.payload || {}),
      };
    },
  },
});

export const { setAuth, updateAuth } = slice.actions;
export default slice.reducer;
