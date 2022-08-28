// @flow

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { TIdentity } from '../types';

type SessionState = {
    identity?: TIdentity | null
}

const initialState = {
    identity: null
} as SessionState;

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        login(state, action: PayloadAction<TIdentity>) {
            state.identity = action.payload;
        },
        logout: () => initialState
    },
})

export const { login, logout } = userSessionSlice.actions;

export default userSessionSlice.reducer;