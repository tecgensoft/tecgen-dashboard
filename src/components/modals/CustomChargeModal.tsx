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
  TextField,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { EDIT_ACTION } from '../../pages/ProductManagement/Product/constant'

import {
  useGetCountryQuery,
  useGetSelectProductListQuery,
} from '../../redux/feature/customCharges/CustomChargesApi'

import { CUSTOM_EDIT_ACTION } from '../../pages/ProductManagement/customCharge/constant'
import { SUCCESS, WARNING } from '../../redux/feature/notification/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import useDebounce from '../../utils/useDebounce'
import { AutoCompleteField } from '../AutoCompleteField'
import { CommonInput } from '../CommonInput'
// import '../style.css'

export default function CustomChargeModal({
  updateCustomCharge,
  createCustomCharge,
  isOpen,
  setIsOpen,
  selectedRow,
}) {
  const { selectAction } = useAppSelector(state => state?.select)

  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [selectedProduct, setSelectedProduct] = useState({})
  const [charge, setCharge] = useState('')
  const [country, setCountry] = useState('')
  const [disabled, setDisabled] = useState(false)

  const { data } = useGetSelectProductListQuery(
    {
      search: debouncedSearchTerm,
    },
    { skip: debouncedSearchTerm?.length < 3 },
  )
  const { data: countries } = useGetCountryQuery(undefined)

  // console.log(selectedProduct)
  const handleAutocompleteChange = (event, value) => {
    setSelectedProduct(value)
  }
  useEffect(() => {
    setOptions(data)
    setSearchTerm('')
  }, [debouncedSearchTerm])
  const handleProductName = e => {
    setSearchTerm(e.target.value)
  }
  useEffect(() => {
    if (isOpen) {
      if (selectAction === EDIT_ACTION && selectedRow) {
        setDisabled(true)
        setSelectedProduct({
          label: selectedRow?.product?.name,
          value: selectedRow?.product?.id,
        })
        setCountry(selectedRow?.country?.id)
        setCharge(selectedRow?.custom_charge)
      }
      //else {
      //   setSelectedType(productType[0].name)
      //   setSelectedName('')
      // }
    }
  }, [isOpen, selectAction, selectedRow])

  const handleProduct = async () => {
    const action =
      selectAction === CUSTOM_EDIT_ACTION
        ? updateCustomCharge
        : createCustomCharge
    const payload =
      selectAction === CUSTOM_EDIT_ACTION
        ? {
            id: selectedRow?.id,

            custom_charge: charge,
          }
        : {
            country: country,

            custom_charge: charge,
            product: selectedProduct?.value,
          }

    await action(payload).then(data => {
      if (data?.data?.success) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: ` ${selectAction === CUSTOM_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(
        //   setMessage(
        //     ` ${selectAction === CUSTOM_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
        //   ),
        // )
      } else if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.details?.name[0],
            type: WARNING,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })
  }

  const isFormValid = selectedProduct?.value && charge && country

  return (
    <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {`${selectAction === EDIT_ACTION ? 'Edit' : 'Create'}`} Custom Charge
      </DialogTitle>
      <DialogContent>
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
                color: theme?.palette?.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Product Name
            </span>{' '}
            <span
              style={{
                color: theme.palette.secondary.main,
              }}
            >
              *
            </span>
          </FormLabel>
          <AutoCompleteField
            className="autoField"
            options={options || []}
            getOptionLabel={option => option.label || ''}
            // sx={{ width: '100%' }}
            onChange={handleAutocompleteChange}
            value={selectedProduct}
            disabled={disabled}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Search for products"
                variant="outlined"
                onChange={e => handleProductName(e)}
              />
            )}
          />{' '}
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ width: '100%' }}
        >
          <FormLabel
            sx={{
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            {' '}
            <span
              style={{
                fontSize: '12px',
                color: theme?.palette?.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Choose Country{' '}
            </span>{' '}
            <span
              style={{
                color: theme.palette.secondary.main,
              }}
            >
              *
            </span>
          </FormLabel>
          <Select
            displayEmpty
            value={country}
            onChange={e => setCountry(e?.target?.value)}
            input={<OutlinedInput />}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              height: '42px',
              bgcolor: theme =>
                theme.palette.mode === 'light' ? 'white' : '#464646',
            }}
            disabled={disabled}
          >
            <MenuItem key={''} value={''} disabled>
              Select Country
            </MenuItem>
            {countries?.map(country => {
              return (
                <MenuItem key={country?.value} value={country?.value}>
                  {country?.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              // marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Custom Charge</span>
            <span
              style={{
                color: theme.palette.secondary.main,
              }}
            >
              *
            </span>
          </FormLabel>
          <CommonInput
            placeholder="Custom Charge"
            className="no-spinner"
            variant="outlined"
            type="number"
            value={charge}
            onChange={e => setCharge(e.target.value)}
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
          onClick={handleProduct}
          disabled={!isFormValid}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// formData.append('date', expenseDate)
//     formData.append('expense_by', 'expenseBy')
//     formData.append('expense_category', 109)
//     formData.append('branch', 55)
//     formData.append('local_amount', 678)
//     formData.append('note', note)
