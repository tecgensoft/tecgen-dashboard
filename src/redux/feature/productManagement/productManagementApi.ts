import { api } from '../../api/apiSlice'

export const productManagementApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: ({ page }: { page?: number }) => {
        let urls: string
        if (page) {
          urls = `/catalog/category/?page=${page}`
        } else {
          urls = `/catalog/category/`
        }

        return {
          url: urls,
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
    getSubCategory: builder.query({
      query: ({ page }) => {
        return {
          url: `/catalog/subcategory/?page=${page}`,
          method: 'GET',
          // body: data,
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      providesTags: ['AddSubCategory', 'UpdateCategory', 'SubDeleteCategory'],
    }),
    addSubCategory: builder.mutation({
      query: data => {
        return {
          url: '/catalog/subcategory/',
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['AddSubCategory'],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/catalog/subcategory-retrieve-update-destroy/${id}`,
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['UpdateCategory'],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/catalog/subcategory-retrieve-update-destroy/${id}`,
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        }
      },
      invalidatesTags: ['SubDeleteCategory'],
    }),
  }),
})

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation
} = productManagementApi
