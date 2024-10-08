import { setTokens, setUserInfo } from '../../../utils/localStorage'
import { api } from '../../api/apiSlice'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (data) => {
        const loginObj = {
          username: data.user,
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
            const { email, username } = data
            const { access, refresh } = data.token 
            setTokens(access, refresh)
            setUserInfo(email, username)
          }
        } catch (error) {
          console.error("Can't set data in cookie. failed:", error)
        }
      },
    }),
    refresh: builder.mutation({
      query: ({refresh})=> {
        return {
          url:"/user/refresh-token/",
          method: 'POST',
          body:{
            refresh: refresh
          }
        }
      }
    })
  }),
})

export const { useLoginMutation } = authApi
