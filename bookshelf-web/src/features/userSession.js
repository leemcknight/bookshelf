import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        login(state) {
            state.value++
        },
        logout(state) {
            state.value--
        }

    },
})

export const { login, logout } = userSessionSlice.actions