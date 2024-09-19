/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import deleteImg from '../../../../assets/delete.png'
import deleteDarkImg from '../../../../assets/deleteDark.png'
import duplicateImg from '../../../../assets/duplicateImg.png'
import lotImg from '../../../../assets/lot.png'
import lotImgDark from '../../../../assets/lotImgDark.png'
import { AutoCompleteField } from '../../../../components/AutoCompleteField'
import TableLoader from '../../../../components/TableLoader'
import ConfirmDeleteModal from '../../../../components/modals/ConfirmDeleteModal'
import ConfirmDuplicationPopup from '../../../../components/modals/ConfirmDuplicationPopup '
import { useCreateBookingMutation } from '../../../../redux/feature/booking/bookingApi'
import { resetBooking } from '../../../../redux/feature/booking/bookingSlice'
import { useGetProductForLotQuery } from '../../../../redux/feature/lot/lotApi'
// import {
//   setMessage,
//   setNotification,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import {
  DANGER,
  SUCCESS,
  WARNING,
} from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import {
  setFrom,
  setIsBookingCreated,
} from '../../../../redux/feature/payment/paymentSlice'
import { setStep } from '../../../../redux/feature/stepper/stepperSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import useDebounce from '../../../../utils/useDebounce'
import {
  chargeInputData,
  lotGrossInputData,
  lotInputData,
} from '../../constant/lotData'
import {
  handleAddLot,
  handleAddProduct,
  handleCancel,
  handleChargeChange,
  handleDeleteLot,
  handleDeleteProduct,
  handleDuplicateLot,
  handleProductChange,
  handleProductCustomChange,
  handleProductGrossChange,
  handleToggle,
} from '../handler/lotManageHandler'
import {
  getError,
  getGrossError,
  initialError,
  validateAndSetErrors,
} from '../handler/lotValidationHandler'
import '../style.css'
import LotInputField from './LotInputField'

