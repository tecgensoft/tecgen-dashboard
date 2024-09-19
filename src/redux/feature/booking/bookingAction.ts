
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck 

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../utils/localStorage/local.auth'
const backendURL = import.meta.env.VITE_API_URL
export const bookingLotStatus = createAsyncThunk<any, void, any>(
  'booking/lotstatus',
  async (lotData, { rejectWithValue }) => {
    try {
      const { lotsReference: reference, status: id } = lotData
      if (id && reference) {
        const resp = await fetch(
          `${backendURL}/update-lot-status/${id}/?reference=${reference}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken('token')}`,
            },
          },
        )
        if (!resp.ok) {
          const data = await resp.json()
          // console.log(data)
          return rejectWithValue(`${data.message}`)
        }
        // response is ok than return data
        const response = await resp.json()
        return response.data
      }
    } catch (error) {
      throw error
    }
  },
)
