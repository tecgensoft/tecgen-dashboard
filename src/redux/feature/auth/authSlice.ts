import { createSlice } from "@reduxjs/toolkit";
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
}

export const initialState: IInitialState = {
    loading: false,
    error: null,
    message: null,
    success: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {       
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, payload) => {
                // const error = (action.payload?.data as IErrorPayload)?.error;
console.log(payload)
                let errorMessage: string | undefined;

                // if (typeof error === "object" && error !== null) {
                //     // Check if error has a 'code' and 'message'
                //     if (error.code === "invalidCredentials") {
                //         errorMessage = "Invalid E-mail/Password.";
                //     } else {
                //         errorMessage = error.message;
                //     }
                // } else {
                //     // Handle case where error is not an object
                //     errorMessage = "An unknown error occurred";
                // }
                state.loading = false;
                state.error = errorMessage;
                state.success = false;
            }
        );
    },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;