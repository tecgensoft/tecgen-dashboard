/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridArrowDownwardIcon, GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'

import { setText } from '../../../redux/feature/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import useDebounce from '../../../utils/useDebounce'
// import DataTable from './_component/Table'

import { useNavigate } from 'react-router-dom'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
// import { useGetPaymentReportQuery, useLazyGetPaymentReportQuery } from '../../../redux/feature/payment/paymentApi'
import { SUCCESS } from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useLazyGetPaymentReportQuery } from '../../../redux/feature/payment/paymentApi'
import '../style.css'
import DataTable from './_component/Table'

export default function PaymentHistories() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedRow, setSelectedRow] = useState<any>(null)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const dispatch = useAppDispatch()
  const { text } = useAppSelector(state => state.search)
  const [date, setDate] = useState('')
  const [method, setMethod] = useState('')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) // Explicitly manage loading state
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  // Handle search input change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  // const { data, isSuccess, isLoading, isError, error } =
  //   useGetPaymentReportQuery({ date, method }, { skip: !download })
  const [triggerGetPaymentReport] = useLazyGetPaymentReportQuery({
    date,
    method,
  })



  const handlePaymentReportInvoice = async () => {
    let res
    // try {
    setIsLoading(true)
    res = await triggerGetPaymentReport({ date, method }).unwrap()

    if (res) {
      const file = new Blob([res], { type: 'application/vnd.ms-excel' }) // Ensure MIME type is correct for Excel
      const fileURL = window.URL.createObjectURL(file)
      const alink = document.createElement('a')
      alink.href = fileURL

      alink.setAttribute('download', 'payment_report.xls')
      document.body.appendChild(alink)
      alink.click()
      dispatch(
        setNotification({
          open: true,
          message: 'Report downloaded!',
          type: SUCCESS,
        }),
      )
      setIsLoading(false)
      // dispatch(setOpen(true))
      // dispatch(setMessage('Report downloaded!'))
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Box
      className="payment"
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: isSmallScreen ? '20px 10px' : '33px 24px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
        Payment Histories
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        {isSmallScreen ? (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: isSmallScreen ? '5px 0' : '16px 0' }}
          >
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
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            navigate(`/booking/payment`)
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
            color: 'white',
            margin: isSmallScreen ? '5px 0' : '10px 0',
          }}
        >
          Create
        </Button>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginBottom: '16px' }}
        alignItems={'center'}
      >
        <Grid item xs={12} md={6} lg={2}>
          <Select
            value={date}
            onChange={e => setDate(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              minWidth: 100,
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(57, 57, 57, 1)' : 'white',
              height: '42px',
            }}
            // startAdornment={
            //   <InputAdornment position="start">
            //     <CalendarMonthOutlinedIcon fontSize="small" />
            //   </InputAdornment>
            // }
          >
            <MenuItem value="">Date</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="last_thirty_days">Last thirty days</MenuItem>
            <MenuItem value="this_month">This month</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <Select
            value={method}
            onChange={e => setMethod(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              minWidth: 120,
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(57, 57, 57, 1)' : 'white',
              height: '42px',
            }}
            // startAdornment={
            //   <InputAdornment position="start">
            //     {/* <PaidOutlinedIcon fontSize="small" /> */}
            //   </InputAdornment>
            // }
          >
            <MenuItem value="" disabled>
              Payment Method
            </MenuItem>
            <MenuItem value="CASH">Cash</MenuItem>
            <MenuItem value="BANK">Bank</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Button
            disabled={isLoading}
            variant="contained"
            endIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <GridArrowDownwardIcon fontSize="small" />
              )
            }
            onClick={handlePaymentReportInvoice}
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
              height: '40px',
            }}
          >
            Payment Report
          </Button>
        </Grid>
      </Grid>
      <DataTable
        text={text}
        setIsOpen={setIsOpen}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
      />
    </Box>
  )
}
