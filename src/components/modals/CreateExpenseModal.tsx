/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { EXPENSE_EDIT_ACTION } from '../../pages/officeExpense/officeExpenseList/constant'
import {
  setMessage,
  setNotification,
  setOpen,
} from '../../redux/feature/notification/notificationSlice'
import { useGetOfficeExpenseBranchForSelectQuery } from '../../redux/feature/officeExpense/officeExpenseApi'
import { useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'
import { DANGER, SUCCESS } from '../../redux/feature/notification/constant'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  backgroundColor: theme =>
    theme.palette.mode === 'dark' ? '#202020' : '#fff',
  boxShadow: 24,
  p: 14,
  borderRadius: 2,
}
const SelectFieldComponent = styled(Select)(({ theme }) => {
  // const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        background: theme.palette.mode === 'dark' ? '#464646' : 'white',
        height: '30px',
        borderRadius: '8px',
      },
  }
})

export const InputFieldComponent = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      backgroundColor: mode === 'dark' ? '#464646' : 'white',
      borderRadius: '8px',
    },
  }
})
export default function ExpenseModal({
  open,
  handleClose,
  item,
  createExpense,
  updateExpense,
  expenseCategory,
}) {
  const [expenseDate, setExpenseDate] = useState<string>('')
  const [expenseBy, setExpenseBy] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [branch, setBranch] = useState<string>('')
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [existingReceiptFile, setExistingReceiptFile] = useState<string | null>(
    null,
  )
  const [amount, setAmount] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const dispatch = useDispatch()
  const { selectAction } = useAppSelector(state => state?.select)
  console.log("item,", item)
  useEffect(() => {
    if (item) {
      setExpenseDate(item.date || '')
      setExpenseBy(item.expense_by || '')
      setCategory(item.expense_category?.id?.toString() || '')
      setBranch(item.branch?.id?.toString() || '')
      setAmount(item.local_amount?.toString() || '')
      setNote(item.note || '')
      setExistingReceiptFile(item.file || null)
    }
  }, [item])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setReceiptFile(event.target.files[0])
      setExistingReceiptFile(null) // Clear the existing file when a new one is selected
    }
  }
  // const { data } = useGetOfficeExpenseCategoryQuery({
  //   page: 1,
  // })

  const { data: branches } = useGetOfficeExpenseBranchForSelectQuery({
    page: 1,
  })

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('date', expenseDate)
    formData.append('expense_by', expenseBy)
    formData.append('expense_category', category)
    formData.append('branch', branch)
    formData.append('local_amount', amount)
    formData.append('note', note)

    // If a new file is selected, append it to the form data
    if (receiptFile) {
      formData.append('file', receiptFile)
    } else if (existingReceiptFile) {
      // If no new file is selected, append the existing file's identifier
      formData.append('existing_file', existingReceiptFile)
    }
    let newData
    if (selectAction === EXPENSE_EDIT_ACTION && item) {
      newData = {
        id: item?.id,
        formData: formData,
      }
    }

    const action =
      selectAction === EXPENSE_EDIT_ACTION ? updateExpense : createExpense
    const payload = selectAction === EXPENSE_EDIT_ACTION ? newData : formData
    await action(payload).then(data => {
      if (data?.data?.success) {
        handleClose()
        dispatch(
          setNotification({
            open: true,
            message:` ${selectAction === EXPENSE_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(
        //   setMessage(
        //     ` ${selectAction === EXPENSE_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
        //   ),
        // )
      } else if (data?.error) {
        handleClose()
        dispatch(
          setNotification({
            open: true,
            message:data?.error?.data?.details?.name[0],
            type: DANGER,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })

    // Reset form fields after submission
    setExpenseDate('')
    setExpenseBy('')
    setCategory('')
    setBranch('')
    setReceiptFile(null)
    setExistingReceiptFile(null)
    setAmount('')
    setNote('')
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="expense-modal-title"
      aria-describedby="expense-modal-description"
    >
      <Box sx={style}>
        <h2 id="expense-modal-title">{` ${selectAction === EXPENSE_EDIT_ACTION ? 'Update Expense' : 'Add Expense'}`}</h2>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>Expenses Date*</FormLabel>
          <CommonInput
            fullWidth
            type="date"
            value={expenseDate}
            onChange={e => setExpenseDate(e.target.value)}
            margin="normal"
          />
        </FormControl>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>Expenses By*</FormLabel>
          <CommonInput
            fullWidth
            value={expenseBy}
            onChange={e => setExpenseBy(e.target.value)}
            margin="normal"
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Category*</FormLabel>
          <Select
            sx={{ height: '42px' }}
            value={category}
            onChange={e => setCategory(e.target.value as string)}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {expenseCategory?.map((eCategory: any) => (
              <MenuItem value={eCategory?.value}>{eCategory?.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Branch*</FormLabel>
          <Select
            sx={{ height: '42px' }}
            value={branch}
            onChange={e => setBranch(e.target.value as string)}
          >
            <MenuItem value="" disabled>
              Select Branch
            </MenuItem>
            {branches?.map((branch: any) => (
              <MenuItem value={branch?.value}>{branch?.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          component="label"
          variant="contained"
          color="primary"
          sx={{ margin: '5px 0', padding: '6px 20px' }}
        >
          Upload Receipt
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {receiptFile && <Typography>{receiptFile.name}</Typography>}
        {!receiptFile && existingReceiptFile && (
          <Typography sx={{ fontSize: '14px' }}>
            {existingReceiptFile?.split('/').pop()}
          </Typography>
        )}
        <FormControl style={{ width: '100%' }}>
          <FormLabel>Amount*</FormLabel>
          <CommonInput
            fullWidth
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            margin="normal"
          />
        </FormControl>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>Note*</FormLabel>
          <TextareaAutosize
            minRows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ padding: '6px 20px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            sx={{ marginLeft: '10px', padding: '6px 20px' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
