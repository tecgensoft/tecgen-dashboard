/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import DataTable from './_component/Table'
// import BookingTable from './_component/table/Table'

import AddIcon from '@mui/icons-material/Add'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetFilteredBookingReportQuery } from '../../../redux/feature/booking/bookingApi'

import {
  resetBooking,
  setBookingAction,
  setEditData,
} from '../../../redux/feature/booking/bookingSlice'
import { WARNING } from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { setText } from '../../../redux/feature/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import useDebounce from '../../../utils/useDebounce'
import { BOOKING_CREATE_ACTION } from '../constant/action'
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
export default function BookingList() {
  const theme = useTheme()
  const [download, setDownLoad] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { userInfo } = useAppSelector(state => state?.auth)
  const [customDateVisible, setCustomDateVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const dispatch = useAppDispatch()
  const [payload, setPayload] = useState({
    startDate: '',
    endDate: '',
    payment: '',
    type: '',
  })
  const navigate = useNavigate()
  const { isError, error, refetch, isUninitialized } =
    useGetFilteredBookingReportQuery(
      {
        startDate: payload.startDate,
        endDate: payload.endDate,
        payment: payload.payment,
        type: payload.type,
        setDownLoad: setDownLoad,
        setLoading: setLoading,
      },
      { skip: !download },
    )

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [isUninitialized, refetch])
  const { text } = useAppSelector(state => state.search)
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  useEffect(() => {
    if (error) {
      const frm = JSON.parse(error?.data)
      dispatch(
        setNotification({
          open: true,
          message: frm?.message,
          type: WARNING,
        }),
      )
      // dispatch(setOpen(true))
      // dispatch(setMessage(frm?.message))
    }
  }, [isError, error])

  const [date, setDate] = useState('')
  // console.log(apiError)
  const handleDate = (e: { target: { value: SetStateAction<string> } }) => {
    setDate(e.target.value)
    if (e.target.value === 'option2') {
      setCustomDateVisible(true)
    } else {
      setCustomDateVisible(false)
      const today = new Date()
      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      }
      const formattedDate = formatDate(today)

      setPayload({
        ...payload,
        startDate: formattedDate,
        endDate: formattedDate,
      })
    }
  }

  const handleStartDate = (value: string) => {
    if (value) {
      const formatStartDate = formatDate(value)
      const newPayload = { ...payload, startDate: formatStartDate }
      setPayload(newPayload)
    }
  }
  const handleEndDate = (value: string) => {
    if (value) {
      const formatStartDate = formatDate(value)
      setPayload({ ...payload, endDate: formatStartDate })
    }
  }
  const handlePayment = (value: string) => {
    if (value) {
      setPayload({ ...payload, payment: value })
    }
  }
  const handleType = (value: string) => {
    if (value) {
      setPayload({ ...payload, type: value })
    }
  }
 
  const handleReport = async () => {
    if (payload?.startDate && payload?.endDate && payload?.type) {
      setDownLoad(true)
      setLoading(true)
    } else {
      setDownLoad(false)

      if (payload?.startDate && payload?.endDate && !payload?.type) {
        dispatch(
          setNotification({
            open: true,
            message: 'Report type is required!',
            type: WARNING,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Report type is required!'))
      } else if (
        (payload?.type && !payload?.startDate && !payload?.endDate) ||
        (payload?.type && payload?.startDate && !payload?.endDate) ||
        (payload?.type && !payload?.startDate && payload?.endDate)
      ) {
        dispatch(
          setNotification({
            open: true,
            message: 'Date is required!',
            type: WARNING,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Date is required!'))
      } else {
        dispatch(
          setNotification({
            open: true,
            message: 'Date and Report type are required!',
            type: WARNING,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Date and Report type are required!'))
      }
    }
  }

  const formatDate = (date: string) => {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }
  const parseDate = (date: string) => {
    if (!date) return ''
    const [day, month, year] = date.split('-')
    return `${year}-${month}-${day}`
  }

  // Handle search input change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  // Function to filter data based on the search term
  // const filterData = data => {
  //   return data.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   )
  // }

  return (
    <Box
      className="booking"
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      {/* {apiError && (
        <Toastify
          isShow={error}
          message="Data not found for report generation"
        />
      )} */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 500, marginBottom: '32px' }}
      >
        BookingList
      </Typography>

      {isSmallScreen && (
        <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              placeholder="Search"
              value={searchTerm} // Bind search term state to input
              onChange={handleSearchChange} // Update search term state on input change
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GridSearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                padding: '2px 0',
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(57, 57, 57, 1)'
                    : 'rgba(239, 243, 244, 1)',
                borderColor: 'transparent',
                borderRadius: '8px',
                color:
                  theme.palette.mode === 'dark'
                    ? 'rgba(153, 153, 153, 1)'
                    : 'rgba(153, 153, 153, 1)',
              }}
            />
          </Grid>

          {userInfo?.role !== 'Staff' &&
            userInfo.role !== 'Staff  for test role' && (
              <Grid item xs={12} md={6} lg={9} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    localStorage.setItem(
                      'bookingAction',
                      BOOKING_CREATE_ACTION,
                    ),
                      navigate('/booking/create_new_booking', {
                        state: { from: location.pathname },
                      })
                  }}
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

                    textTransform: 'capitalize',
                  }}
                >
                  Create
                </Button>
              </Grid>
            )}
        </Grid>
      )}

      <Grid
        container
        spacing={2}
        sx={{ marginBottom: '16px' }}
        alignItems={'center'}
      >
        <Grid item xs={12} md={6} lg={2}>
          <Select
            value={date}
            onChange={handleDate}
            displayEmpty
            fullWidth
            sx={{
              minWidth: 100,
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(57, 57, 57, 1)' : 'white',
              height: '42px',
            }}
            startAdornment={
              <InputAdornment position="start">
                <CalendarMonthOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="">Date</MenuItem>
            <MenuItem value="option1">Today</MenuItem>
            <MenuItem value="option2">Custom Date</MenuItem>
          </Select>
        </Grid>
        {customDateVisible && (
          <>
            <Grid item xs={12} md={6} lg={2}>
              <InputFieldComponent
                fullWidth
                variant="outlined"
                label="Start Date"
                type="date"
                value={parseDate(payload.startDate)}
                onChange={e => handleStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <InputFieldComponent
                fullWidth
                variant="outlined"
                label="End Date"
                type="date"
                value={parseDate(payload.endDate)}
                onChange={e => handleEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} md={6} lg={2}>
          <Select
            value={payload?.payment}
            onChange={e => handlePayment(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              minWidth: 120,
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(57, 57, 57, 1)' : 'white',
              height: '42px',
            }}
            startAdornment={
              <InputAdornment position="start">
                <PaidOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="">Payment Type</MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="UNPAID">Unpaid</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Select
            value={payload?.type}
            onChange={e => handleType(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              minWidth: 120,
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(57, 57, 57, 1)' : 'white',
              height: '42px',
            }}
            startAdornment={
              <InputAdornment position="start">
                <AssignmentOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value=""> Report</MenuItem>
            <MenuItem value="booking_report">Booking Report</MenuItem>
            <MenuItem value="packing_report">Packing Report</MenuItem>
            <MenuItem value="booking_sell_pdf">Booking Sell Pdf</MenuItem>
            <MenuItem value="booking_sell_report">Booking Sell Report</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button
            variant="contained"
            endIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )
            }
            onClick={handleReport}
            fullWidth
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : 'rgba(239, 243, 244, 1)',
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : 'rgba(239, 243, 244, 1)',
              },
              color:
                theme.palette.mode === 'dark' ? 'white' : 'rgba(14, 20, 31, 1)',
              padding: '0px 16px',
              borderRadius: '8px',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(187, 36, 68, 1)'
                  : '1px solid rgba(217, 227, 231, 1)',
              boxShadow: 'none',
              textTransform: 'capitalize',
              height: '38px',
            }}
          >
            Download
          </Button>
        </Grid>
        {!isSmallScreen &&
          !customDateVisible &&
          userInfo?.role !== 'Staff' &&
          userInfo.role !== 'Staff  for test role' && (
            <Grid item xs={12} md={6} lg={4} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  console.log('click 0')
                  dispatch(setEditData({}))
                  dispatch(resetBooking())
                  navigate('/booking/create_new_booking')
                }}
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
                  width: isLargeScreen ? '100%' : 'auto',
                  height: '38px',
                  textTransform: 'capitalize',
                }}
              >
                Create
              </Button>
            </Grid>
          )}
      </Grid>
      {!isSmallScreen &&
        customDateVisible &&
        userInfo?.role !== 'Staff' &&
        userInfo.role !== 'Staff  for test role' && (
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(resetBooking())
                dispatch(setBookingAction(BOOKING_CREATE_ACTION))
                navigate('/booking/create_new_booking')
                // window.location.pathname('/booking/create_new_booking')
              }}
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
                width: isLargeScreen ? '100%' : 'auto',
                height: '38px',
                textTransform: 'capitalize',
                marginBottom: '10px',
              }}
            >
              Create
            </Button>
          </Grid>
        )}
      <DataTable search={text} />
    </Box>
  )
}
