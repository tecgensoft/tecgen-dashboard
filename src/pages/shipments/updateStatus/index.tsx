/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Toastify from '../../../components/Toastify'
import { bookingLotStatus } from '../../../redux/feature/booking/bookingAction'
import { useGetLotStatusQuery } from '../../../redux/feature/booking/bookingApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useGetUpdateShipmentStatusQuery } from '../../../redux/feature/shipment/shipmentApi'
import { useAppSelector } from '../../../redux/hook'
import DataTable from './_component/Table'
import { SUCCESS } from '../../../redux/feature/notification/constant'

export default function UpdateStatus() {
  const [updateStatus, setUpdateStatus] = useState()
  const dispatch = useDispatch()
  const { state } = useLocation()

  const {
    bookingLotStatus: bookingLot,
    loading,
    error,
  } = useAppSelector(state => state.booking)

  const { reference, location_status, branch, booking } = bookingLot || {}
  const [formValues, setFormValues] = useState({
    lotsReference: '',
    status: '',
  })
  const { data } = useGetLotStatusQuery(undefined)
  const { data: updateShipmentStatus } = useGetUpdateShipmentStatusQuery(
    {
      id: state?.id,
      statusId: formValues.status,
      page: 1,
    },
    { skip: !(updateStatus && formValues?.status) },
  )

  const [formErrors, setFormErrors] = useState<{
    lotsReference: string | null | undefined
    status: string | null | undefined
  }>({
    lotsReference: '',
    status: '',
  })

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: '',
    })
  }
  const [updatedLot, setUpdatedLot] = useState([])
  useEffect(() => {
    if (updateShipmentStatus?.success) {
      setUpdatedLot(updateShipmentStatus?.data)
      dispatch(
        setNotification({
          open: true,
          message: 'Shipment Status updated successfully!',
          type: SUCCESS,
        }),
      )
      // dispatch(setOpen(true))
      // dispatch(setMessage('Shipment Status updated successfully!'))
      setFormValues(prev => ({ ...prev, lotsReference: '', status: '' }))
    }
  }, [updateShipmentStatus])
  const validateForm = () => {
    const errors: {
      lotsReference: string | null | undefined
      status: string | null | undefined
    } = {
      lotsReference: undefined,
      status: undefined,
    }
    if (!formValues.lotsReference.trim()) {
      errors.lotsReference = 'Lots Reference is required'
    }
    if (!formValues.status) {
      errors.status = 'Status is required'
    }
    setFormErrors(errors)

    return Object.keys(errors).length === 0
  }
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (!validateForm()) {
      await dispatch(bookingLotStatus(formValues))
      // if (bookingLot) {
      //   setFormValues(prev => ({ ...prev, lotsReference: '', status: '' }))
      // }
    }
  }

  const lotStatusOptions = () => {
    return data?.data?.map((item: { name: any; id: any }) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  }

  const lotStatus = lotStatusOptions()

  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '32px 24px',
        // height: `calc(100vh - ${140}px)`,
        borderRadius: '8px',
      }}
    >
      {/* {error && (
        <Toastify message={error} isShow={Boolean(error)} type={'error'} />
      )} */}
      <Typography
        variant="h6"
        mb={8}
        sx={{
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Update Shipment Status
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={3}>
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              error={!!formErrors.status}
              sx={{ minWidth: 150 }}
            >
              <Select
                name="status"
                value={formValues.status}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                displayEmpty
                sx={{ minWidth: 150, height: '42px' }}
              >
                <MenuItem value="">Select Status</MenuItem>
                {lotStatus?.map(
                  (item: { label: string; value: number | string }) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ),
                )}
              </Select>
              <FormHelperText>{formErrors.status}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{
                height: '42px',
              }}
              onClick={() => setUpdateStatus(true)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
      <DataTable data={updatedLot}></DataTable>
    </Box>
  )
}
