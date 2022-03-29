import { createSlice } from '@reduxjs/toolkit'

const initialState = { currentUser: null };

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        login(state, user) {
            state.currentUser = user;
            console.log('new state:');
            console.log(state);
        },
        logout(state) {
            state.currentUser = null;
        }
    },
})

export const { login, logout } = userSessionSlice.actions;