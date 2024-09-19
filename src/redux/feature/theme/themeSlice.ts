import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ITheme {
  themeMood: boolean
}
const initialState: ITheme = {
  themeMood: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMood: (state, action: PayloadAction<boolean>) => {
      state.themeMood = action.payload
    },
  },
})

export const { setThemeMood } = themeSlice.actions
export default themeSlice.reducer
