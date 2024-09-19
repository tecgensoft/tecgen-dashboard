import { createSlice } from '@reduxjs/toolkit';
import { tracking } from './trackingAction';

export interface IInitialState {
  loading: boolean
  error: string | null
  success: boolean
  tracking: any
}

const initialState: IInitialState = {
  loading: false,
  error: null,
  success: false,
  tracking: null
}
const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(tracking.pending, state => {
      state.loading = true
      state.error= null
      state.success= false
    })
    builder.addCase(tracking.fulfilled, (state, { payload }) => {      
      state.loading = false
      state.success = true
      state.error= null
      state.tracking = payload
    })
    builder.addCase(tracking.rejected, (state, {payload}) => {
      state.loading = false
      state.success = false
      state.error = payload as string | null
      state.tracking = null
    })
  },
})

// export const {  } = trackingSlice.actions
export default trackingSlice.reducer



