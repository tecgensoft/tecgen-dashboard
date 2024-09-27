import { api } from '../../api/apiSlice'

export const productManagementApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: data => {
        return {
          url: '/catalog/category/',
          method: 'GET',
          body: data,
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      providesTags: ['AddCategory'],
    }),
    addCategory: builder.mutation({
      query: data => {
        return {
          url: '/catalog/category/',
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      },
      invalidatesTags: ['AddCategory'],
    }),
  }),
})

export const { useGetCategoryQuery, useAddCategoryMutation } = productManagementApi
