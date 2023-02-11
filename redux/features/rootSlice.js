import { createSlice } from "@reduxjs/toolkit";
import { setData } from "../../utils/AsyncStorageManager";

const initialData = {
  user: {},
  location: {},
};

export const rootSlice = createSlice({
  name: "appStore",
  initialState: initialData,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setData("user", action.payload);
    },
    setLocation: (state, { payload }) => {
      state.location = { ...state.location, ...payload };
    },
  },
});

export const { setUser, setLocation } = rootSlice.actions;

export default rootSlice.reducer;
