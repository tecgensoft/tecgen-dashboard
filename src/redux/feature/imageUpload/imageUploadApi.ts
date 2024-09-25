import { api } from '../../api/apiSlice'

export const imageUploadApi = api.injectEndpoints({
  endpoints: builder => ({
    imgUpload: builder.mutation({
      query: data => {
        return {
          url: '/upload-image/',
          method: 'POST',
          body: data,
        }
      },
    }),
    imgDelete: builder.mutation({
      query: data => {
        return {
          url: '/delete-image/',
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      },
    }),
  }),
})

export const { useImgUploadMutation, useImgDeleteMutation } = imageUploadApi
