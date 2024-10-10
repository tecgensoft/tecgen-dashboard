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
      providesTags: ['AddCategory', 'DeleteCategory'],
    }),
    addCategory: builder.mutation({
      query: data => {
        return {
          url: '/catalog/category/',
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['AddCategory'],
    }),
    deleteCategory: builder.mutation({
      query: ({id}) => {
        return {
          url: `/catalog/category-retrieve-update-destroy/${id}`,
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['DeleteCategory'],
    }),
  }),
})

export const { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation } = productManagementApi