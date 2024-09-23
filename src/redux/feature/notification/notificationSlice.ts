import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SUCCESS } from '../../../constant/constant'

export interface INotification {
  open: boolean
  message: string
  type: string
}

const initialState: INotification = {
  open: false,
  message: '',
  type: SUCCESS,
}

interface INotificationPayload {
  open?: boolean
  message?: string
  type?: string
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotificationPayload>) => {
      const { open, message, type } = action.payload
      if (open !== undefined) state.open = open
      if (message !== undefined) state.message = message
      if (type !== undefined) state.type = type
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
