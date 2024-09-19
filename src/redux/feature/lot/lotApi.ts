
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const lotApi = api.injectEndpoints({
  endpoints: builder => ({
    getProductForLot: builder.query({
      query: ({ search }) => ({
        url: `/products-custom-charge/?search=${search}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
      transformResponse: response => {
        return response.data.map(item => ({
          label: item.product.name, // Change 'name' to 'label' for Autocomplete
          value: item.id, // Change 'id' to 'value' for Autocomplete
          custom_charge: item?.custom_charge,
        }))
      },
      // providesTags: ['user'],
    }),
    getLotList: builder.query({
      query: ({ search, page }) => {


        const searchParam = search ? `&search=${search}` : '';

        return {
          url: `/lots/?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        };
      },
    }),
  }),
})

export const { useGetProductForLotQuery, useGetLotListQuery } = lotApi
