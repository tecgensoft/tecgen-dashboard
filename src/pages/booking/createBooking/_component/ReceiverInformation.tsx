/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setReceiverCountryCode } from '../../../../redux/feature/booking/bookingSlice'
import { useAppSelector } from '../../../../redux/hook'
import InputField from './InputField'
import BookingPhoneInput from './PhoneInput'
import SelectField from './SelectField'

export default function ReceiverInformation({ formik }: { formik: any }) {
  const { receiverCountryFlag, phoneCodeWiseReceiverCountryState } =
    useAppSelector(state => state.booking)
  const { values } = useFormikContext<any>()
  const dispatch = useDispatch()
  const theme = useTheme()
  const cityOptions = () => {
    return phoneCodeWiseReceiverCountryState?.states?.map(
      (item: { name: any; id: any }) => {
        return {
          label: item.name,
          value: item.id,
        }
      },
    )
  }

  const areaOptions = () => {
    if (values['receiver_choose_city']) {
      const selectedCity = phoneCodeWiseReceiverCountryState?.states?.find(
        (state: { id: string }) =>
          state.id === values['receiver_choose_city']?.id ||
          state.id === values['receiver_choose_city'],
      )
      return (
        selectedCity?.cities?.map((item: { name: string; id: string }) => ({
          label: item.name,
          value: item.id,
        })) || []
      )
    }
    return []
  }

  const countryCodeWiseOnChange = (phone: number, country) => {
    const { dialCode } = country
    dispatch(setReceiverCountryCode(dialCode))
    if (phone) {
      formik.setFieldValue('receiver_phone', phone)
    }
  }
  const BookingTypeOption = [
    {
      value: null,
      label: 'Select Booking Type',
    },
    {
      value: 'STANDARD',
      label: 'Standard',
    },
    {
      value: 'EXPRESS',
      label: 'Express',
    },
    {
      value: 'SUPER_EXPRESS',
      label: 'Super Express',
    },
  ]
  const DeliveryTypeOption = [
    {
      value: null,
      label: 'Select Booking Type',
    },
    {
      value: 'HOME_DELIVERY',
      label: 'Home Delivery',
    },
    {
      value: 'OFFICE_DELIVERY',
      label: 'Office Delivery',
    },
  ]

  useEffect(() => {
    if (phoneCodeWiseReceiverCountryState?.name) {
      formik.setFieldValue(
        'receiver_country',
        phoneCodeWiseReceiverCountryState?.name,
      )
      formik.setFieldValue(
        'receiver_countryId',
        phoneCodeWiseReceiverCountryState?.id,
      )
    }
  }, [phoneCodeWiseReceiverCountryState])

  const getSelectedLabel = (selectedValue: any) => {
    const selectedOption = cityOptions()?.find(
      (option: { value: any }) => option.value === selectedValue,
    )
    return selectedOption
  }
  useEffect(() => {
    if (formik.values['receiver_choose_city']) {
      const s = getSelectedLabel(formik.values['receiver_choose_city'])
      // console.log(s)
      if (s) {
        formik.setFieldValue('receiver_choose_city_name', s.label)
      }
    }
  }, [formik.values['receiver_choose_city']])
  const deliveryType = values['receiver_delivery_type']
  // console.log(formik.errors)
  return (
    <Box p={3} borderRadius={2} border="1px solid#EFF3F4">
      <Typography variant="h6" gutterBottom>
        Receiver Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <BookingPhoneInput
            name="receiver_phone"
            label="Phone"
            value={formik.values.receiver_phone}
            selectedCountry={receiverCountryFlag}
            countryCodeWiseOnChange={countryCodeWiseOnChange}
            onBlur={() => formik.setFieldTouched('receiver_phone', true)}
            error={
              formik.touched.receiver_phone &&
              Boolean(formik.errors.receiver_phone)
            }
            errorMessage={
              formik.touched.receiver_phone && formik.errors.receiver_phone
            }
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="receiver_name"
            label="Name*"
            value={formik.values.receiver_name}
            placeholder="Name"
            error={formik.touched.name && Boolean(formik.errors.receiver_name)}
            helperText={formik.touched.name && formik.errors.receiver_name}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            name="receiver_email"
            label="Email*"
            placeholder="E-mail"
            value={formik.values.receiver_email}
            onChange={formik.handleChange}
            error={
              formik.touched.receiver_email &&
              Boolean(formik.errors.receiver_email)
            }
            helperText={
              formik.touched.receiver_email && formik.errors.receiver_email
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box sx={{ width: '50%' }}>
              <SelectField
                name="receiver_booking_type"
                label="Booking Type*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.receiver_booking_type}
                error={
                  formik.touched.receiver_booking_type &&
                  Boolean(formik.errors.receiver_booking_type)
                }
                errorMessage={formik.errors.receiver_booking_type}
                data={BookingTypeOption}
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <InputField
                name="reference"
                label="Reference"
                onChange={formik.handleChange}
                value={formik.values.reference}
                placeholder="Reference"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name="receiver_delivery_type"
            label="Delivery Type*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.receiver_delivery_type}
            error={
              formik.touched.receiver_delivery_type &&
              Boolean(formik.errors.receiver_delivery_type)
            }
            errorMessage={formik.errors.receiver_delivery_type}
            data={DeliveryTypeOption}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="receiver_country"
            label="Country*"
            value={
              formik.values.receiver_country.id
                ? formik.values.receiver_country.name
                : formik.values.receiver_country
            }
            onChange={formik.handleChange}
            error={
              formik.touched.receiver_country &&
              Boolean(formik.errors.receiver_country)
            }
            helperText={
              formik.touched.receiver_country && formik.errors.receiver_country
            }
            disable
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel sx={{ fontSize: '16px', color: '#424642' }}>
              Choose City
            </FormLabel>{' '}
            <Autocomplete
              // name="receiver_choose_city"
              value={
                cityOptions()?.find(
                  (city: { value: any }) =>
                    city.value === formik.values.receiver_choose_city,
                ) || null
              }
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  'receiver_choose_city',
                  newValue ? newValue.value : '',
                )
              }}
              onBlur={formik.handleBlur}
              options={cityOptions() || []}
              getOptionLabel={option => option.label || ''}
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              renderInput={params => (
                <TextField
                  {...params}
                  // label="Choose City"
                  sx={{
                    minWidth: '100%',
                    // padding: '9px 0', // Adjust padding as needed
                    '& .MuiInputBase-root': {
                      // For the inner input field
                      padding: '0 0 2px', // Adjust inner padding as needed
                      background:
                        theme?.palette?.mode === 'dark'
                          ? 'transparent'
                          : '#eff3f4',
                    },
                  }}
                  error={
                    formik.touched.receiver_choose_city &&
                    Boolean(formik.errors.receiver_choose_city)
                  }
                  helperText={
                    formik.touched.receiver_choose_city &&
                    formik.errors.receiver_choose_city
                  }
                />
              )}
            />
          </FormControl>
          {/* <SelectField
            name="receiver_choose_city"
            value={
              formik.values.receiver_choose_city ||
              formik.values.receiver_choose_city
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Choose City"
            data={cityOptions()}
            error={
              formik.touched.receiver_choose_city &&
              Boolean(formik.errors.receiver_choose_city)
            }
            errorMessage={formik.errors.receiver_choose_city}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel sx={{ fontSize: '16px', color: '#424642' }}>
              Choose Area
            </FormLabel>{' '}
            <Autocomplete
              // name="choose_area"
              value={
                areaOptions()?.find(
                  (option: { value: any }) =>
                    option.value === formik.values.receiver_choose_area,
                ) || null
              }
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  'receiver_choose_area',
                  newValue ? newValue.value : '',
                ) // Set the value
              }}
              onBlur={formik.handleBlur}
              options={areaOptions() || []} // List of area options
              getOptionLabel={option => option.label || ''} // Adjust if areaOptions has a different structure
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              } // Ensure correct matching
              renderInput={params => (
                <TextField
                  {...params}
                  sx={{
                    minWidth: '100%',
                    // padding: '9px 0', // Adjust padding as needed
                    '& .MuiInputBase-root': {
                      // For the inner input field
                      padding: '0 0 2px', // Adjust inner padding as needed
                      background:
                        theme?.palette?.mode === 'dark'
                          ? 'transparent'
                          : '#eff3f4',
                    },
                  }}
                  error={
                    formik.touched.receiver_choose_area &&
                    Boolean(formik.errors.receiver_choose_area)
                  }
                  helperText={
                    formik.touched.receiver_choose_area &&
                    formik.errors.receiver_choose_area
                  }
                />
              )}
            />
          </FormControl>
          {/* <SelectField
            name="receiver_choose_area"
            value={
              formik.values.receiver_choose_area ||
              formik.values.receiver_choose_area
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Choose Area"
            data={areaOptions()}
            error={
              formik.touched.receiver_choose_area &&
              Boolean(formik.errors.receiver_choose_area)
            }
            errorMessage={formik.errors.receiver_choose_area}
          /> */}
        </Grid>
        {deliveryType === 'HOME_DELIVERY' && (
          <>
            <Grid item xs={12} sm={4}>
              <InputField
                name="road_no"
                label="Road No*"
                value={formik.values.road_no}
                placeholder="Road No..."
                onChange={formik.handleChange}
                required
                // error={deliveryType === 'HOME_DELIVERY' && values['road_no'] === ''}
                helperText={
                  // deliveryType === 'HOME_DELIVERY' && values['road_no'] === '' ? 'Required road no.' : ''
                  ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="house_no"
                label="House No*"
                value={
                  deliveryType !== 'HOME_DELIVERY' ? '' : formik.values.house_no
                }
                placeholder="House No..."
                onChange={formik.handleChange}
                required
                // error={
                //   formik.touched.road_no &&
                //   Boolean(formik.errors.road_no)
                // }
                // helperText={
                //   formik.touched.receiver_country && formik.errors.receiver_country
                // }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                name="others"
                label="Others*"
                value={
                  values['receiver_delivery_type'] !== 'HOME_DELIVERY'
                    ? ''
                    : formik.values.others
                }
                placeholder="Others..."
                onChange={formik.handleChange}
                required
                // error={
                //   formik.touched.road_no &&
                //   Boolean(formik.errors.road_no)
                // }
                // helperText={
                //   formik.touched.receiver_country && formik.errors.receiver_country
                // }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}
