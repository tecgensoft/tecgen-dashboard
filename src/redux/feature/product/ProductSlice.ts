import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISelect {
  selectAction:string,
  selectLocationAction:string
}
const initialState: ISelect= {
  selectAction: '',
  selectLocationAction:""
}

const productSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
   setSelectAction: (state, action: PayloadAction<string>) => {
      state.selectAction = action.payload
    },
   setLocationAction: (state, action: PayloadAction<string>) => {
      state. selectLocationAction = action.payload
    },
  },
})

export const {  setSelectAction, setLocationAction} = productSlice.actions
export default productSlice.reducer
