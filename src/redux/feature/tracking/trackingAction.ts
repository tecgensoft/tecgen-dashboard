import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../utils/localStorage/local.auth';

const backendURL = import.meta.env.VITE_API_URL
export const tracking = createAsyncThunk<any, any, { rejectValue: string }>(
  'tracking',
  async (
    formData: { bookingType:string; bookingDays: string; reference: string },
    { rejectWithValue },
  ) => {
    try {
      const { bookingType ,bookingDays, reference } = formData      
      const resp = await fetch(
        `${backendURL}/bookings/track-booking-lots/?${bookingType}=${reference}&date=${bookingDays}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken('token')}`,
          },
        },
      )
      // if response is not ok then return error message
      if (!resp.ok) {
        const data = await resp.json()
        return rejectWithValue(`${data.message}`)
      }
      // response is ok than return data
      const response = await resp.json()
      return response.data
    } catch (error) {
      const castedError = error as any
      if (castedError.response && castedError.response.data?.details[0]) {
        return rejectWithValue(castedError.response.data?.details[0])
      }
      return rejectWithValue(castedError.message)
    }
  },
)
