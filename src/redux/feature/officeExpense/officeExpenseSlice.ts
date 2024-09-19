import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export interface IExpenseCategory {
  expenseCategory: []
}

const initialState:IExpenseCategory= {
  expenseCategory: [],
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenseCategory: (state, action: PayloadAction<[]>) => {
      state.expenseCategory = action.payload
    },
  },
})

export const { setExpenseCategory} = expenseSlice.actions
export default expenseSlice.reducer
