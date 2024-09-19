
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const CustomChargesApi = api.injectEndpoints({
  endpoints: builder => ({

    getCustomChargeList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/products-custom-charge/?page=${page}${searchParam}`,
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
      providesTags: ['customCreate', "customUpdate","customDelete"],
    }),
    getSelectProductList: builder.query({
      query: ({ search }) => {


        return ({
          url: `/products/?search=${search}&page=1`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      transformResponse: response => {

        return response.data.map(item => ({
          label: item?.name, // Change 'name' to 'label' for Autocomplete
          value: item.id, // Change 'id' to 'value' for Autocomplete

        }))
      },
      // providesTags: ['product', 'productEdit', 'productDelete'],
    }),
    getCountry: builder.query({
      query: () => {


        return ({
          url: `/countries/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      transformResponse: response => {

        return response?.data?.map(item => ({
          label: item?.name, // Change 'name' to 'label' for Autocomplete
          value: item.id, // Change 'id' to 'value' for Autocomplete

        }))
      },
      // providesTags: ['product', 'productEdit', 'productDelete'],
    }),
    createCustomCharge: builder.mutation({
      query: data => {
        return {
          url: '/products-custom-charge/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['customCreate'],
    }),
    updateCustomCharge: builder.mutation({
      query: data => {
        return {
          url: `/products-custom-charge/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['customUpdate'],
    }),
    deleteCustom: builder.mutation({
      query: data => {

        return {
          url: `/products-custom-charge/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['customDelete'],
    }),
  }),
})

export const { useGetSelectProductListQuery,useDeleteCustomMutation, useGetCustomChargeListQuery, useCreateCustomChargeMutation, useUpdateCustomChargeMutation, useDeleteProductMutation, useGetCountryQuery } = CustomChargesApi
