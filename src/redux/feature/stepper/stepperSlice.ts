
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IStep {
  activeStep: number
}
const initialState: IStep = {
  activeStep: 0
}

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload
    },
  },
})

export const {  setStep } =stepperSlice.actions
export default stepperSlice.reducer
