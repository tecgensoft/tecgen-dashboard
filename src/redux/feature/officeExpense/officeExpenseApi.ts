
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 


import { getToken } from '../../../utils/localStorage/local.auth';
import { api } from '../../api/apiSlice';


export const officeExpenseApi = api.injectEndpoints({
  endpoints: builder => ({

    getOfficeExpenseApiList: builder.query({
      query: ({ search, page }) => {

        const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/expenses/?page=${page}${searchParam}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      providesTags: ["expenseCreate"]
    }),
    getOfficeExpenseCategory: builder.query({
      query: ({ page }) => {



        return ({
          url: `expenses-category?page=${page}`,
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
      providesTags: ['categoryCreate', 'categoryUpdate', 'categoryDelete'],
    }),
    getOfficeExpenseCategoryForSelect: builder.query({
      query: () => {

        // const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `expenses-category?page=1`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      transformResponse: response => {
        return response.data.map(item => ({
          label: item.name, // Change 'name' to 'label' for Autocomplete
          value: item.id, // Change 'id' to 'value' for Autocomplete

        }))
      },
      providesTags: ['categoryCreate', 'categoryUpdate', 'categoryDelete'],
    }),
    getOfficeExpenseBranchForSelect: builder.query({
      query: () => {

        // const searchParam = search ? `&search=${search}` : '';

        return ({
          url: `/branches/?page=1`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          },
        })
      },
      transformResponse: response => {
        return response.data.map(item => ({
          label: item.name, // Change 'name' to 'label' for Autocomplete
          value: item.id, // Change 'id' to 'value' for Autocomplete

        }))
      },
      providesTags: ['categoryCreate', 'categoryUpdate', 'categoryDelete'],
    }),
    createExpense: builder.mutation({
      query: (data) => {
        return {
          url: '/expenses/',
          method: 'POST',
          body: data,
          headers: {
            // "content-type": "multipart/form-data",
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['expenseCreate'],
    }),
    updateExpense: builder.mutation({
      query: (data) => {

        return {
          url: `/expenses/${data?.id}/`,
          method: 'PATCH',
          body: data?.formData,
          headers: {
            // "content-type": "multipart/form-data",
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['expenseCreate'],
    }),
    downloadExpense: builder.query({
      query: ({ date, expense_category__id}) => {
        // Construct the URL based on the provided parameters
        let url = '/report/excel/expense/';
        const params = [];

        if (date) {
          params.push(`date=${encodeURIComponent(date)}`);
        }

        if (expense_category__id) {
          params.push(`expense_category__id=${encodeURIComponent(expense_category__id)}`);
        }

        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        return {
          url,
          method: 'GET',
          responseHandler: async (response) => {
            if (!response.ok) {
            
              // setOpen(true)

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
            link.download = 'expense-report.xls'; // Adjust filename as needed

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
    createCategory: builder.mutation({
      query: data => {
        return {
          url: '/expenses-category/',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['categoryCreate'],
    }),
    updateCategory: builder.mutation({
      query: data => {
        return {
          url: `/expenses-category/${data?.id}/`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['categoryUpdate'],
    }),
    deleteCategory: builder.mutation({
      query: data => {

        return {
          url: `/expenses-category/${data?.id}/`,
          method: 'DELETE',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        }
      },
      invalidatesTags: ['categoryDelete'],
    }),
  }),
})

export const { useLazyDownloadExpenseQuery, useUpdateExpenseMutation, useGetOfficeExpenseBranchForSelectQuery, useGetOfficeExpenseCategoryForSelectQuery, useGetOfficeExpenseApiListQuery, useCreateExpenseMutation, useGetOfficeExpenseCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = officeExpenseApi
