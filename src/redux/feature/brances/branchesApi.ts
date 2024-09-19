/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const branchesApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllBranches: builder.query({
      query: ({ page, search }) => {
        const searchParam = search ? `&search=${search}` : '';
        return ({
          url: `/branches?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },

      providesTags: ['createBranch', "updateBranch", 'branchDelete'],
    }),
    createBranch: builder.mutation({
      query: data => {
        return {
          url: '/branches/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['createBranch'],
    }),
    updateBranch: builder.mutation({
      query: data => {
        return {
          url: `/branches/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['updateBranch'],
    }),
    deleteBranch: builder.mutation({
      query: data => {

        return {
          url: `/branches/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['branchDelete'],
    }),
  }),
})

export const { useGetAllBranchesQuery, useCreateBranchMutation, useDeleteBranchMutation, useUpdateBranchMutation } = branchesApi
