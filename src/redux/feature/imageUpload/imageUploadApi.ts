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
  }),
})

export const { useImgUploadMutation } = imageUploadApi
