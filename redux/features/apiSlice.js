import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://catchbus-backend.up.railway.app/api/v1"
    // baseUrl: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:3000/api/v1`
  }),
  tagTypes: ["CatchBus"],
  endpoints: builder => ({}),
})

export default apiSlice;