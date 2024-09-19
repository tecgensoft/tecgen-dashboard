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
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { EDIT_ACTION } from '../../pages/ProductManagement/Product/constant'
import {
  setMessage,
  setNotification,
  setOpen,
} from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'
import { DANGER, SUCCESS } from '../../redux/feature/notification/constant'

export default function ExpenseCategoryModal({
  updateProduct,
  createCategory,
  isOpen,
  setIsOpen,
  selectedRow,
}) {
  const { selectAction } = useAppSelector(state => state?.select)

  const [category, setCategory] = useState('')

  const dispatch = useAppDispatch()
  // console.log(selectedRow)
  const handleCategory = async () => {
    const categoryData = {
      name: category,
    }

    const action = selectAction === EDIT_ACTION ? updateProduct : createCategory
    const payload =
      selectAction === EDIT_ACTION
        ? { id: selectedRow?.id, ...categoryData }
        : categoryData

    await action(payload).then(data => {
      if (data?.data?.success) {
        setIsOpen(false)
        // dispatch(setOpen(true))
        // dispatch(
        //   setMessage(
        //     `Category ${selectAction === EDIT_ACTION ? 'updated' : 'created'} successfully!`,
        //   ),
        // )
        dispatch(
          setNotification({
            open: true,
            message: `Category ${selectAction === EDIT_ACTION ? 'updated' : 'created'} successfully!`,
            type:SUCCESS,
          }),
        )
      } else if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.details?.name[0],
            type:DANGER,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })
  }
  useEffect(() => {
    if (isOpen) {
      if (selectAction === EDIT_ACTION && selectedRow) {
        setCategory(selectedRow?.name || '')
      } else {
        setCategory('')
      }
    }
  }, [isOpen, selectAction, selectedRow])
  const isFormValid = category !== ''

  return (
    <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle align="center">
        {`${selectAction === EDIT_ACTION ? 'Update' : 'Create'}`} Expense
        Category
      </DialogTitle>
      <DialogContent>
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Category Name</span>
            <span>*</span>
          </FormLabel>
          <CommonInput
            placeholder="Category Name"
            variant="outlined"
            onChange={e => setCategory(e?.target?.value)}
            value={category}
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
          onClick={handleCategory}
          disabled={!isFormValid}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
