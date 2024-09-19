/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput, 
  Select,
} from '@mui/material'
// import { useEffect, useState } from 'react'
// import {
//   EDIT_ACTION,
//   productType,
// } from '../../pages/ProductManagement/Product/constant'
// import {
//   setMessage,
//   setOpen,
// } from '../../redux/feature/notification/notificationSlice'

import { useEffect, useState } from 'react'
import { LOCATION_EDIT_ACTION } from '../../pages/ProductManagement/locationStatus/constant'
import { useGetCountryQuery } from '../../redux/feature/customCharges/CustomChargesApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../redux/feature/notification/notificationSlice'
import { DANGER, SUCCESS } from '../../redux/feature/notification/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'

export default function LocationModal({
  updateLocation,
  createLocation,
  isOpen,
  setIsOpen,
  selectedRow,
}) {
  const { selectLocationAction } = useAppSelector(state => state?.select)

  const [selectedCountry, setSelectedCountry] = useState('')
  const [location, setLocation] = useState('')
  const [position, setPosition] = useState('')
  const [key, setKey] = useState('')

  const dispatch = useAppDispatch()
  const { data: countries } = useGetCountryQuery(undefined)

  useEffect(() => {
    if (isOpen) {
      if (selectLocationAction === LOCATION_EDIT_ACTION && selectedRow) {
        setSelectedCountry(selectedRow?.country?.id)
        setLocation(selectedRow?.name || '')
        setPosition(selectedRow?.position)
        setKey(selectedRow?.key)
      }
    }
  }, [isOpen, selectLocationAction, selectedRow])

  const handleLocation = async () => {
    const locationData = {
      name: location,
      key: key,
      country: selectedCountry,
      position: position,
    }

    const action =
      selectLocationAction === LOCATION_EDIT_ACTION
        ? updateLocation
        : createLocation
    const payload =
      selectLocationAction === LOCATION_EDIT_ACTION
        ? { id: selectedRow?.id, ...locationData }
        : locationData

    await action(payload).then(
      (data: { data: { success: any }; error: any }) => {
        if (data?.data?.success) {
          console.log('ok', selectLocationAction === LOCATION_EDIT_ACTION)
          setIsOpen(false)
          dispatch(
            setNotification({
              open: true,
              message: `Location ${selectLocationAction === LOCATION_EDIT_ACTION ? 'updated' : 'created'} successfully!`,
              type: SUCCESS,
            }),
          )
          // dispatch(setOpen(true))
          // dispatch(
          //   setMessage(
          //     `Location ${selectLocationAction === LOCATION_EDIT_ACTION ? 'updated' : 'created'} successfully!`,
          //   ),
          // )
        } else if (data?.error) {
          console.log(data?.error)
          setIsOpen(false)
          dispatch(
            setNotification({
              open: true,
              message: `${data?.error?.data?.details?.name[0]}`,
              type: DANGER,
            }),
          )
          // dispatch(setOpen(true))
          // dispatch(setMessage(data?.error?.data?.details?.name[0]))
        }
      },
    )
  }

  const isFormValid =
    location !== '' && selectedCountry !== '' && key !== '' && position !== ''

  return (
    <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {`${selectLocationAction === LOCATION_EDIT_ACTION ? 'Edit' : 'Create'}`}{' '}
        Location
      </DialogTitle>
      <DialogContent>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Name</span>
            <span>*</span>
          </FormLabel>
          <CommonInput
            placeholder="Location Name"
            variant="outlined"
            onChange={e => setLocation(e?.target?.value)}
            value={location}
            sx={{
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '11px 8px',
              },
            }}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Key</span>
            <span>*</span>
          </FormLabel>
          <CommonInput
            placeholder="Key"
            variant="outlined"
            onChange={e => setKey(e?.target?.value)}
            value={key}
            sx={{
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '11px 8px',
              },
            }}
          />
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ width: '100%' }}
        >
          <FormLabel>Select Country</FormLabel>
          <Select
            displayEmpty
            value={selectedCountry}
            onChange={e => setSelectedCountry(e?.target?.value)}
            input={<OutlinedInput />}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              height: '42px',
              bgcolor: theme =>
                theme.palette.mode === 'light' ? 'white' : '#464646',
            }}
          >
            {' '}
            <MenuItem key="" value="">
              Select Country
            </MenuItem>
            {countries?.map(country => (
              <MenuItem key={country?.value} value={country?.value}>
                {country?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Position</span>
            <span>*</span>
          </FormLabel>
          <CommonInput
            type="number"
            placeholder="Position"
            variant="outlined"
            onChange={e => setPosition(e?.target?.value)}
            value={position}
            sx={{
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '11px 8px',
              },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontSize: '12px' }}
          variant="contained"
          onClick={() => setIsOpen(false)}
          color="secondary"
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '12px' }}
          onClick={handleLocation}
          disabled={!isFormValid}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
