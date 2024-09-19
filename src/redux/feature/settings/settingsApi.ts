/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { getToken } from '../../../utils/localStorage/local.auth'
import { api } from '../../api/apiSlice'


export const settingsApi = api.injectEndpoints({
  endpoints: builder => ({
    getCompanyMetaInfo: builder.query<any, any>({
      query: () => ({
        url: `/company-meta-info`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
      providesTags: ['addCompany', 'updateCompany']
    }),
    addCompany: builder.mutation({
      query: (formData) => ({
        url: '/company-meta-info/',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,   
        },
        body: formData,
      }),
      invalidatesTags: ['addCompany']
    }),
    updateCompany: builder.mutation({
      query: (data) => {
        const {id, formData} = data
        return ({
          url: `/company-meta-info/${id}/`,
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,   
          },
          body: formData,
        })
      },
      invalidatesTags: ['updateCompany']
    }),
  }),
})

export const { useGetCompanyMetaInfoQuery, useAddCompanyMutation, useUpdateCompanyMutation } = settingsApi
