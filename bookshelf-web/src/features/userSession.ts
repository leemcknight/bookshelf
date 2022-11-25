// @flow

import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState: "",
    reducers: {
        login: (state, action: PayloadAction<string>) => action.payload,
        logout: () => ""
    },
})

export const { login, logout } = userSessionSlice.actions;

export default userSessionSlice.reducer;