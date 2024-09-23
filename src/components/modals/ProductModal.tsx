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
import { useEffect, useState } from 'react'
import { SUCCESS, WARNING } from '../../constant/constant'
import {
    EDIT_ACTION,
    productType,
} from '../../pages/ProductManagement/Product/constant'
// import {
//   setMessage,
//   setOpen,
//   setType,
// } from '../../redux/feature/notification/notificationSlice'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'

export default function ProductModal({
  updateProduct,
  createProduct,
  isOpen,
  setIsOpen,
  selectedRow,
}) {
  const { selectAction } = useAppSelector(state => state?.select)

  const [selectedType, setSelectedType] = useState('')
  const [selectedName, setSelectedName] = useState('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      if (selectAction === EDIT_ACTION && selectedRow) {
        setSelectedType(selectedRow?.product_type || productType[0].name)
        setSelectedName(selectedRow?.name || '')
      } else {
        setSelectedType(productType[0].name)
        setSelectedName('')
      }
    }
  }, [isOpen, selectAction, selectedRow])

  const handleProduct = async () => {
    const productData = {
      name: selectedName,
      product_type: selectedType,
    }

    const action = selectAction === EDIT_ACTION ? updateProduct : createProduct
    const payload =
      selectAction === EDIT_ACTION
        ? { id: selectedRow?.id, ...productData }
        : productData

    await action(payload).then(data => {
      if (data?.data?.success) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: `Product ${selectAction === EDIT_ACTION ? 'updated' : 'created'} successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))

        // dispatch(setType(SUCCESS))
        // dispatch(
        //   setMessage(
        //     `Product ${selectAction === EDIT_ACTION ? 'updated' : 'created'} successfully!`,
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
        // dispatch(setType(DANGER))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })
  }

  const isFormValid = selectedName !== '' && selectedType !== ''

  return (
    <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {`${selectAction === EDIT_ACTION ? 'Edit' : 'Create'}`} Product
      </DialogTitle>
      <DialogContent>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Product Name</span>
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </FormLabel>
          <CommonInput
            placeholder="Product Name"
            variant="outlined"
            onChange={e => setSelectedName(e?.target?.value)}
            value={selectedName}
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
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            {' '}
            <span style={{ fontSize: '12px' }}>Select Product Type </span>
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </FormLabel>
          <Select
            displayEmpty
            value={selectedType}
            onChange={e => setSelectedType(e?.target?.value)}
            input={<OutlinedInput />}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              height: '42px',
              bgcolor: theme =>
                theme.palette.mode === 'light' ? 'white' : '#464646',
            }}
          >
            {productType?.map(product => (
              <MenuItem key={product?.key} value={product?.name}>
                {product?.name}
              </MenuItem>
            ))}
          </Select>
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
