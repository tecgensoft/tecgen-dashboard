import { api } from '../../api/apiSlice'

export const productManagementApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: ({page}) => {
        return {
          url: `/catalog/category/?page=${page}`,
          method: 'GET',
          // body: data,
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      providesTags: ['AddCategory', 'DeleteCategory', 'UpdateCategory'],
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
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/catalog/category-retrieve-update-destroy/${id}`,
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['UpdateCategory'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => {
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

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productManagementApi
