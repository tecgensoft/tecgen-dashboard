/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { Button, FormControl } from '@mui/material'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  useGetCountriesQuery,
  useGetCountryCityByNumberCodeQuery,
  useGetCountryCityByReceiverNumberCodeQuery,
  useGetExistingCustomersQuery,
  useGetSingleBookingQuery,
} from '../../../../redux/feature/booking/bookingApi'
import {
  resetBooking,
  setEditData,
  setFormattedSenderReceiverInformation,
  setPhoneCodeWiseReceiverCountryState,
  setPhoneCodeWiseSenderCountryState,
  setPreferredCountries,
  setReceiverCountryCode,
  setReceiverCountryFlag,
  setReceiverInformation,
  setSenderCountryCode,
  setSenderCountryFlag,
  setSenderInformation
} from '../../../../redux/feature/booking/bookingSlice'
import { setStep } from '../../../../redux/feature/stepper/stepperSlice'
import { useAppSelector } from '../../../../redux/hook'
import {
  BOOKING_CREATE_ACTION,
  BOOKING_EDIT_ACTION,
} from '../../constant/action'
import validationSchema from '../validation/bookingValidationSchema'
import BasicInformation from './BasicInformation'
import LotDetailsPage from './LotDetailsPage'
import Payment from './Payment'

function _renderStepContent(step: number, formik: any, _handleBack: any) {
  switch (step) {
    case 0:
      return <BasicInformation formik={formik} />
    case 1:
      return <LotDetailsPage _handleBack={_handleBack} />
    case 2:
      return <Payment />
    default:
      return <div>Not Found</div>
  }
}
interface ICreateBooking {
  _handleSubmit: (
    values: any,
    actions: {
      setTouched: (arg0: {}) => void
      setSubmitting: (arg0: boolean) => void
    },
  ) => void

  _handleBack: () => void
}
export default function CreateBooking({
  _handleSubmit,
  _handleBack,
}: ICreateBooking) {
  const dispatch = useDispatch()
  const { state } = useLocation()

  const {
    editData,
    bookingAction,
    senderInformation,
    receiverInformation,
    senderId,
    senderCountryCode,
    receiverCountryCode,
  } = useAppSelector(state => state.booking)
  const { userInfo } = useAppSelector(state => state.auth)
  const { data: countries } = useGetCountriesQuery(undefined)
  const { data: countryCityData } = useGetCountryCityByNumberCodeQuery({
    numberCode: senderCountryCode,
  })
  const { data: receiverCountryData } =
    useGetCountryCityByReceiverNumberCodeQuery({
      numberCode: receiverCountryCode,
    })

  const { activeStep } = useAppSelector(state => state.stepper)

  const { data: senderReceiverData } = useGetExistingCustomersQuery(
    {
      searchInputValue: senderId,
    },
    { skip: senderId === null },
  )
  const { data: singleBookingData } = useGetSingleBookingQuery(
    {
      id: state?.id,
    },
    { skip: !state },
  )

  useEffect(() => {
    dispatch(setStep(0))
  }, [])

  // -------------------Initial State---------------------
  // get city data by sender and receiver country code (my=60 - bd=880)
  // after getting data we are set data into redux state
  // PhoneCodeWiseSenderCountryState (sender) state has states and city 
  // PhoneCodeWiseReceiverCountryState (receiver) state has states and city 
  useEffect(() => {
    // Set sender flag in redux state
    // dispatch(setSenderCountryCode(userInfo?.country_code))
    // dispatch(setSenderCountryFlag(userInfo?.short_name?.toLowerCase()))

    // // if user is bangladeshi then receiver flag will be malaysia
    // if(userInfo?.country_code === '880'){
    //   dispatch(setReceiverCountryCode(60))
    //   dispatch(setReceiverCountryFlag('my'))
    // }else{
    //   dispatch(setReceiverCountryCode(880))
    //   dispatch(setReceiverCountryFlag('bd'))
    // }

    dispatch(setPhoneCodeWiseSenderCountryState(countryCityData?.data))
    dispatch(setPhoneCodeWiseReceiverCountryState(receiverCountryData?.data))

  }, [countryCityData, receiverCountryData, dispatch])

  // console.log(countryCityData?.data)

  useEffect(() => {
    // Set sender flag in redux state
    dispatch(setSenderCountryCode(userInfo?.country_code))
    dispatch(setSenderCountryFlag(userInfo?.short_name?.toLowerCase()))
    
    if (userInfo?.country_code === '880') {
      dispatch(setReceiverCountryCode(60))
      dispatch(setReceiverCountryFlag('my'))
    } else {
      dispatch(setReceiverCountryCode(880))
      dispatch(setReceiverCountryFlag('bd'))
    }
  }, [dispatch, userInfo?.country_code ])
  useEffect(() => {
    if (countries?.data) {
      const preferredCountries = countries?.data?.map(
        (item: { short_name: string }) => item.short_name.toLowerCase(),
      )
      dispatch(setPreferredCountries(preferredCountries))
    }
  }, [countries])

  useEffect(() => {
    const bookingAction = localStorage.getItem('bookingAction')
    if (bookingAction === BOOKING_CREATE_ACTION) {
      dispatch(setEditData({}))
    }
    if (bookingAction === BOOKING_EDIT_ACTION) {
      dispatch(setEditData(singleBookingData?.data))
    }
  }, [bookingAction, singleBookingData])

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      const {
        sender_information,
        receiver_information,
        delivery_type,
        booking_type,
        reference,
      } = editData
      if (sender_information) {
        dispatch(setSenderInformation(sender_information))
      }
      // console.log(receiver_information)
      const newObj = {
        ...receiver_information,
        booking_type,
        delivery_type,
        reference,
      }
      if (receiver_information) {
        dispatch(setReceiverInformation(newObj))
      }
    } else if (senderReceiverData !== undefined) {
      const fetchData = () => {
        const data = senderReceiverData?.data
        if (data) {
          const { receiver_information, sender_information } = data

          if (sender_information && Object.keys(sender_information).length > 0) {
            dispatch(setSenderInformation(sender_information))
          }
          console.log(receiver_information)
          if (receiver_information && Object.keys(receiver_information).length > 0) {
            dispatch(setReceiverInformation(receiver_information))
          }
        }
      }
      fetchData()
    } else {
      dispatch(resetBooking())
    }
  }, [senderReceiverData, dispatch, editData])
  // console.log(senderInformation, receiverInformation)
  // console.log(senderInformation)
  return (
    <FormControl
      sx={{
        bgcolor: theme => (theme.palette.mode === 'dark' ? '' : '#fff'),
        width: '100%',
        height: '100%',
        px: '16px',
        py: '32px',
        borderRadius: '16px',
      }}
    >
      <Formik
        initialValues={{ ...senderInformation, ...receiverInformation }}
        enableReinitialize
        validationSchema={validationSchema[activeStep]}
        onSubmit={values => {
          dispatch(setFormattedSenderReceiverInformation(values))
          const newStep = activeStep + 1
          dispatch(setStep(newStep))
          _handleSubmit
        }}
      >
        {formik => {
          return (
            <Form id={'formId'}>
              {_renderStepContent(activeStep, formik, _handleBack)}
              <div>
                {activeStep !== 0 ? null : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '28px',
                    }}
                  >
                    <Button
                      // disabled={formik.isSubmitting}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        padding: '0px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        height: '38px',
                        margin: '2px 0',
                        // width: isSmallScreen ? '100%' : 'auto',
                        textTransform: 'capitalize',
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormControl>
  )
}
