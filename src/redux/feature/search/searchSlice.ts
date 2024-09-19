import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IText {
  text:string
}
const initialState: IText= {
  text: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { setText} = searchSlice.actions
export default searchSlice.reducer
