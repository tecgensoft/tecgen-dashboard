
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IOpen {
  open: boolean
}
const initialState: IOpen = {
  open: false
}

const openSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  },
})

export const { setOpen } = openSlice.actions
export default openSlice.reducer
