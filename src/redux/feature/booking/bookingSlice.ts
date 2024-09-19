/* eslint-disable @typescript-eslint/ban-types */
import { PayloadAction } from '@reduxjs/toolkit'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { bookingLotStatus } from './bookingAction'

interface ICity {
  id: number
  name: string
}

interface IState {
  id: number
  name: string
  cities?: ICity[]
}

interface ICountry {
  id: number
  name: string
  states?: IState[]
}
// interface IUserInformation {
//   choose_area: string
//   choose_city: string
//   country: string
//   email: string
//   freight_category: string
//   name: string
//   phone: string
//   receiver_booking_type: string
//   receiver_choose_area: string
//   receiver_choose_city: string
//   receiver_country: string
//   receiver_delivery_type: string
//   receiver_email: string
//   receiver_name: string
//   receiver_phone: string
//   reference: string
// }

// interface IInitialState {
//   user: {
//     email: string | null
//   }
//   isLoading: boolean
//   isError: boolean
//   error: string | null
//   preferredCountries: string[]
//   senderId: string | null
//   senderCountryCode: string | number
//   senderCountryFlag: string
//   receiverCountryCode: number | string
//   receiverCountryFlag: string
//   phoneCodeWiseSenderCountryState: ICountry | null
//   phoneCodeWiseReceiverCountryState: ICountry | null
//   // userInformation: IUserInformation
//   senderInformation: any
//   receiverInformation: any,
//   formattedSenderReceiverInformation: any,
// }
const sender = {
  id: null,
  choose_area: '',
  choose_city: '',
  country: {
    id: null,
    name: '',
  },
  email: '',
  freight_category: 'AIR_FREIGHT',
  name: '',
  phone: '',
}
const receiver = {
  receiver_id: null,
  receiver_booking_type: '',
  receiver_choose_area: '',
  receiver_choose_city: '',
  receiver_country: {
    id: null,
    name: '',
  },
  receiver_delivery_type: '',
  receiver_email: '',
  receiver_name: '',
  receiver_phone: '',
  reference: '',
  road_no: '',
  house_no: '',
  others: '',
}
const initialState: any = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
  preferredCountries: ['bd', 'cn', 'my', 'ae'],
  senderId: null,
  senderCountryFlag: '',
  senderCountryCode: null,
  receiverCountryCode: null,
  receiverCountryFlag: '',
  phoneCodeWiseSenderCountryState: null,
  phoneCodeWiseReceiverCountryState: null,
  senderInformation: sender,
  receiverInformation: receiver,
  formattedSenderReceiverInformation: {},
  bookingLotStatus: {},
  editData: {},
  bookingAction: null,
}

const bookingSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    resetBooking: state => {
      state.senderInformation = initialState.senderInformation
      state.receiverInformation = {
        ...initialState.receiverInformation,
        road_no: '',
        house_no: '',
        others: '',
      }
      state.formattedSenderReceiverInformation =
        initialState.formattedSenderReceiverInformation
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setPreferredCountries: (state, action: PayloadAction<any[]>) => {
      state.preferredCountries = action.payload
    },
    setSenderCountryCode: (state, action: PayloadAction<number>) => {
      state.senderCountryCode = action.payload
    },
    setSenderCountryFlag: (state, action: PayloadAction<number>) => {
      state.senderCountryFlag = action.payload
    },
    setReceiverCountryCode: (state, action: PayloadAction<number>) => {
      state.receiverCountryCode = action.payload
    },
    setReceiverCountryFlag: (state, action: PayloadAction<string>) => {
      state.receiverCountryFlag = action.payload
    },
    setPhoneCodeWiseSenderCountryState: (
      state,
      action: PayloadAction<ICountry>,
    ) => {
      state.phoneCodeWiseSenderCountryState = action.payload
    },
    setPhoneCodeWiseReceiverCountryState: (
      state,
      action: PayloadAction<ICountry>,
    ) => {
      state.phoneCodeWiseReceiverCountryState = action.payload
    },
    setSenderId: (state, action: PayloadAction<string | null>) => {
      state.senderId = action.payload
    },
    setEditData: (state, action: PayloadAction<{}>) => {
      state.editData = action.payload
    },
    setSenderInformation: (state, action: PayloadAction<any>) => {
      const {
        id,
        name,
        phone,
        freight_category,
        email,
        country,
        state: states,
        city,
      } = action.payload

      state.senderInformation = {
        ...state.senderInformation,
        id: id,
        name: name,
        phone: phone,
        email: email,
        freight_category: freight_category,
        country: country,
        choose_city: states?.id,
        choose_area: city?.id,
      }
    },
    setReceiverInformation: (state, action: PayloadAction<any>) => {
      const {
        id,
        name,
        phone,
        freight_category,
        email,
        country,
        state: states,
        city,
        booking_type,
        delivery_type,
        location,
        reference,
      } = action.payload
      state.receiverInformation = {
        ...state.receiverInformation,
        receiver_id: id,
        receiver_name: name,
        receiver_phone: phone,
        freight_category: freight_category,
        receiver_email: email,
        receiver_country: country,
        receiver_choose_area: city?.id,
        receiver_choose_city: states?.id,
        receiver_delivery_type: delivery_type ?? '',
        receiver_booking_type: booking_type ?? '',
        road_no: location?.road ?? '',
        house_no: location?.house ?? '',
        others: location?.others ?? '',
        reference: reference,
      }
    },
    setFormattedSenderReceiverInformation: (
      state,
      action: PayloadAction<null>,
    ) => {
      state.formattedSenderReceiverInformation = action.payload
    },
    setBookingAction: (state, action: PayloadAction<null | string>) => {
      state.bookingAction = action.payload
    },
  },

  extraReducers: builder => {
    builder
      .addCase(bookingLotStatus.pending, state => {
        state.isLoading = true
        state.isError = false
        state.error = null
      })
      .addCase(bookingLotStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.bookingLotStatus = action.payload
      })
      .addCase(bookingLotStatus.rejected, (state, action) => {
        state.bookingLotStatus = {}
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
  },
})

export const {
  resetBooking,
  setUser,
  setLoading,
  setPreferredCountries,
  setSenderId,
  setSenderCountryCode,
  setSenderCountryFlag,
  setReceiverCountryCode,
  setReceiverCountryFlag,
  setPhoneCodeWiseSenderCountryState,
  setPhoneCodeWiseReceiverCountryState,
  setSenderInformation,
  setReceiverInformation,
  setBookingAction,
  setFormattedSenderReceiverInformation,
  setEditData,
} = bookingSlice.actions

export default bookingSlice.reducer
