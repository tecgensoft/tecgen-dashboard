import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isTokenExpired } from '../../utils/getUser';
import { getTokens, setToken } from '../../utils/localStorage';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers, {endpoint}) => {

      if(endpoint === 'authenticate') return headers
        const { access, refresh } = getTokens();
        let token = access
        if (token && isTokenExpired(token)) {
          await fetch(`${import.meta.env.VITE_API_URL}/user/refresh-token/`, {
            method: 'POST',
            body: JSON.stringify({ refresh }),
            headers: { 'Content-Type': 'application/json'},
          }).then((res) => res.json()).then((data) => {
            setToken('access', data?.access)
            token = data?.access
          })
        } 
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
}),
  tagTypes: ['AddCategory', 'DeleteCategory', 'UpdateCategory', 'AddSubCategory', 'SubDeleteCategory'],
  endpoints: () => ({}),
})
