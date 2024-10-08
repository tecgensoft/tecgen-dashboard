import { createSlice } from "@reduxjs/toolkit";
import { clearTokens, clearUserInfo } from "../../../utils/localStorage";
import { authApi } from "./authApi";
// interface IErrorPayload {
//     error?: {
//         code?: string;
//         message?: string;
//     };
// }

export interface IInitialState {
    loading: boolean;
    error: undefined | null | string;
    message: null | string;
    success: boolean;
    token: string | null,
    refresh: string | null,
    userInfo: {
        email: string | null;
        username: string | null
    }
}

export const initialState: IInitialState = {
    loading: false,
    error: null,
    message: null,
    success: false,
    token: "",
    refresh: "",
    userInfo: {
        email: '',
        username: ''
    }
    
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {       
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = initialState.token
            state.token = initialState.refresh
            state.userInfo = initialState.userInfo
            clearTokens()
            clearUserInfo()
        },
        setToken: (state, action) => {
            const { access } = action.payload;
            state.token = access
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                console.log(action.payload)
                const { token } = action.payload
                state.loading = false;
                state.error = null;
                state.success = true;
                state.token = token?.access
            }
        );
    },
});

export const { setError, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
