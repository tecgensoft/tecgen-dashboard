import { setTokens } from '../../../utils/localStorage'
import { api } from '../../api/apiSlice'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (data) => {
        const loginObj = {
          username: data.email,
          password: data.password
        }
        return {
          url: '/user/signin/',
          method: 'POST',
          body: loginObj,
        }
      },
      onQueryStarted: async (_args, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          if (data) {
            setTokens(data.access, data.refresh)
          }
        } catch (error) {
          console.error("Can't set data in cookie. failed:", error)
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
