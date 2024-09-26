import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: async (headers) => {
            // const { access } = getTokens();
            // let token = access
            // if (token && isTokenExpired(token)) {
            //   await fetch(`${import.meta.env.VITE_REACT_MAIN_API}/authenticate/refresh`, {
            //     method: 'POST',
            //     body: JSON.stringify({ refresh }),
            //     headers: { 'Content-Type': 'application/json'},
            //   }).then((res) => res.json()).then((data) => {
            //     setToken('jwtToken', data?.jwtToken)
            //     token = data?.jwtToken
            //   })
            // } 
            // if (token) {
            //     headers.set("Authorization", `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});