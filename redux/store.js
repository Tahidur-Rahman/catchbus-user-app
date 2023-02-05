import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/apiSlice";
import rootReducer from "./features/rootSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        rootSlice: rootReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;