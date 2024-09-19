/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const bookingApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllBookings: builder.query({
      query: ({ search, page }) => {

        return ({

          url: `/bookings/?search=${search}&&page=${page}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },


      providesTags: ['booking'],
    }),
    getSingleBooking: builder.query({
      query: ({ id }) => {

        return ({

          url: `/bookings/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },

      providesTags: ['booking'],

    }),
    getFilteredBookingReport: builder.query({
      query: ({ startDate, endDate, payment, type, setDownLoad, setLoading }) => {
        // console.log("here")
        setDownLoad(false)
        let newUrl
        let name
        let ext
        if (type === 'booking_report') {
          newUrl = '/report/excel/booking/'
          name = 'Booking-Report-'
          ext = '.xls'
        }
        if (type === 'packing_report') {
          newUrl = '/report/excel/package/'
          name = 'Package-Report-'
          ext = '.xlsx'
        }
        if (type === 'booking_sell_pdf') {
          newUrl = '/report/excel/booking-sell-pdf/'
          name = 'booking-sell-'
          ext = '.pdf'
        }
        if (type === 'booking_sell_report') {
          newUrl = '/report/excel/booking-sell/'
          name = 'BookingSell-'
          ext = '.xlsx'
        }
        return {
          url: `${newUrl}?created_at__gte=${startDate}&created_at__lte=${endDate}&payment_status=${payment}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
          responseHandler: async response => {

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const blob = await response.blob()
            const contentType = response.headers.get('Content-Type')
            const file = new Blob([blob], { type: contentType })

            const fileURL = window.URL.createObjectURL(file)
            const link = document.createElement('a')
            link.href = fileURL
            link.setAttribute(
              'download',
              `${name}${new Date().toLocaleDateString().replace(/T.*/, '').split('/').reverse().join('-')}${ext}`,
            )
            document.body.appendChild(link)
            link.click()
            link.remove()
            setLoading(false)
            return response
          },
        }
      },

      // providesTags: ['user'],
    }),
    getInvoicePdf: builder.query({
      query: (id: string) => ({
        url: `report/booking-receipt-pdf-download/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
        responseHandler: async response => {
          // console.log(response)
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
      }),

      // async onQueryStarted(arg, { dispatch, getState, requestId }) {
      //   // You can dispatch loading actions if needed
      // },
      // async onCacheEntryAdded() {
      //   // Handle cache management if needed
      // },
    }),
    getPrintInvoice: builder.query({
      query: id => {
        return {
          url: `report/booking-receipt-pdf/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    createBooking: builder.mutation({
      query: data => {
        return {
          url: '/bookings/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['booking'],
    }),

    getCustomersByCountryCodeAndSearchInput: builder.query({
      query: ({ countryCode, searchInputValue }) => {
        if(countryCode === null) return;
        return {
          url: `customers/?country__code=${countryCode}&search=${searchInputValue}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    getExistingCustomers: builder.query({
      query: ({ searchInputValue }) => ({
        url: `customers/${searchInputValue}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
    getSenderReceiverInformation: builder.query({
      query: params => ({
        url: `customers/${params?.optionId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: `countries/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
    getCountryCityByNumberCode: builder.query({
      query: ({ numberCode }) => {
        if(numberCode === null) return;
        return {
          url: `country/${numberCode}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    getCountryCityByReceiverNumberCode: builder.query({
      query: ({ numberCode }) => {
        if(numberCode === null) return;
        return {
          url: `country/${numberCode}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
    }),
    getBookingById: builder.query({
      query: ({ id }) => ({
        url: `bookings/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
    getLotStatus: builder.query({
      query: () => ({
        url: `update-lot-status/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
    // getLotUpdateStatusById: builder.query({
    //   query: ({id, reference}) => ({
    //     url: `update-lot-status/${id}/?reference=${reference}`,
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${getToken('token')}`,
    //     },
    //   }),
    // })
  }),
})

export const {
  useGetAllBookingsQuery,
  useGetFilteredBookingReportQuery,
  // useGetSearchedBookingsQuery,
  useGetInvoicePdfQuery,
  useLazyGetPrintInvoiceQuery,
  useCreateBookingMutation,
  useGetCountriesQuery,
  useGetCountryCityByNumberCodeQuery,
  useGetCountryCityByReceiverNumberCodeQuery,
  useGetCustomersByCountryCodeAndSearchInputQuery,
  useGetExistingCustomersQuery,
  useGetSenderReceiverInformationQuery,
  useGetBookingByIdQuery,
  useGetLotStatusQuery, useGetSingleBookingQuery,
  useGetLotUpdateStatusByIdQuery
} = bookingApi
