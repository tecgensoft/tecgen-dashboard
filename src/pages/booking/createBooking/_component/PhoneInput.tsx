/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck 
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Popover,
  useTheme,
} from '@mui/material'
import { forwardRef, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import { setSenderId } from '../../../../redux/feature/booking/bookingSlice'
import { useAppSelector } from '../../../../redux/hook'


export default function BookingPhoneInput(props: any) {
  const theme = useTheme()
  const mode = theme?.palette?.mode
  const dispatch = useDispatch()
  const { preferredCountries } = useAppSelector(state => state.booking)
  const {
    selectedCountry,
    countryCodeWiseOnChange,
    options,
    isSender,
    error,
    errorMessage,
    onBlur,
    value,
    shouldSkip,
  } = props

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#EFF3F4',
    border: `1px solid  ${mode === 'light' ? '#D9E3E7' : '#464646'}`,
    borderRadius: '8px',
  }
  const inputStyle = {
    width: '100%',
    height: '40px',
    backgroundColor: mode === 'light' ? '#EFF3F4' : '#464646',
    border: 'none',
    color: mode === 'light' ? '#999999' : '#848484',
    fontSize: '16px',
    outline: 'none',
  }
  const buttonStyle = {
    backgroundColor: mode === 'light' ? '#EFF3F4' : '#353434',
    border: 'none',
  }

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOptionClick = (option: {
    value: string | null
    label: string
  }) => {
    dispatch(setSenderId(option.value))
    setAnchorEl(null)
    inputRef.current?.focus()
  }

  const isShowDropDrownOfSearchPhone = (phone: any) => {
    if (phone.length > 3) {
      setAnchorEl(document.getElementById('phone-input'))
    } else {
      setAnchorEl(null)
    }
  }

  return (
    <FormControl fullWidth error={error}>
      <Box>
        <label
          style={{
            color: `${theme?.palette?.mode === 'light' ? '#2e2e2e' : '#fff'}`,
            fontSize: '14px',
            marginBottom: '5px',
            display: 'block',
          }}
        >
          Phone*
        </label>
        <PhoneInput
          ref={inputRef}
          onlyCountries={preferredCountries}
          country={selectedCountry}
          onChange={(phone, country) => {
            countryCodeWiseOnChange(phone, country)
            isSender && isShowDropDrownOfSearchPhone(phone)
          }}
          onBlur={onBlur}
          value={value}
          containerStyle={containerStyle}
          inputStyle={inputStyle}
          buttonStyle={buttonStyle}
          inputProps={{
            id: 'phone-input',
            name: 'phone',
            required: true,
            autoFocus: false,
          }}
          placeholder="Enter phone number"
        />
        {isSender && shouldSkip && (
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} 
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            disableAutoFocus={true} 
            disableEnforceFocus={true}
            PaperProps={{
              style: {
                width: '200px',
                maxHeight: '300px',
                overflow: 'auto', 
              },
            }}
          >
            {options?.map((option: { value: string | null; label: string }) => (
              <MenuItem
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option?.label}
              </MenuItem>
            ))}
          </Popover>
        )}
        {error && errorMessage && (
          <FormHelperText error>{errorMessage}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}