export default function LotDetailsPage({ _handleBack }: { _handleBack: any }) {
  const theme = useTheme()
  const [lots, setLots] = useState<any>([
    {
      id: Date.now(),
      open: true,
      products: [{ id: Date.now() }],
      lotNumber: 1,
    },
  ]) // First lot with one product expanded and lotNumber 1
  const [lotsAllData, setLotsAllData] = useState<any>({
    lots: lots,
    handlingCharge: 0,
    districtCharge: 0,
    packingCharge: 0,
    additionalCharge: 0,
    numberOfCarton: 1,
    discount: 0,
    totalLocalAmount: 0,
  })
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(0)
  const [showValue, setShowValue] = useState(false)
  const [lotDeleteModalOpen, setLotDeleteModalOpen] = useState(false)
  const [productDeleteModalOpen, setProductDeleteModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isValidate, setValidate] = useState(false)
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const initialErrorsState = lots?.map((lot: any) => initialError(lot))
  const [errorsState, setErrorsState] = useState(initialErrorsState)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [selectedLotId, setSelectedLotId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedLot, setSelectedLot] = useState(null)

  // const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [options, setOptions] = useState([])

  const [customs, setCustoms] = useState([{ pid: '', charge: 0, tWight: 0 }])

  // Call this function whenever your lots data changes
  const [createBooking, { isSuccess, isLoading, isError, error }] =
    useCreateBookingMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { editData } = useAppSelector(state => state.booking)

  const { activeStep } = useAppSelector(state => state.stepper)
  // S = Sender
  // R = Receiver

  const {
    formattedSenderReceiverInformation: formattedSRInfo,
    senderCountryCode,
    receiverCountryCode,
  } = useAppSelector(state => state.booking)

  const handleSubmit = async (payment: boolean | null) => {
    const validate = validateAndSetErrors(
      lots,
      initialErrorsState,
      setErrorsState,
    )
    if (validate) {
      const lots = lotsAllData?.lots?.map((lot: any, index: any) => {
        const Products = lot?.products?.map((product: any) => ({
          id: product?.productId,
          name: product?.Product,
          quantity: parseInt(product?.quantity),
          weight: Number(product?.weight),
          custom_charge: product?.customs || 0,
          discount: Number(product?.discount) || 0,
          sub_total: product?.subtotal || 0,
        }))
        return {
          number: parseInt(index + 1),
          product_list: Products,
          gross_weight: Number(lot?.grossWeight),
          gross_weight_price: Number(lot?.grossWeightPrice),
          volume_weight: Number(lot?.volumeWeight) || 0,
          volume_weight_price: Number(lot?.volumeWeightPrice) || 0,
          total_lot_amount: Number(lot?.lotTotalPrice) || 0,
        }
      })

      const {
        id,
        name,
        phone,
        freight_category,
        email,
        choose_area,
        choose_city_name,
        road_no,
        house_no,
        others,
        receiver_id,
        receiver_name,
        receiver_phone,
        receiver_email,
        receiver_choose_city,
        receiver_choose_area,
        receiver_booking_type,
        receiver_delivery_type,
        receiver_choose_city_name,
      } = formattedSRInfo

      const senderCountryId =
        (Object.keys(formattedSRInfo?.country).length !== 0 &&
          formattedSRInfo?.country?.id) ||
        formattedSRInfo.countryId

      const receiverCountryId =
        (Object.keys(formattedSRInfo?.receiver_country).length !== 0 &&
          formattedSRInfo?.receiver_country?.id) ||
        formattedSRInfo.receiver_countryId

      const newBooking: any = {
        booking_id: '',
        sender_information: {
          // id: '',
          name: name,
          phone: phone,
          freight_category: freight_category,
          email: email,
          country: senderCountryId,
          country_code: senderCountryCode,
          city: choose_area?.id || choose_area,
          state: choose_city_name,
        },
        receiver_information: {
          // id: receiver_id || null,
          name: receiver_name,
          phone: receiver_phone,
          freight_category: freight_category,
          email: receiver_email,
          country: receiverCountryId,
          country_code: receiverCountryCode,
          city: receiver_choose_area?.id || receiver_choose_area,
          state: receiver_choose_city?.name || receiver_choose_city_name,
          location: JSON.stringify({
            road: road_no,
            house: house_no,
            others: others,
          }),
        },
        booking_type: receiver_booking_type,
        delivery_type: receiver_delivery_type,
        comment: '',
        lot_list: lots,
        home_delivery_charge: 2 || 0,
        district_delivery_charge: Number(lotsAllData?.districtCharge) || 0,
        packing_charge: Number(lotsAllData?.packingCharge) || 0,
        additional_charge: Number(lotsAllData?.additionalCharge) || 0,
        total_local_amount: Number(lotsAllData?.totalLocalAmount) || 0,
        total_carton: lotsAllData?.numberOfCarton,
        discount: Number(lotsAllData?.discount) || 0,
        promo_code: [],
        device_id: '19f098e8-1434-423d-bad1-13eeb5f82427 ',
      }
      if (id) {
        newBooking.sender_information.id = id
      }
      if (receiver_id) {
        newBooking.receiver_information.id = receiver_id
      }
      await createBooking(newBooking).then(data => {
        if (data?.data?.success) {
          // dispatch(setSenderId(null))
          dispatch(setIsBookingCreated(true))
          if (!payment) {
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
          } else {
            dispatch(setFrom(true))
            const newStep = activeStep + 1
            dispatch(setStep(newStep))
            // navigate(`/booking/payment/${data?.data?.data?.id}`, {
            //   state: { from: location.pathname },
            // })

            dispatch(
              setNotification({
                open: true,
                message: 'Booking created Successfully',
                type: SUCCESS,
              }),
            )
            // dispatch(setOpen(true))
            // dispatch(setMessage('Booking created Successfully'))
            navigate(`/booking/payment`, {
              state: { id: data?.data?.data?.id, from: true },
            })
          }
        } else {
          dispatch(setMessage('Something went wrong!'))
        }
      })
    } else {
      return
    }
  }

  useEffect(() => {
    setLotsAllData({ ...lotsAllData, lots: lots })
  }, [lots])
  const handleAutocompleteChange = (
    event: SyntheticEvent<Element, Event>,
    value: any,
    productId: any,
    lotId: any,
  ) => {
    handleProductCustomChange(value, productId, lotId, setLots)
    getCustomCharge(productId, value)
  }
  const getCustomCharge = (pid: any, option: { custom_charge: any }) => {
    setCustoms([
      ...customs,
      {
        pid,
        charge: option?.custom_charge,
        tWight: 0,
      },
    ])
  }

  const setCustomGrossField = (lot: {
    products: any[]
    volumeWeightPrice: string
    volumeWeight: string
    grossWeight: string
    grossWeightPrice: string
    lotTotalPrice: any
  }) => {
    const sum_of_subtotal = lot?.products?.reduce(
      (accumulator: any, product: { subtotal: any }) =>
        accumulator + product?.subtotal,
      0,
    )
    let lot_total_price
    if (lot?.volumeWeightPrice && lot?.volumeWeight) {
      lot_total_price =
        sum_of_subtotal +
        Number(lot?.grossWeight) * Number(lot?.grossWeightPrice) +
        Number(lot?.volumeWeightPrice) * Number(lot?.volumeWeight)
    } else {
      lot_total_price =
        sum_of_subtotal +
          Number(lot?.grossWeight) * Number(lot?.grossWeightPrice) ||
        sum_of_subtotal + 0
    }
    // parseInt(lot?.grossWeight) * parseInt(lot?.grossWeightPrice) +
    // (lot?.volumeWeight ? parseInt(lot?.volumeWeight) : 0) *
    //   (lot?.volumeWeightPrice ? parseInt(lot?.volumeWeightPrice) : 0)
    lot.lotTotalPrice = Number(lot_total_price).toFixed(2)
    return Number(lot_total_price).toFixed(2)
  }
  const validateIndividualLot = (lotId: any) => {
    const findLot = lots?.find((lot: { id: any }) => lot?.id === lotId)
    const findValidate = findLot?.products?.every(
      (product: {}) =>
        Object.keys(product).includes('Product') &&
        Object.keys(product).includes('quantity') &&
        Object.keys(product).includes('weight'),
    )

    if (
      findValidate &&
      Object.keys(findLot).includes('grossWeight') &&
      Object.keys(findLot).includes('grossWeightPrice')
    ) {
      return false
    } else {
      return true
    }
    // //   if(){
    // return true
    //   }else{
    //     return false
    //   }
  }
  const bookingAction = localStorage.getItem('bookingAction')

  useEffect(() => {
    if (isError) {
      dispatch(
        setNotification({
          open: true,
          message: error?.data?.message,
          type: DANGER,
        }),
      )
      // dispatch(setOpen(true))
      // dispatch(setMessage(error?.data?.message))
    }
  })

  useEffect(() => {
    if (editData && bookingAction === 'edit') {
      setLoading(true)
      const newLotData = {
        ...lotsAllData,
        lots: editData?.lot_list?.map((lot, index) => {
          return {
            id: lot?.id,
            open: index > 0 ? false : true,
            lotNumber: lot?.number,
            lotTotalPrice: lot?.total_lot_amount,
            grossWeight: lot?.gross_weight,
            grossWeightPrice: lot?.gross_weight_price,
            volumeWeight: lot?.volume_weight,
            volumeWeightPrice: lot?.volume_weight_price,
            products: lot?.product_list?.map(product => {
              return {
                id: product?.id,
                subtotal: product?.sub_total,
                Product: product?.name,
                productId: product?.id,
                customs: product?.custom_charge,
                quantity: product?.quantity,
                weight: product?.weight,
                discount: product?.discount,
              }
            }),
          }
        }),
        handlingCharge: editData?.home_delivery_charge,
        districtCharge: editData?.district_delivery_charge,
        packingCharge: editData?.packing_charge,
        additionalCharge: editData?.additional_charge,
        numberOfCarton: editData?.total_carton,
        discount: editData?.discount,
        totalLocalAmount: editData?.total_local_amount,
      }
      setLotsAllData(newLotData)
      setLots(newLotData?.lots)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [editData, bookingAction])

  const { data } = useGetProductForLotQuery(
    {
      search: debouncedSearchTerm,
    },
    { skip: !debouncedSearchTerm },
  )

  useEffect(() => {
    if (data) {
      setOptions(data) // Handle setting options when data changes
    }
  }, [data, debouncedSearchTerm])
  console.log('OPTION', options, data)
  const handleProductName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchTerm(e.target.value)
    },
    [],
  )
  const setCustomField = (
    product: {
      quantity: string
      weight: string
      customs: number
      discount: string
      subtotal: any
    },
    name: string,
  ) => {
    let subtotal
    if (name === 'tWeight') {
      subtotal = parseInt(product?.quantity) * Number(product?.weight) || 0
      subtotal = parseFloat(subtotal.toFixed(2))
    }
    if (name === 'subtotal') {
      if (product?.customs && product?.discount) {
        subtotal =
          parseInt(product?.quantity) > 1
            ? product?.customs * parseInt(product?.quantity) -
              Number(product?.discount)
            : product?.customs - Number(product?.discount)
      }
      if (!product?.customs && !product?.discount) {
        subtotal = 0
      }
      if (
        (product?.customs && !product?.discount) ||
        (!product?.customs && product?.discount)
      ) {
        if (!product?.customs && product?.discount) {
          subtotal = -Number(product?.discount)
        } else {
          subtotal = Number(product?.quantity)
            ? product?.customs * Number(product?.quantity)
            : product?.customs
        }
      }
    }
    product.subtotal = subtotal
    return subtotal
  }
  const setCustomChargeField = (name: string) => {
    if (name === 'totalLocalAmount') {
      const sum_of_lotTotalPrice = lots.reduce(
        (accumulator: number, lot: { lotTotalPrice: string }) =>
          accumulator + Number(lot?.lotTotalPrice) || 0,
        0,
      )

      const localAmountPrice =
        sum_of_lotTotalPrice +
        Number(lotsAllData?.handlingCharge) +
        Number(lotsAllData?.districtCharge) +
        Number(lotsAllData?.packingCharge) +
        Number(lotsAllData?.additionalCharge) -
        Number(lotsAllData?.discount)
      lotsAllData.totalLocalAmount = Number(localAmountPrice)?.toFixed(2)
      return Number(localAmountPrice)?.toFixed(2)
    } else {
      const numOfCarton = lots?.length

      lots.numberOfCarton = numOfCarton

      return numOfCarton
    }
  }

  return (
    <>
      {isLoading || loading ? (
        <TableLoader />
      ) : (
        <Box
          className="lot"
          sx={{
            bgcolor:
              theme?.palette?.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : 'white',
            borderRadius: '8px',
            minHeight: 'auto',
            paddingBottom: '24px',
          }}
        >
          {/* back and create button */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              justifyContent: isSmallScreen ? 'center' : 'space-between',
              alignItems: 'center',
              padding: isSmallScreen ? '0px 0px ' : '27px 24px ',
            }}
          >
            <Button
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => _handleBack()}
              sx={{
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'transparent'
                    : 'rgba(239, 243, 244, 1)',
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : 'rgba(34, 78, 114, 1)',
                border:
                  theme.palette.mode === 'dark'
                    ? `1px, solid ${theme.palette.primary.main}`
                    : `1px, solid rgba(34, 78, 114, 1)`,

                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'transparent'
                      : 'rgba(239, 243, 244, 1)',
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : 'rgba(34, 78, 114, 1)',
                },

                cursor: 'pointer',
                padding: isSmallScreen ? '0 8px' : '0px 16px',
                borderRadius: '8px',
                height: '38px',
                margin: '2px 0',
                width: isSmallScreen ? '100%' : 'auto',
                textTransform: 'capitalize',
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                // Check if all the lots have `grossWeight`, `grossWeightPrice`
                const areLotsValid = lots.every(
                  lot =>
                    lot.grossWeight &&
                    lot.grossWeightPrice &&
                    lot.products.every(
                      product =>
                        product.quantity && product.Product && product.weight,
                    ),
                )

                if (areLotsValid) {
                  // If all conditions are met, proceed with adding the lot
                  handleAddLot(setLotDeleteModalOpen, lots, setLots)
                } else {
                  dispatch(
                    setNotification({
                      open: true,
                      message: 'Please complete all the required fields',
                      type: WARNING,
                    }),
                  )
                  // dispatch(setOpen(true))
                  // dispatch(
                  //   setMessage('Please complete all the required fields'),
                  // )
                }
              }}
              sx={{
                padding: '0px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                height: '38px',
                margin: '2px 0',
                width: isSmallScreen ? '100%' : 'auto',
                textTransform: 'capitalize',
              }}
            >
              Add Lot
            </Button>
          </Box>
          {/* lot form */}
          {lots?.map((lot: any) => {
            return (
              <Box
                key={lot.id}
                sx={{
                  marginTop: '0px',
                  padding: isSmallScreen ? '5px 0px' : '5px 24px',
                }}
              >
                {/* lot bar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: isSmallScreen ? '10px 8px' : '10px 16px',
                    borderRadius: '0px',

                    // cursor: 'pointer',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'rgba(53, 53, 53, 1)'
                        : 'rgba(217, 227, 231, 1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ConfirmDuplicationPopup
                      onConfirm={() =>
                        handleDuplicateLot(lot?.id, time, lots, setLots)
                      }
                      onCancel={() => handleCancel(setShowValue, showValue)}
                      setTime={setTime}
                      time={time}
                      disabled={validateIndividualLot(lot.id)}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // bgcolor:
                          //   theme.palette.mode === 'dark'
                          //     ? 'rgba(32, 32, 32, 1)'

                          //     : theme.palette.primary.main,
                          bgcolor: validateIndividualLot(lot?.id)
                            ? ' #94a3ab'
                            : theme.palette.mode === 'dark'
                              ? 'rgba(32, 32, 32, 1)'
                              : theme.palette.primary.main,
                          color: 'white',
                          height: '40px',
                          width: '40px',
                          borderRadius: '5px',
                          // margin: '2px',
                          cursor: validateIndividualLot(lot?.id)
                            ? 'not-allowed'
                            : 'pointer',
                        }}
                        // disabled={showValue }
                        onClick={() => {
                          if (!validateIndividualLot(lot?.id)) {
                            setSelectedLotId(lot.id)
                            setShowValue(!showValue)
                          }
                        }}
                        // onClick={() => handleDuplicateLot(lot.id)}
                      >
                        <img src={duplicateImg}></img>
                      </Box>
                    </ConfirmDuplicationPopup>

                    <Box
                      onClick={() => {
                        setSelectedLotId(lot.id)
                        setLotDeleteModalOpen(true)
                      }}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(32, 32, 32, 1)'
                            : theme.palette.secondary.main,
                        color: 'white',
                        height: '40px',
                        width: '40px',
                        borderRadius: '5px',
                        margin: '2px 8px',
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={
                          theme.palette.mode === 'dark'
                            ? deleteDarkImg
                            : deleteImg
                        }
                      ></img>
                    </Box>
                    <ConfirmDeleteModal
                      title={'Are you sure you want to delete this lot?'}
                      open={lotDeleteModalOpen}
                      onClose={() => setLotDeleteModalOpen(false)}
                      onConfirm={() =>
                        handleDeleteLot(
                          selectedLotId,
                          setLots,
                          setLotDeleteModalOpen,
                          dispatch,
                        )
                      }
                    />
                  </Box>
                  <Box
                    onClick={() => handleToggle(lot.id, setLots)}
                    sx={{
                      display: 'flex',

                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      width: '100%',

                      // marginLeft: '-350px',
                    }}
                  >
                    <img
                      src={theme.palette.mode === 'dark' ? lotImgDark : lotImg}
                      alt=""
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, marginLeft: '8px' }}
                    >
                      Lot {lots.indexOf(lot) + 1}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleToggle(lot.id, setLots)}>
                    {!lot.open ? <GridExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                </Box>
                {/* expand */}
                <Collapse in={lot.open}>
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(67, 67, 67, 1)' : 'rgba(239, 243, 244, 1)'}`,
                      borderRadius: '0px',
                      background:
                        theme.palette.mode === 'dark'
                          ? 'transparent'
                          : 'rgb(238, 243, 245,0.7)',
                      padding: isSmallScreen ? '36px 8px' : '36px 52px',
                    }}
                  >
                    {/* Add product button */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddProduct(lot?.id, setLots)}
                        sx={{
                          background:
                            theme.palette.mode === 'dark'
                              ? theme.palette.primary.main
                              : 'white',
                          '&:hover': {
                            background:
                              theme.palette.mode === 'dark'
                                ? theme.palette.primary.main
                                : 'white',
                            color:
                              theme.palette.mode === 'dark'
                                ? 'white'
                                : 'rgba(14, 20, 31, 1)',
                          },
                          border: `1px solid ${theme.palette.primary.main} `,
                          padding: '0px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          height: '38px',
                          color:
                            theme.palette.mode === 'dark'
                              ? 'white'
                              : 'rgba(14, 20, 31, 1)',
                          textTransform: 'capitalize',
                        }}
                      >
                        Add Product
                      </Button>
                    </Box>
                    {/* Add form */}

                    <Box sx={{ margin: '16px 0' }}>
                      {lot?.products?.map((product: any) => {
                        console.log(lot)
                        return (
                          <Box
                            key={product.id}
                            sx={{
                              background:
                                theme.palette.mode === 'dark'
                                  ? 'rgba(20, 20, 20, 1)'
                                  : 'rgba(217, 227, 231, 1)',
                              borderRadius: '16px',
                              padding: isSmallScreen ? '26px 8px' : '26px 10px',
                              marginTop: '16px',
                            }}
                          >
                            <Grid
                              container
                              spacing={2}
                              className="productName"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid
                                item
                                md={12}
                                lg="auto"
                                sx={{
                                  position: 'relative',
                                  marginBottom: '10px',
                                }}
                              >
                                <FormControl
                                  sx={{
                                    marginBottom: '2px',
                                  }}
                                >
                                  <FormLabel
                                    sx={{
                                      marginBottom: '8px',
                                      color:
                                        theme?.palette.mode === 'dark'
                                          ? 'white'
                                          : 'rgba(14, 20, 31, 1)',
                                    }}
                                  >
                                    {' '}
                                    <span style={{ fontSize: '12px' }}>
                                      Product Name
                                    </span>{' '}
                                    <span
                                      style={{
                                        color: 'red',
                                      }}
                                    >
                                      *
                                    </span>
                                  </FormLabel>
                                  <AutoCompleteField
                                    options={options || []}
                                    // sx={{ height: '36px' }}
                                    onChange={(e, value) =>
                                      handleAutocompleteChange(
                                        e,
                                        value,
                                        product.id,
                                        lot?.id,
                                      )
                                    }
                                    value={product?.Product}
                                    // getOptionLabel={option => option?.label}
                                    renderInput={params => (
                                      <TextField
                                        {...params}
                                        placeholder="Search"
                                        variant="outlined"
                                        onChange={e =>
                                          handleProductName(
                                            e,
                                            product?.id,
                                            lot?.id,
                                          )
                                        }
                                        value={product['Product']}
                                        sx={{
                                          minWidth: isSmallScreen
                                            ? '196px'
                                            : '250px',
                                          '& .css-i4bv87-MuiSvgIcon-root ': {
                                            background:
                                              theme.palette.mode === 'dark'
                                                ? 'black'
                                                : 'white ',
                                          },
                                        }}
                                      />
                                    )}
                                  />{' '}
                                </FormControl>

                                <Box sx={{ position: 'absolute' }}>
                                  {' '}
                                  {
                                    <small
                                      style={{
                                        fontSize: '10px',
                                        color: theme.palette.secondary.main,
                                      }}
                                    >
                                      {getError(
                                        lot?.id,
                                        product?.id,
                                        'Product',
                                        errorsState,
                                      )}
                                    </small>
                                  }
                                </Box>
                              </Grid>

                              <Grid
                                container
                                spacing={2}
                                md={12}
                                lg={9}
                                paddingLeft={2}
                                justifyContent="center"
                                alignItems="center"
                              >
                                {lotInputData.map(input => (
                                  <Grid
                                    key={input?.name}
                                    item
                                    sm={12}
                                    md={6}
                                    lg={2}
                                    style={{ marginBottom: '8px' }}
                                  >
                                    <LotInputField
                                      key={input?.key}
                                      type="number"
                                      disable={input?.disabled}
                                      variant="outlined"
                                      placeholder={`0`}
                                      handleChange={e => {
                                        if (input?.name !== 'custom') {
                                          handleProductChange(
                                            e,
                                            product?.id,
                                            lot?.id,
                                            setLots,
                                          )
                                        }
                                      }}
                                      sx={{
                                        minWidth: '120px',
                                        bgcolor: 'white',
                                        borderRadius: '8px',
                                        cursor:
                                          input?.name === 'custom' ||
                                          ('subtotal' && 'not-allowed'),
                                      }}
                                      name={input?.name}
                                      SelectValue={
                                        input?.name === 'customs'
                                          ? product?.customs && product?.customs
                                          : input?.name === 'tWeight' ||
                                              input?.name === 'subtotal'
                                            ? setCustomField(
                                                product,
                                                input?.name,
                                              )
                                            : product[input?.name]
                                      }
                                      label={
                                        <>
                                          <span
                                            style={{
                                              fontSize: '12px',
                                              color:
                                                theme.palette.mode === 'dark'
                                                  ? 'white'
                                                  : 'rgba(14, 20, 31, 1)',
                                            }}
                                          >
                                            {input?.label}
                                          </span>
                                          {(input?.name === 'Product' ||
                                            input?.name === 'quantity' ||
                                            input?.name === 'weight') && (
                                            <span
                                              style={{
                                                color: 'red',
                                              }}
                                            >
                                              *
                                            </span>
                                          )}
                                        </>
                                      }
                                    />
                                    <Box sx={{ position: 'absolute' }}>
                                      <small
                                        style={{
                                          fontSize: '10px',

                                          color: theme.palette.secondary.main,
                                        }}
                                      >
                                        {getError(
                                          lot?.id,
                                          product?.id,
                                          input?.name,
                                          errorsState,
                                        )}
                                      </small>
                                    </Box>
                                  </Grid>
                                ))}
                              </Grid>
                              <Grid item md={12} lg="auto" alignSelf="end">
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: theme.palette.secondary.main,
                                    color: 'white',
                                    height: '38px',
                                    width: '40px',
                                    borderRadius: '5px',
                                    margin: '2px 2px 12px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    setProductDeleteModalOpen(true)
                                    setSelectedLot(lot?.id)
                                    setSelectedProduct(product.id)
                                  }}
                                >
                                  <img src={deleteImg}></img>
                                </Box>
                                <ConfirmDeleteModal
                                  title={
                                    'Are you sure you want to delete this Product?'
                                  }
                                  open={productDeleteModalOpen}
                                  onClose={() =>
                                    setProductDeleteModalOpen(false)
                                  }
                                  // onConfirm={() => {
                                  //   console.log(
                                  //     'lotid',
                                  //     lot?.id,
                                  //     selectedProduct,
                                  //   )
                                  // }}
                                  onConfirm={() =>
                                    handleDeleteProduct(
                                      selectedLot,
                                      selectedProduct,
                                      setProductDeleteModalOpen,
                                      setLots,
                                      dispatch,
                                      lots,
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )
                      })}
                    </Box>
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // gap: '16px',

                        background:
                          theme.palette.mode === 'dark'
                            ? 'transparent'
                            : 'rgb(238, 243, 245,0.7)',
                      }}
                    >
                      {lotGrossInputData.map(input => {
                        return (
                          <Grid
                            key={input?.name}
                            item
                            sm={12}
                            md={6}
                            lg={2}
                            sx={{ marginBottom: '18px' }}
                          >
                            {' '}
                            <LotInputField
                              key={input?.key}
                              type="number"
                              variant="outlined"
                              placeholder={`0`}
                              disable={input?.disabled}
                              sx={{
                                minWidth: '120px',
                                bgcolor: 'white',
                                borderRadius: '8px',
                              }}
                              handleChange={e => {
                                if (input?.name !== 'lotTotalPrice') {
                                  handleProductGrossChange(e, lot?.id, setLots)
                                }
                              }}
                              name={input?.name}
                              SelectValue={
                                input?.name === 'lotTotalPrice'
                                  ? setCustomGrossField(lot)
                                  : lot[input?.name]
                              }
                              label={
                                <>
                                  {' '}
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? 'white'
                                          : 'rgba(14, 20, 31, 1)',
                                    }}
                                  >
                                    {input?.label}
                                  </span>{' '}
                                  {input?.name === 'grossWeight' ||
                                  input?.name === 'grossWeightPrice' ? (
                                    <span
                                      style={{
                                        color: theme.palette.secondary.main,
                                      }}
                                    >
                                      *
                                    </span>
                                  ) : null}
                                </>
                              }
                            />
                            <Box sx={{ position: 'absolute' }}>
                              {' '}
                              {
                                <small
                                  style={{
                                    fontSize: '10px',
                                    color: 'red',
                                  }}
                                >
                                  {getGrossError(
                                    lot?.id,
                                    input?.name,
                                    errorsState,
                                  )}
                                </small>
                              }
                            </Box>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
                </Collapse>
              </Box>
            )
          })}
          <Box sx={{ padding: '24px' }}>
            {' '}
            <Box
              sx={{
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(67, 67, 67, 1)' : 'rgba(239, 243, 244, 1)'}`,
                borderRadius: '16px',
                padding: isSmallScreen ? '36px 8px' : '36px 32px',
                background:
                  theme.palette.mode === 'dark'
                    ? 'transparent'
                    : 'rgb(238, 243, 245,0.7)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              ></Box>

              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // gap: '16px',
                }}
              >
                {chargeInputData.map(input => {
                  return (
                    <Box
                      className="charges"
                      key={input?.name}
                      sx={{ display: 'flex', margin: '0 5px' }}
                    >
                      {' '}
                      <LotInputField
                        key={input?.key}
                        type="number"
                        variant="outlined"
                        placeholder={`${input?.name !== 'numberOfCarton' ? '0' : 1}`}
                        disable={input?.disabled}
                        handleChange={e => {
                          if (input?.name !== 'numberOfCarton') {
                            handleChargeChange(e, lotsAllData, setLotsAllData)
                          }
                        }}
                        name={input?.name}
                        SelectValue={
                          input?.name === 'totalLocalAmount' ||
                          input?.name === 'numberOfCarton'
                            ? setCustomChargeField(input?.name)
                            : lotsAllData[input?.name]
                        }
                        label={
                          <>
                            {' '}
                            <span
                              style={{
                                fontSize: '12px',
                                color:
                                  theme.palette.mode === 'dark'
                                    ? 'white'
                                    : 'rgba(14, 20, 31, 1)',
                              }}
                            >
                              {input?.label}
                            </span>{' '}
                          </>
                        }
                      />
                    </Box>
                  )
                })}
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            {' '}
            <Button
              variant="contained"
              sx={{
                padding: '0px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                height: '38px',
                margin: '2px ',
                width: isSmallScreen ? '100%' : 'auto',
                textTransform: 'capitalize',
              }}
              onClick={() => {
                dispatch(resetBooking())
                handleSubmit(null)
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              // onClick={'/payment'}
              sx={{
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'transparent'
                    : 'rgba(239, 243, 244, 1)',
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : 'rgba(34, 78, 114, 1)',
                border:
                  theme.palette.mode === 'dark'
                    ? `1px, solid ${theme.palette.primary.main}`
                    : `1px, solid rgba(34, 78, 114, 1)`,

                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'transparent'
                      : 'rgba(239, 243, 244, 1)',
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : 'rgba(34, 78, 114, 1)',
                },

                cursor: 'pointer',
                padding: isSmallScreen ? '0 8px' : '0px 16px',
                borderRadius: '8px',
                height: '38px',
                margin: '2px 4px',
                width: isSmallScreen ? '100%' : 'auto',
                textTransform: 'capitalize',
              }}
              onClick={() => handleSubmit(true)}
            >
              Next
            </Button>
          </Box>
          {/* <Notification
            open={bookingOpen}
            handleClose={() => setBookingOpen(false)}
            message={bookingMessage}
            // severity="success"
          /> */}
        </Box>
      )}
    </>
  )
}
