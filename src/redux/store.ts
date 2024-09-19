/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
  configureStore,
} from '@reduxjs/toolkit'

import { CombinedState } from '@reduxjs/toolkit/query'
import { getUserData } from '../utils/getUser'
import { api } from './api/apiSlice'
import authReducer, { IInitialState } from './feature/auth/authSlice'
import userReducer from './feature/user/userSlice'
import bookingReducer from './feature/booking/bookingSlice'
import branchReducer from './feature/brances/branchesSlice'
import notificationReducer, {
  INotification,
} from './feature/notification/notificationSlice'
import expenseReducer from './feature/officeExpense/officeExpenseSlice'
import paymentReducer from "./feature/payment/paymentSlice"
import printReducer from './feature/print/printSlice'
import selectReducer from "./feature/product/ProductSlice"
import rolePermissionsReducer from "./feature/role/roleSlice"
import searchReducer, { IText } from './feature/search/searchSlice'
import shipmentReducer from './feature/shipment/shipmentSlice'
import stepperReducer from "./feature/stepper/stepperSlice"
import themeReducer, { ITheme } from './feature/theme/themeSlice'
import trackingReducer from './feature/tracking/trackingSlice'
const token = localStorage.getItem('token')

const initialState: IInitialState = {
  loading: false,
  userInfo: getUserData(token),
  userToken: token,
  error: null,
  success: false,
}

const store: EnhancedStore<
  {
    search: any
    api: CombinedState<{}, never, 'api'>
    auth: IInitialState
    theme: ITheme
    print: any
    booking: any
    notification: any
    payment: any
    stepper: any
    select: any
    tracking: any
    expense: any
    shipment: any
    rolePermissions: any
    branch: branch
    user: any
  },

  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          {
            api: CombinedState<{}, never, 'api'>
            auth: IInitialState
            theme: ITheme
            print: any
            search: IText
            notification: INotification
            payment: any
            stepper: any
            select: any
            tracking: any
            expense: any
            shipment: any
            rolePermissions: role
            branch: branch
            user:any
          },
          undefined,
          UnknownAction
        >
      }>,
      StoreEnhancer,
    ]
  >
> = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer,
    print: printReducer,
    search: searchReducer,
    booking: bookingReducer,
    notification: notificationReducer,
    payment: paymentReducer,
    stepper: stepperReducer,
    select: selectReducer,
    tracking: trackingReducer,
    expense: expenseReducer,
    shipment: shipmentReducer,
    rolePermissions: rolePermissionsReducer,
    branch: branchReducer,
    user: userReducer
  },
  preloadedState: {
    auth: initialState,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
