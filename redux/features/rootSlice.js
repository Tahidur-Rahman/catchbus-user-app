import { createSlice } from '@reduxjs/toolkit'
import { setData } from '../../utils/AsyncStorageManager'

const initialData = {
    user: {},
};

export const rootSlice = createSlice({
    name: 'appStore',
    initialState: initialData,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            setData("user", action.payload)
        },
    },
})

export const { 
    setUser, 
} = rootSlice.actions

export default rootSlice.reducer;