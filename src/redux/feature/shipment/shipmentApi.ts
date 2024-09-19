
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { PACKING_LIST_DOWNLOAD, PRODUCT_ITEMS_LIST_DOWNLOAD, SHIPMENT_BOOKINGS_DOWNLOAD } from '../../../pages/shipments/constant';
import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const shipmentApi = api.injectEndpoints({
  endpoints: builder => ({

    getShipmentsList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/shipments/?page=${page}${searchParam}`,
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
      providesTags: ['createShipment'],
    }),
    getShipmentsLot: builder.query({
      query: ({ search, shipmentNumber, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/lots/?shipment__shipment_number=${shipmentNumber}&page=${page}${searchParam}`,
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
      providesTags: ['product', 'productEdit', 'productDelete'],
    }),

    downloadPackingList: builder.query({
      query: ({ id, setDownload, type, setLoad }) => {
        let url;
        let reportName;
        if (type === PACKING_LIST_DOWNLOAD) {
          url = `/report/excel/package/?shipment__id=${id}`
          reportName = 'packing_list.xlsx'
        }
        if (type === PRODUCT_ITEMS_LIST_DOWNLOAD) {
          url = `/report/excel/shipment-product-items/?shipment__id=${id}`
          reportName = 'product_items_list.xls'
        }
        if (type === SHIPMENT_BOOKINGS_DOWNLOAD) {
          url = `/report/excel/shipment-bookinges/?shipment__id=${id}`
          reportName = 'booking_report.xlsx'
        }

        return {
          url,
          method: 'GET',
          responseHandler: async (response) => {
            if (!response.ok) {
              setPackingListDownload(false);


              throw new Error(`HTTP error! status: ${response.status}`);
            }

            setDownload(false)


            const blob = await response.blob();
            const contentType = response.headers.get('Content-Type');
            const file = new Blob([blob], { type: contentType });

            // Create a link element and set its href to the file URL
            const link = document.createElement('a');
            const fileURL = window.URL.createObjectURL(file);
            link.href = fileURL;

            // Optionally set the download attribute to suggest a filename
            link.download = reportName; // Adjust filename as needed

            // Append link to the document and trigger a click to start download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link element
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileURL);
            setLoad(false)
            return response;
          },
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        };
      },
    }),

    createShipment: builder.mutation({
      query: data => {
        return {
          url: '/shipments/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['createShipment'],
    }),
    getUpdateShipmentStatus: builder.query({
      query: ({ id, statusId, page }) => {
        return {
          url: `update-bulk-lot-status/${id}/${statusId}/?page=${page}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },

    }),
    addLotToShipment: builder.query({
      query: (data) => {



        return ({
          url: `/shipment/add-lot/${data?.shipmentId}/lot-ref/${data?.lotRef}/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },

      invalidatesTags: ['addlot'],
    }),
    // getLotToShipment: builder.query({
    //   query: ({ shipment__shipment_number, page }) => {
    //     return {
    //       url: `/lots/?shipment__shipment_number=${shipment__shipment_number}&page=${page}`,
    //       method: 'GET',
    //       body: data,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${getToken('token')}`,
    //       },
    //     }
    //   },

    // }),
  }),
})

export const { useLazyAddLotToShipmentQuery, useGetUpdateShipmentStatusQuery, useCreateShipmentMutation, useGetShipmentsLotQuery, useGetShipmentsListQuery, useDownloadPackingListQuery } = shipmentApi
