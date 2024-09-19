/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Box,
  Button,
  FormControl,
  Grid,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  DANGER,
  SUCCESS,
  WARNING,
} from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useLazyAddLotToShipmentQuery } from '../../../redux/feature/shipment/shipmentApi'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { formatDate } from '../../../utils/dateTimeFormat'
import DataTable from './_component/Table'
// import {
//   useAddLotToChallanMutation,
//   useCompleteChallanMutation,
// } from '../../../redux/feature/challan/ChalanApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
// import { useAppDispatch } from '../../../redux/hook'
const InputFieldComponent = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      backgroundColor: mode === 'dark' ? '#464646' : 'white',
      borderRadius: '8px',
      padding: '8.5px',
    },
    '&& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input': {
      backgroundColor: mode === 'dark' ? '#464646' : 'white',
      borderRadius: '8px',
      padding: '8.5px',
    },
  }
})
export default function AddLot() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  // const [completeChallan] = useCompleteChallanMutation()
  const [lotRef, setLotRef] = useState('')
  const { state } = useLocation()
  const [updateState, setUpdateState] = useState(false)
  const { userInfo } = useAppSelector(state => state?.auth)
  const [addLotToShipment] = useLazyAddLotToShipmentQuery({
    shipmentId: state?.id,
    lotRef: lotRef,
  })
  const dispatch = useAppDispatch()

  const handleSubmit = async () => {
    if (!lotRef) {
      dispatch(
        setNotification({
          open: true,
          message: 'Please add lot reference',
          type: WARNING,
        }),
      )
      return
    }

    try {
      res = await addLotToShipment({
        shipmentId: state?.id,
        lotRef: lotRef?.trim(),
      }).unwrap()

      dispatch(
        setNotification({
          open: true,
          message: 'Lot added successfully',
          type: SUCCESS,
        }),
      )
    } catch (error) {
      dispatch(
        setNotification({
          open: true,
          message: error.data.message,
          type: DANGER,
        }),
      )

      return
    }
  }

  return (
    <Box
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: isSmallScreen ? '20px 10px' : '45px 24px',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: 500, marginBottom: '24px' }}
        >
          Add Lots
        </Typography>
        {userInfo?.role !== 'Staff' &&
          userInfo.role !== 'Staff  for test role' && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Grid container justifyContent="start" alignItems="center">
                {' '}
                <Grid item lg={10} sm={12} marginBottom={1}>
                  <FormControl fullWidth>
                    <InputFieldComponent
                      name="lot"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Reference number"
                      value={lotRef}
                      onChange={e => setLotRef(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={1} sm={12} marginBottom={1}>
                  {' '}
                  <Button
                    variant="contained"
                    sx={{
                      padding: '0px 16px',
                      height: '38px',
                      borderRadius: '8px',
                      margin: '0 4px',
                      background: theme?.palette?.secondary.main,
                      width: '100%',
                    }}
                    onClick={handleSubmit}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
      </Box>
      {/* <Box
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
                // value={searchTerm} // Bind search term state to input
                // onChange={handleSearchChange} // Update search term state on input change
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
      </Box> */}
      <Box
        sx={{
          margin: '45px 0 20px',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex ', margin: '0 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Date:
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {formatDate(state?.item?.created_at)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex ', margin: '2px 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            No of Lots:
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {state?.item?.lot_count}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex ', margin: '2px 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Date Range:
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {state?.item?.start_date + ' '}
            to {' ' + state?.item?.end_date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex ', margin: '2px 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Freight Category:{' '}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {state?.item?.freight_category}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex ', margin: '2px 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Shipment Number:
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {state?.item?.shipment_number}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex ', margin: '2px 15px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            To Country:
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              margin: '0 4px',
              color: 'rgba(153, 153, 153, 1)',
            }}
          >
            {state?.item?.to_country_name}
          </Typography>
        </Box>
      </Box>
      <DataTable text={''} updateState={'updateState'} state={state} />
    </Box>
  )
}
