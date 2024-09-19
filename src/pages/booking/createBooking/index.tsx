/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux'
import { setStep } from '../../../redux/feature/stepper/stepperSlice'
import { useAppSelector } from '../../../redux/hook'
import BookingStepper from '../_component/Stepper'
import { steps } from '../constant/stepper'
import CreateBooking from './_component/CreateBooking'
import './style.css'

export default function CreateForm() {
  const dispatch = useDispatch()

  const { activeStep } = useAppSelector(state => state.stepper)
  
  // const { senderCountryCode, receiverCountryCode } = useAppSelector(
  //   state => state.booking,
  // )
  // const { data: countries } = useGetCountriesQuery(undefined)
  // const { data: countryCityData,  } = useGetCountryCityByNumberCodeQuery({
  //   numberCode: senderCountryCode,
  // })

  // const { data: receiverCountryData } =
  //   useGetCountryCityByReceiverNumberCodeQuery({
  //     numberCode: receiverCountryCode,
  //   })


  // countries store in redux state
  // useEffect(() => {
  //   if (countries?.data) {
  //     const preferredCountries = countries?.data?.map(
  //       (item: { short_name: string }) => item.short_name.toLowerCase(),
  //     )
  //     dispatch(setPreferredCountries(preferredCountries))
  //   }
  // }, [countries])

  // useEffect(() => {
  //   dispatch(setPhoneCodeWiseSenderCountryState(countryCityData?.data))
  //   dispatch(setPhoneCodeWiseReceiverCountryState(receiverCountryData?.data))
  // }, [countryCityData, receiverCountryData])

  // handle function for got back
  function _handleBack() {
    const newStep = activeStep - 1
    dispatch(setStep(newStep))
  }
  async function _submitForm(

    actions: { setSubmitting: (arg0: boolean) => void },
  ) {

    actions.setSubmitting(false)
    // const newStep = activeStep + 1
    // dispatch(setStep(newStep))
  }

  function _handleSubmit(

    actions: {
      setTouched: (arg0: {}) => void
      setSubmitting: (arg0: boolean) => void
    },
  ) {
    if (activeStep === steps.length - 1) {
      _submitForm( actions)
    } else {
      const newStep = activeStep + 1
      dispatch(setStep(newStep))
      actions.setTouched({})
      actions.setSubmitting(false)
      
    }
  }
  // console.log(phoneCodeWiseSenderCountryState)
  return (
    <div>
      {activeStep < 2 && <BookingStepper />}
      <CreateBooking
        // currentValidationSchema={currentValidationSchema}
        _handleSubmit={_handleSubmit}
        _handleBack={_handleBack}
      />
    </div>
  )
}
