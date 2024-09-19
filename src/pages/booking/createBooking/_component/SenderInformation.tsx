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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetCustomersByCountryCodeAndSearchInputQuery } from '../../../../redux/feature/booking/bookingApi'
import { setSenderCountryCode } from '../../../../redux/feature/booking/bookingSlice'
import { useAppSelector } from '../../../../redux/hook'
import useDebounce from '../../../../utils/useDebounce'
import InputField from './InputField'
import BookingPhoneInput from './PhoneInput'
import SelectField from './SelectField'

export default function SenderInformation({ formik }: { formik: any }) {
  const {
    phoneCodeWiseSenderCountryState,
    senderCountryFlag,
    senderCountryCode,
  } = useAppSelector(state => state.booking)

  const { userInfo } = useAppSelector(state => state.auth)
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const debouncedSearchTerm = useDebounce(inputValue, 300)
  const [options, setOptions] = useState([])
  const theme = useTheme()
  const shouldSkip =
    !inputValue ||
    options.some((option: { label: string }) =>
      option.label.includes(inputValue),
    )
  const { data } = useGetCustomersByCountryCodeAndSearchInputQuery(
    {
      countryCode: senderCountryCode,
      searchInputValue: debouncedSearchTerm,
    },
    { skip: !debouncedSearchTerm },
  )
  
  const { values } = useFormikContext<any>()
  const freightCategoryOption = [
    {
      value: null,
      label: 'Select Freight',
    },
    {
      value: 'AIR_FREIGHT',
      label: 'Air Freight',
    },
    {
      value: 'SEA_FREIGHT',
      label: 'Sea Freight',
    },
    {
      value: 'WEAREHOUSE',
      label: 'Warehouse',
    },
  ]
  useEffect(() => {

    if (data?.data?.length > 0) {
     
      const formattedOptions = data?.data?.map(
        (item: { phone: string; id: any; country: { id?: number } }) => {
          return {
            label: item.phone,
            value: item.id,
          }
        },
      )
      setOptions(formattedOptions)
    } else {
      setOptions([])
    }
  }, [data?.data])

  const cityOptions = () => {
    return phoneCodeWiseSenderCountryState?.states?.map(
      (item: { name: any; id: any }) => {
        return {
          label: item.name,
          value: item.id,
        }
      },
    )
  }

  const areaOptions = () => {
    if (values['choose_city']) {
      const selectedCity = phoneCodeWiseSenderCountryState?.states?.find(
        (state: { id: string }) =>
          state.id === values['choose_city']?.id ||
          state.id === values['choose_city'],
      )

      return (
        selectedCity?.cities?.map((item: { name: string; id: string }) => {
          return {
            label: item.name,
            value: item.id,
          }
        }) || []
      )
    }
    return []
  }

  const countryCodeWiseOnChange = (phone: any, country: any) => {
    const { dialCode } = country
    const dialCodeLength = dialCode.length
    dispatch(setSenderCountryCode(dialCode))
    console.log(phone)
    if (phone) {
      formik.setFieldValue('phone', phone)
      const numberWithoutDialCode = phone?.slice(dialCodeLength)
      setInputValue(phone)
    }
  }
  // console.log(phoneCodeWiseSenderCountryState)
  useEffect(() => {
    if (phoneCodeWiseSenderCountryState?.name) {
      formik.setFieldValue('country', phoneCodeWiseSenderCountryState?.name)
      formik.setFieldValue('countryId', phoneCodeWiseSenderCountryState?.id)
    }
  }, [phoneCodeWiseSenderCountryState])

  const getSelectedLabel = (selectedValue: any) => {
    const selectedOption = cityOptions()?.find(
      (option: { value: any }) => option.value === selectedValue,
    )
    return selectedOption
  }
  useEffect(() => {
    if (formik.values['choose_city']) {
      const s = getSelectedLabel(formik.values['choose_city'])
      // console.log(s)
      if (s) {
        formik.setFieldValue('choose_city_name', s.label)
      }
    }
  }, [formik.values['choose_city']])
  // console.log(formik.values)
  return (
    <Box p={3} borderRadius={2} border="1px solid#EFF3F4">
      <Typography variant="h6" gutterBottom>
        Sender Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <BookingPhoneInput
            name="phone"
            label="Phone"
            value={formik.values.phone}
            selectedCountry={senderCountryFlag}
            countryCodeWiseOnChange={countryCodeWiseOnChange}
            onBlur={() => {
              formik.setFieldTouched('phone', true)
            }}
            shouldSkip={shouldSkip}
            options={options}
            isSender={true}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            errorMessage={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="name"
            label="Name*"
            value={formik.values.name}
            placeholder="Name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="email"
            label="Email*"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="country"
            label="Country*"
            // value={
            //   // formik.values.country.id
            //   //   ? formik.values.country.name
            //   //   : formik.values.country
            //   formik.values.country && formik.values.country
            // }
            value={
              typeof formik.values.country === 'object'
                ? formik.values.country.name
                : formik.values.country
            }
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            disable
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name="freight_category"
            label="Freight Category*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.freight_category}
            data={freightCategoryOption}
            error={
              formik.touched.freight_category &&
              Boolean(formik.errors.freight_category)
            }
            errorMessage={formik.errors.freight_category}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Autocomplete
            value={formik.values.choose_city} options={cityOptions() || []} renderInput={(params) => <TextField {...params} />} /> */}
          <FormControl sx={{ width: '100%' }}>
            <FormLabel sx={{ fontSize: '16px', color: '#424642' }}>
              Choose City
            </FormLabel>{' '}
            <Autocomplete
              // name="choose_city"
              value={
                cityOptions()?.find(
                  city => city.value === formik.values.choose_city,
                ) || null
              }
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  'choose_city',
                  newValue ? newValue.value : '',
                ) // Set the ID (e.g., 232)
              }}
              onBlur={formik.handleBlur}
              options={cityOptions() || []} // Assuming this returns an array of cities
              getOptionLabel={option => option.label || ''} // Adjust if city options have a different structure
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
                    formik.touched.choose_city &&
                    Boolean(formik.errors.choose_city)
                  }
                  helperText={
                    formik.touched.choose_city && formik.errors.choose_city
                  }
                />
              )}
            />{' '}
          </FormControl>
          {/* <SelectField
            name="choose_city"
            value={formik.values.choose_city}
            // e => {
            //   formik.handleChange
            //   const s = getSelectedLabel(e.target.value)
            //   console.log(s)
            //   // formik.setValue()
            // }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Choose City"
            data={cityOptions()}
            error={
              formik.touched.choose_city && Boolean(formik.errors.choose_city)
            }
            errorMessage={formik.errors.choose_city}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel sx={{ fontSize: '16px', color: '#424642' }}>
              Choose Area
            </FormLabel>{' '}
            <Autocomplete
              // name="choose_area"
              sx={{}}
              value={
                areaOptions()?.find(
                  (area: { value: any }) =>
                    area.value === formik.values.choose_area,
                ) || null
              }
              onChange={(_event, newValue) => {
                formik.setFieldValue(
                  'choose_area',
                  newValue ? newValue.value : '',
                )
              }}
              onBlur={formik.handleBlur}
              options={areaOptions() || []}
              getOptionLabel={option => option.label || ''}
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
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
                    formik.touched.choose_area &&
                    Boolean(formik.errors.choose_area)
                  }
                  helperText={
                    formik.touched.choose_area && formik.errors.choose_area
                  }
                />
              )}
            />{' '}
          </FormControl>
          {/* <SelectField
            name="choose_area"
            value={formik.values.choose_area || formik.values.choose_area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Choose Area"
            data={areaOptions()}
            error={
              formik.touched.choose_area && Boolean(formik.errors.choose_area)
            }
            errorMessage={formik.errors.choose_area}
          /> */}
        </Grid>
      </Grid>
    </Box>
  )
}
