
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IOpen {
  open: boolean;
  type: string;
}
const initialState: IOpen = {
  open: false,
  type: ''
}

const openSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
  },
})

export const { setOpen, setType } = openSlice.actions
export default openSlice.reducer
