import { getToken } from '../../../utils/localStorage/local.auth'
import { api } from '../../api/apiSlice'

export const dashboard = api.injectEndpoints({
  endpoints: builder => ({
    getDashboardData: builder.query<any, void>({
      query: () => ({
        url: '/dashboard/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken('token')}`,
        },
      }),
    }),
  }),
})

export const { useGetDashboardDataQuery } = dashboard
