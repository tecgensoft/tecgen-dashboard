/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AutoCompleteField } from '../../../../components/AutoCompleteField'
import { CommonInput } from '../../../../components/CommonInput'
import Loader from '../../../../components/Loader'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import {
  DANGER,
  SUCCESS,
} from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import {
  useCreatePaymentMutation,
  useGetAllBookingsForPaymentQuery,
  useGetSinglePaymentInfoQuery,
  useLazyGetConversionRateQuery,
} from '../../../../redux/feature/payment/paymentApi'
import { setStep } from '../../../../redux/feature/stepper/stepperSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import useDebounce from '../../../../utils/useDebounce'
import BookingStepper from '../../_component/Stepper'
const InputFieldComponent = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px',
      // backgroundColor: mode === 'dark' ? '#464646' : 'white',
      // borderRadius: '8px',
      //  background:"white"
    },
    '&& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px',
      // backgroundColor: mode === 'dark' ? '#464646' : 'white',
      // borderRadius: '8px',
      //  background:"white"
    },
    '&& .css-ielwcm-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled': {
      background: '#d9e2e7',
    },
    '&& .css-156qfe7-MuiFormControl-root-MuiTextField-root': {
      width: '100%',
    },
  }
})

const SelectFieldComponent = styled(Select)(({ theme }) => {
  // const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        background: theme.palette.mode === 'dark' ? '#464646' : 'white',
        // height: '30px',
        padding: '11px',
      },
    '&& .css-g44l6-MuiAutocomplete-root .MuiOutlinedInput-root': {
      padding: '0px',
    },
    '&& .css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        padding: '10px',
      },
  }
})
export default function Payment() {
  const [getConversionRate] = useLazyGetConversionRateQuery()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  // const { id } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [newId, setNewId] = useState(undefined)
  // const { from } = useAppSelector(state => state.payment)
  const location = useLocation()
  const [currency, setCurrency] = useState({
    currencyCode: '',
    currencyRate: null,
  })
  const { id, from } = location.state || {}
  // if (!id) {
  //   // Redirect or handle missing state
  //   navigate('/error', { replace: true })
  //   return null
  // }

  const {
    data,
    refetch,
    isError,
    error: siE,
  } = useGetSinglePaymentInfoQuery(
    {
      id: id ? id : newId,
      from,
    },
    { skip: !(id || newId) },
  )
  // const { data } = useGetSingleBookingQuery({
  //   id: id !== 'undefined' ? id : newId,
  //   from,
  // })
  const [createPayment, { isLoading }] = useCreatePaymentMutation()

  const { data: searchedBooking } = useGetAllBookingsForPaymentQuery(
    {
      search: debouncedSearchTerm,
    },
    { skip: !debouncedSearchTerm },
  )
  // console.log(data)
  const [formValues, setFormValues] = useState({
    booking: '',
    local_currency_amount: '',
    local_currency_code: '',
    payment_method: '',
    transaction_note: '',
    note: '',
  })

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [error, setError] = useState('')
  const [options, setOptions] = useState([])
  const [paymentError, setPaymentError] = useState('')
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [transactionNoteError, setTransactionNoteError] = useState('')
  const [noteError, setNoteError] = useState('')
  const [amountError, setAmountError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState({})
  const loc = useLocation()
  // const [currency, setCurrency] = useState({
  //   currencyCode: '',
  //   currencyRate: null,
  // })
  const { isBookingCreated } = useAppSelector(state => state.payment)
  function hackBackButton() {
    location.href = loc?.state?.from
      ? loc?.state?.from
      : '/payment/payment_history'
  }
  // useEffect(() => {
  //   if ((!data && newId) || (!data && id)) {
  //     refetch()
  //   }
  // }, [data, newId, refetch])

  useEffect(() => {
    if (!data && (newId || id)) {
      refetch()
    }
  }, [data, newId, refetch])

  useEffect(() => {
    if (isError) {
      // dispatch(setOpen(true))
      // dispatch(setMessage(`${siE?.data?.message}Please reload the page. `))
    }
  }, [isError])
  useEffect(() => {
    addEventListener('popstate', () => {
      history.back = hackBackButton()
    })
  }, [])
  useEffect(() => {
    setOptions(searchedBooking)
  }, [searchedBooking])

  const handleAutocompleteChange = (event, value) => {
    setSelectedProduct(value)
    setNewId(value?.value)
  }
  useEffect(() => {
    dispatch(setStep(2))
  }, [])
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })

    if (name === 'local_currency_amount') {
      if (Number(value) !== Number(currency.currencyRate)) {
        setAmountError('Paying amount should be equal to Total Amount To Pay')
        setIsSubmitDisabled(true)
      } else {
        setAmountError('')
        setIsSubmitDisabled(false)
      }
    }

    if (name === 'payment_method') {
      if (!value) {
        setPaymentError('This field is required')
        setIsSubmitDisabled(true)
      } else {
        setPaymentError('')
        if (
          Number(formValues.local_currency_amount) ===
          Number(data?.data?.total_local_amount)
        ) {
          setIsSubmitDisabled(false)
        }
      }
    }

    if (name === 'transaction_note') {
      if (
        (formValues.payment_method === 'BANK' ||
          formValues.payment_method === 'BDT') &&
        !value
      ) {
        setTransactionNoteError(
          'Transaction Reference Number is required for Bank Transfer or BDT',
        )
      } else {
        setTransactionNoteError('')
      }
    }

    // Note validation for BDT
    if (name === 'note') {
      if (formValues.payment_method === 'BDT' && !value) {
        setNoteError('Note is required ')
      } else {
        setNoteError('')
      }
    }
  }
  function currencyConversion() {
    if (data) {
      // console.log(data.data)
      const { local_currency_code, cost_in_local_amount } = data?.data
      if (formValues.payment_method === 'BDT') {
        getConversionRate({
          local_currency_code: local_currency_code,
          cost_in_local_amount: cost_in_local_amount,
          to_currency_code: 'BDT',
        })
          .unwrap()
          .then(res => {
            const { amount, currency_code } = res?.data
            // console.log(amount, currency_code)
            setCurrency(prev => ({
              ...prev,
              currencyCode: currency_code,
              currencyRate: amount,
            }))
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        setCurrency(prev => ({
          ...prev,
          currencyCode: local_currency_code,
          currencyRate: cost_in_local_amount,
        }))
      }
    }
  }
  useEffect(() => {
    currencyConversion()
  }, [data, formValues.payment_method])

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (!formValues.payment_method) {
      setPaymentError('This field is required')
      return
    }

    if (
      Number(formValues.local_currency_amount) !== Number(currency.currencyRate)
    ) {
      setPaymentError('Paying amount should be equal to Total Amount To Pay')
      return
    }

    if (
      (formValues.payment_method === 'BANK' ||
        formValues.payment_method === 'BDT') &&
      !formValues.transaction_note
    ) {
      setTransactionNoteError('Transaction Note is required ')
      return
    } else {
      setTransactionNoteError('')
    }
    if (formValues.payment_method === 'BDT' && !formValues.note) {
      setNoteError('Note is required ')
      return
    } else {
      setNoteError('')
    }
    const newData = {
      booking: id ? id : newId,
      local_currency_code: data?.data?.local_currency_code,
      local_currency_amount: formValues?.local_currency_amount,
      payment_method: formValues?.payment_method,

      payment_status: 'SUCCESS',
    }
    if (
      formValues?.transaction_note &&
      (formValues.payment_method === 'BANK' ||
        formValues.payment_method === 'BDT')
    ) {
      newData.transaction_note = formValues?.transaction_note
    }
    if (formValues?.note && formValues.payment_method === 'BDT') {
      newData.note = formValues?.note
    }
    await createPayment(newData).then(data => {
      if (data?.data?.success) {
        navigate('/booking')
        dispatch(
          setNotification({
            open: true,
            message: 'Booking created Successfully',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))

        // dispatch(setMessage('Booking created Successfully'))
      }
      if (data?.error) {
        // dispatch(setOpen(true))
        dispatch(
          setNotification({
            open: true,
            message: 'Something went wrong',
            // message: data?.error?.data?.message,
            type: DANGER,
          }),
        )

        // dispatch(setMessage(data?.error?.data?.message))
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BookingStepper />
          <Box
            sx={{
              bgcolor:
                theme?.palette.mode === 'dark'
                  ? 'rgba(32, 32, 32, 1)'
                  : 'white',
              borderRadius: '8px',
              minHeight: 'auto',
              padding: '24px',
            }}
          >
            <Box
              sx={{
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(67, 67, 67, 1)' : 'rgba(239, 243, 244, 1)'}`,
                borderRadius: '16px',
                padding: isSmallScreen
                  ? '30px 10px'
                  : isMediumScreen
                    ? '40px'
                    : '78px 144px',
                margin: '24px 0',
              }}
            >
              {/* <form onSubmit={handleSubmit}> */}
              <Grid
                container
                spacing={4}
                // sx={{
                //   display: 'grid',
                //   gridTemplateColumns: '1fr 1fr',
                //   gap: '24px',
                // }}
              >
                <Grid item md={12} lg={6}>
                  {from !== undefined ? (
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <FormLabel>Booking Number</FormLabel>
                      <CommonInput
                        name="bookingNumber"
                        fullWidth
                        margin="normal"
                        value={data?.data?.reference}
                        disabled
                        onChange={handleChange}
                      />
                    </FormControl>
                  ) : (
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel
                        sx={{
                          color: 'rgba(14, 20, 31, 1)',
                        }}
                      >
                        {' '}
                        <span
                          style={{
                            fontSize: '12px',
                            color:
                              theme?.palette?.mode === 'dark'
                                ? '#979ba7'
                                : 'black',
                          }}
                        >
                          Booking Number
                        </span>{' '}
                        <span
                          style={{
                            color:
                              theme?.palette?.mode === 'dark'
                                ? '#979ba7'
                                : theme.palette.secondary.main,
                          }}
                        >
                          *
                        </span>
                      </FormLabel>
                      <AutoCompleteField
                        className="autoField"
                        options={options || []}
                        getOptionLabel={option => option.label || ''}
                        // sx={{ height: '36px', marginBottom: '18px' }}
                        sx={{
                          '&&.css-1of9vxa-MuiFormControl-root-MuiTextField-root':
                            {
                              width: '100%',
                            },

                          // "&& .css-156qfe7-MuiFormControl-root-MuiTextField-root":{
                          //   padding:0
                          // }
                        }}
                        // }}
                        onChange={handleAutocompleteChange}
                        value={selectedProduct}
                        // disabled={disabled}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="Search for Booking Number"
                            variant="outlined"
                            onChange={e => setSearchTerm(e?.target?.value)}
                            sx={{
                              '&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
                                {
                                  padding: '5px',
                                  // width: '100%',
                                },
                              '&&.css-1of9vxa-MuiFormControl-root-MuiTextField-root':
                                {
                                  width: '100%',
                                },
                            }}
                          />
                        )}
                      />{' '}
                    </FormControl>
                  )}
                  <FormControl fullWidth sx={{ margin: '8px 0' }}>
                    <FormLabel style={{ fontSize: '10px' }}>
                      Sender Phone
                      <span
                        style={{
                          color:
                            theme?.palette?.mode === 'dark'
                              ? '#979ba7'
                              : theme.palette.secondary.main,
                        }}
                      >
                        *
                      </span>
                    </FormLabel>
                    <CommonInput
                      name="senderPhone"
                      fullWidth
                      margin="normal"
                      value={data?.data?.sender_information?.phone}
                      placeholder="Sender Phone"
                      disabled
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <FormLabel style={{ fontSize: '10px' }}>
                      Sender Name
                      <span
                        style={{
                          color:
                            theme?.palette?.mode === 'dark'
                              ? '#979ba7'
                              : theme.palette.secondary.main,
                        }}
                      >
                        *
                      </span>
                    </FormLabel>
                    <CommonInput
                      name="senderName"
                      fullWidth
                      margin="normal"
                      placeholder="Sender Name"
                      value={data?.data?.sender_information?.name}
                      onChange={handleChange}
                      disabled
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <FormLabel style={{ fontSize: '10px' }}>
                      {' '}
                      Choose Payment Option
                      <span
                        style={{
                          color:
                            theme?.palette?.mode === 'dark'
                              ? '#979ba7'
                              : theme.palette.secondary.main,
                        }}
                      >
                        *
                      </span>
                    </FormLabel>
                    <Select
                      name="payment_method"
                      value={formValues.payment_method || ''}
                      onChange={handleChange}
                      displayEmpty
                      sx={{ height: '40px' }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select an option</em>
                      </MenuItem>
                      <MenuItem value="CASH">Cash</MenuItem>
                      <MenuItem value="BANK">Bank Transfer</MenuItem>
                      <MenuItem value="BDT">BDT</MenuItem>
                    </Select>
                    {paymentError && (
                      <Typography variant="body2" color="error">
                        {paymentError}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={6}>
                  {formValues.payment_method === 'BANK' ||
                  formValues.payment_method === 'BDT' ? (
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <FormLabel>Transaction Reference Number *</FormLabel>
                      <CommonInput
                        name="transaction_note"
                        placeholder="Transaction Reference Number"
                        value={formValues.transaction_note}
                        onChange={handleChange}
                      />
                      {transactionNoteError && (
                        <Typography color="error">
                          {transactionNoteError}
                        </Typography>
                      )}
                    </FormControl>
                  ) : null}

                  {formValues.payment_method === 'BDT' ? (
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <FormLabel>Note *</FormLabel>
                      <CommonInput
                        name="note"
                        placeholder="Note"
                        value={formValues.note}
                        onChange={handleChange}
                      />
                      {noteError && (
                        <Typography color="error">{noteError}</Typography>
                      )}
                    </FormControl>
                  ) : null}
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <FormLabel style={{ fontSize: '10px' }}>
                      Total Amount To Pay
                      <span
                        style={{
                          color:
                            theme?.palette?.mode === 'dark'
                              ? '#979ba7'
                              : theme.palette.secondary.main,
                        }}
                      >
                        *
                      </span>
                    </FormLabel>
                    <CommonInput
                      name="totalAmount"
                      fullWidth
                      margin="normal"
                      value={
                        // `${currency.currencyCode} ${currency.currencyRate} `
                        // data?.data?.local_currency_code
                        //   ? `${data?.data?.local_currency_code} ${data?.data?.total_local_amount}`
                        //   : 0
                        `${
                          currency.currencyRate === null
                            ? 0
                            : `${
                                currency?.currencyCode +
                                ' ' +
                                currency.currencyRate
                              }`
                        } `
                      }
                      onChange={handleChange}
                      disabled
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <FormLabel style={{ fontSize: '10px' }}>
                      Paying Amount
                      <span
                        style={{
                          color:
                            theme?.palette?.mode === 'dark'
                              ? '#979ba7'
                              : theme.palette.secondary.main,
                        }}
                      >
                        *
                      </span>
                    </FormLabel>
                    <CommonInput
                      name="local_currency_amount"
                      fullWidth
                      margin="normal"
                      placeholder="Enter amount"
                      onChange={handleChange}
                      error={!!error}
                      helperText={error}
                    />
                    {amountError && (
                      <Typography color="error">{amountError}</Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}
              >
                {' '}
                <Button
                  variant="contained"
                  onClick={() => navigate('/booking')}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                    },
                    padding: '0px 16px',
                    borderRadius: '8px',
                    width: isSmallScreen ? '100%' : 'auto',
                    height: '38px',
                    margin: '0 4px',

                    textTransform: 'capitalize',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  sx={{
                    padding: '0px 16px',
                    borderRadius: '8px',
                    width: isSmallScreen ? '100%' : 'auto',
                    height: '38px',
                    margin: '0 4px',

                    textTransform: 'capitalize',
                  }}
                >
                  Submit
                </Button>
              </Box>
              {/* </form> */}
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
