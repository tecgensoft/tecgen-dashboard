import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISelect {
  selectDownloadType: string
}
const initialState: ISelect = {
  selectDownloadType: '',
}

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    setSelectDownloadType: (state, action: PayloadAction<string>) => {
      state.selectDownloadType = action.payload
    },
  },
})

export const { setSelectDownloadType } = shipmentSlice.actions
export default shipmentSlice.reducer
