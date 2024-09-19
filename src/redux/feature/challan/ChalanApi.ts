
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const ChallanApi = api.injectEndpoints({
  endpoints: builder => ({

    getChallanList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/delivery_challans/?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      providesTags: ['createChallan', 'updateChallan']

    }),
    downloadChallan: builder.query({
      query: ({ id }) => {
        return {
          url: `/delivery_challans/challan-report/?id=${id}`,
          method: 'GET',
          responseHandler: async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const contentType = response.headers.get('Content-Type');
            const file = new Blob([blob], { type: contentType });

            // Create a link element and set its href to the file URL
            const link = document.createElement('a');
            const fileURL = window.URL.createObjectURL(file);
            link.href = fileURL;

            // Optionally set the download attribute to suggest a filename
            link.download = 'challan-report.pdf'; // Adjust filename as needed

            // Append link to the document and trigger a click to start download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link element
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileURL);

            return response;
          },
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        };
      },

    }),
    createChallan: builder.mutation({
      query: data => {
        return {
          url: '/delivery_challans/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['createChallan'],
    }),

    getChallanLLot: builder.query({
      query: ({ id, search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/delivery_challan_lots/?delivery_challan__id=${id}&&page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      providesTags: ['addLotToChallan', 'deleteChallan']

    }),
    addLotToChallan: builder.mutation({
      query: data => {
        return {
          url: '/delivery_challan_lots/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['addLotToChallan'],
    }),
    completeChallan: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/delivery_challans/${id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['updateChallan'],
    }),
    deleteChallan: builder.mutation({
      query: (data) => {
        return {
          url: `/delivery_challan_lots/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['deleteChallan'],
    }),

  }),
})

export const { useDeleteChallanMutation, useGetChallanListQuery, useCompleteChallanMutation, useDownloadChallanQuery, useCreateChallanMutation, useGetChallanLLotQuery, useAddLotToChallanMutation } = ChallanApi
