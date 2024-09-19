import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IFrom {
  from: string | boolean
  selectAction: string
  isBookingCreated: boolean
}
const initialState: IFrom = {
  from: true,
  selectAction: '',
  isBookingCreated: false,
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setFrom: (state, action: PayloadAction<string | boolean>) => {
      state.from = action.payload
    },
    setSelectAction: (state, action: PayloadAction<string>) => {
      state.selectAction = action.payload
    },
    setIsBookingCreated: (state, action: PayloadAction<boolean>) => {
      state.isBookingCreated = action.payload
    },
  },
})

export const { setFrom, setSelectAction, setIsBookingCreated } =
  paymentSlice.actions
export default paymentSlice.reducer
