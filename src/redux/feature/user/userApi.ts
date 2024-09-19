
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import { getToken } from '../../../utils/localStorage/local.auth'
import { api } from '../../api/apiSlice'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCustomers: builder.query({
      query: ({ page, search }) => {
        const searchParam = search ? `&search=${search}` : ''
        return {
          url: `/customers?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    getAllUsers: builder.query({
      query: ({ page, search }) => {
        const searchParam = search ? `&search=${search}` : ''
        return {
          url: `/users?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      providesTags: ['addUser', 'updateUser', 'deleteUser'],
    }),
    getBranch: builder.query({
      query: () => {
        return {
          url: `/branches/?page=1`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    getRoles: builder.query({
      query: () => {
        return {
          url: `/roles/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    addUser: builder.mutation({
      query: userInfo => {
        console.log(userInfo)
        return {
          url: `/users/`,
          method: 'POST',
          body: userInfo,
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['addUser'],
    }),
    updateUser: builder.mutation({
      query: userInfo => {
        return {
          url: `/users/${userInfo.id}/`,
          method: 'PATCH',
          body: userInfo,
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['updateUser'],
    }),
    deleteUser: builder.mutation({
      query: ({id}) => {
        return {
          url: `/users/${id}/`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['deleteUser'],
    }),
  }),
})

export const {
  useGetAllCustomersQuery,
  useGetAllUsersQuery,
  useGetBranchQuery,
  useGetRolesQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
