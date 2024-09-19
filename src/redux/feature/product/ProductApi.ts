
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';

export const productApi = api.injectEndpoints({
  endpoints: builder => ({

    getProductList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/products/?page=${page}${searchParam}`,
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

    createProduct: builder.mutation({
      query: data => {
        return {
          url: '/products/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['productEdit'],
    }),
    updateProduct: builder.mutation({
      query: data => {
        return {
          url: `/products/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['product'],
    }),
    deleteProduct: builder.mutation({
      query: data => {

        return {
          url: `/products/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['productDelete'],
    }),



    // Location
    getLocationList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/location-status/?page=${page}${searchParam}`,
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
      providesTags: ['createLocation', 'updateLocation', 'locationDelete'],
    }),

    createLocation: builder.mutation({
      query: data => {
        return {
          url: '/location-status/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['createLocation'],
    }),
    updateLocation: builder.mutation({
      query: data => {
        return {
          url: `/location-status/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['updateLocation'],
    }),
    deleteLocation: builder.mutation({
      query: data => {

        return {
          url: `/location-status/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['locationDelete'],
    }),
  }),
})

export const { useGetLocationListQuery, useGetProductListQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useCreateLocationMutation, useUpdateLocationMutation,useDeleteLocationMutation } = productApi
