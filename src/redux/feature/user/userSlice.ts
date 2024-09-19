import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IUserState {
  user: {
    email: string | null
  }
  isLoading: boolean
  isError: boolean
  error: string | null | undefined
  selectUserAction: string
}

// interface ICredential {
//   email: string
//   password: string
// }

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
  selectUserAction: ''
}

const userSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setSelectUserAction: (state, action: PayloadAction<string>) => {
      state.selectUserAction = action.payload
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(createUser.pending, state => {
  //       state.isLoading = true
  //       state.isError = false
  //       state.error = null
  //     })
  //     .addCase(createUser.fulfilled, (state, action) => {
  //       state.user.email = action.payload
  //       state.isLoading = false
  //       state.isError = true
  //     })
  //     .addCase(createUser.rejected, (state, action) => {
  //       state.user.email = null
  //       state.isLoading = false
  //       state.isError = true
  //       state.error = action.error.message
  //     })
  //     .addCase(loginUser.pending, state => {
  //       state.isLoading = true
  //       state.isError = false
  //       state.error = null
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.user.email = action.payload

  //       state.isError = false
  //       state.error = null
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.user.email = null
  //       state.isLoading = false
  //       state.isError = true
  //       state.error = action.error.message
  //     })
  // },
})

export const { setUser, setLoading, setSelectUserAction } = userSlice.actions

export default userSlice.reducer
