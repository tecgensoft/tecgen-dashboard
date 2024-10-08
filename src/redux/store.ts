/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
  configureStore
} from '@reduxjs/toolkit'

import { CombinedState } from '@reduxjs/toolkit/query'

import { api } from './api/apiSlice'
import authReducer, { IInitialState } from './feature/auth/authSlice'
import notificationReducer, {
  INotification,
} from './feature/notification/notificationSlice'
import openSlice from './feature/open/openSlice'
import stepperReducer from './feature/stepper/stepperSlice'
import themeReducer, { ITheme } from './feature/theme/themeSlice'


const token = localStorage.getItem('access');
const refresh = localStorage.getItem('refresh');
const userinfo = JSON.parse(localStorage.getItem('userinfo') || '{}');

const preloadedAuthState: IInitialState = {
  loading: false,
  error: null,
  message: null,
  success: false,
  token: token || null,
  refresh: refresh || null,
  userInfo: {
    email: userinfo.email || null,
    username: userinfo.username || null,
  },
};


const store: EnhancedStore<
  {
    api: CombinedState<{}, never, 'api'>
    auth: IInitialState
    theme: ITheme
    notification: any
    stepper: any
    open: any
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
            notification: INotification
            stepper: any
            open: any
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
    notification: notificationReducer,
    stepper: stepperReducer,
    open: openSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
    preloadedState:{
      auth: preloadedAuthState
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
