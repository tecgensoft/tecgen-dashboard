/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck 
import { getToken } from '../../../utils/localStorage/local.auth'
import { api } from '../../api/apiSlice'

export const paymentApi = api.injectEndpoints({
  endpoints: builder => ({
    getSinglePaymentInfo: builder.query({
      query: ({ id, from }) => {
        console.log("from payment", from)
        return ({
          url: `/bookings/${id}/?for_payment=${from}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      // transformResponse: response => {
      //   return response.data.map(item => ({
      //     label: item.product.name, // Change 'name' to 'label' for Autocomplete
      //     value: item.id, // Change 'id' to 'value' for Autocomplete
      //     custom_charge: item?.custom_charge,
      //   }))
      // },
      // providesTags: ['user'],
    }),
    getConversionRate: builder.query({
      query: ({ local_currency_code, cost_in_local_amount, to_currency_code }) => {

        return ({
          url: `currency-conversion/?from_currency_code=${local_currency_code}&from_amount=${cost_in_local_amount}&to_currency_code=${to_currency_code}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      // transformResponse: response => {
      //   return response.data.map(item => ({
      //     label: item.product.name, // Change 'name' to 'label' for Autocomplete
      //     value: item.id, // Change 'id' to 'value' for Autocomplete
      //     custom_charge: item?.custom_charge,
      //   }))
      // },
      // providesTags: ['user'],
    }),
    getAllPayments: builder.query({

      query: ({ search }) => {


        return ({
          url: `/payments/?search=${search}&page=1`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      // transformResponse: response => {

      //   return response.data.map(item => ({
      //     label: item?.name, // Change 'name' to 'label' for Autocomplete
      //     value: item.id, // Change 'id' to 'value' for Autocomplete

      //   }))
      // },
    }),
    printPaymentReport: builder.query({

      query: (id) => {


        return ({
          url: `/report/payment-invoice-pdf/${id}/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
          responseHandler: async (response: any) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const blob = await response.blob()
            const contentType = response.headers.get('Content-Type')
            const file = new Blob([blob], { type: contentType })

            const fileURL = window.URL.createObjectURL(file)

            window.open(fileURL)

            return response
          },

        })
      },

    }),
    createPayment: builder.mutation({
      query: data => {
        return {
          url: '/payments/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      // invalidatesTags: ['booking'],
    }),
    getPaymentReport: builder.query({
      query: ({ date, method }) => {
        let url = 'report/excel/payment/';
        if (date && method) {
          url += `?date=${date}&payment_method=${method}`;
        } else if (date) {
          url += `?date=${date}`;
        } else if (method) {
          url += `?payment_method=${method}`;
        }
        return {
          url,
          responseHandler: (response) => {

            if (response?.ok) {

              return response.arrayBuffer()
            } else {

              return null
            }


          }, // Ensure response is handled as arrayBuffer
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        };
      },
    }),
    getAllBookingsForPayment: builder.query({
      query: ({ search }) => {

        return ({

          url: `/bookings/?search=${search}&&payment_status=UNPAID`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },

        })
      },
      transformResponse: response => {

        return response.data.map(item => ({
          label: item?.reference,

          value: item?.id


        }))
      },

      providesTags: ['booking'],
    }),
    downloadSinglePayment: builder.query({
      query: ({ id }) => {
        return {
          url: `/report/payment-invoice-pdf-download/${id}/`,
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
            link.download = 'payment-report.pdf'; // Adjust filename as needed

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
    getAllConversion: builder.query({

      query: () => {


        return ({
          url: `/conversion/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      providesTags: ['conversionCreate', 'conversionUpdate'],
    }),
    createConversion: builder.mutation({
      query: data => {
        return {
          url: '/conversion/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['conversionCreate'],
    }),
    updateConversion: builder.mutation({
      query: data => {
        return {
          url: `/conversion/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['conversionUpdate'],
    }),
  }),
})

export const { useLazyGetConversionRateQuery, useCreateConversionMutation, useGetAllConversionQuery, useUpdateConversionMutation, useGetPaymentReportQuery, usePrintPaymentReportQuery, useDownloadSinglePaymentQuery, useGetSinglePaymentInfoQuery, useCreatePaymentMutation, useGetAllPaymentsQuery, useLazyGetPaymentReportQuery, useGetAllBookingsForPaymentQuery } = paymentApi
