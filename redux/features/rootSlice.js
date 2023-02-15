import { createSlice } from "@reduxjs/toolkit";
import { setData } from "../../utils/AsyncStorageManager";

const initialData = {
  user: {},
  location: {},
  filterData: {},
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
    setFilterData: (state, { payload }) => {
      state.filterData = payload;
    },
  },
});

export const { setUser, setLocation, setFilterData } = rootSlice.actions;

export default rootSlice.reducer;
