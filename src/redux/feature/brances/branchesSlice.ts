import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISelect {

  selectBranchesAction: string
}
const initialState: ISelect = {
  selectBranchesAction: ''
}

const branchesSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectBranchesAction: (state, action: PayloadAction<string>) => {
      state.selectBranchesAction = action.payload
    },

  },
})

export const { setSelectBranchesAction } = branchesSlice.actions
export default branchesSlice.reducer
