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
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetCountryQuery } from '../../redux/feature/customCharges/CustomChargesApi'
import {
  setMessage,
  setNotification,
  setOpen,
} from '../../redux/feature/notification/notificationSlice'
import { useCreateShipmentMutation } from '../../redux/feature/shipment/shipmentApi'
import { DANGER, SUCCESS } from '../../redux/feature/notification/constant'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'rgba(239, 243, 244, 1)',
  boxShadow: 24,
  p: 14,
  borderRadius: 2,
  backgroundColor: theme =>
    theme.palette.mode === 'dark' ? '#202020' : '#fff',
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
    },
  }
})
export default function CreateShipmentModal({ open, handleClose }) {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const [country, setCountry] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const dispatch = useDispatch()
  const { data: countries } = useGetCountryQuery(undefined)

  const [createShipment] = useCreateShipmentMutation()

  const handleSubmit = async () => {
    const newData = {
      end_date: endDate,
      start_date: startDate,
      freight_category: category,
      to_country: country,
    }

    await createShipment(newData).then(data => {
      if (data?.data?.success) {
        handleClose()
        dispatch(
          setNotification({
            open: true,
            message:`Shipment created successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(`Shipment created successfully!`))
        handleClose()
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
    // const action =
    //   selectAction === EXPENSE_EDIT_ACTION ? updateExpense : createExpense
    // const payload =
    //   selectAction === EXPENSE_EDIT_ACTION
    //     ? {
    //         id: item?.id,
    //         date: expenseDate,

    //         expense_by: expenseBy,
    //         expense_category: category,
    //         branch: branch,
    //         local_amount: amount,
    //         note: note,
    //       }
    //     : formData
    // console.log(payload, formData)
    // await action(payload).then(data => {
    //   if (data?.data?.success) {
    //     handleClose()
    //     dispatch(setOpen(true))
    //     dispatch(
    //       setMessage(
    //         ` ${selectAction === EXPENSE_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
    //       ),
    //     )
    //   } else if (data?.error) {
    //     handleClose()
    //     dispatch(setOpen(true))
    //     dispatch(setMessage(data?.error?.data?.details?.name[0]))
    //   }
    // })
    // // Reset form fields after submission
    // setExpenseDate('')
    // setExpenseBy('')
    // setCategory('')
    // setBranch('')
    // setReceiptFile(null)
    // setAmount('')
    // setNote('')
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="expense-modal-title"
      aria-describedby="expense-modal-description"
    >
      <Box sx={style}>
        <h2 id="expense-modal-title">Create New Shipment</h2>

        <FormControl fullWidth>
          <FormLabel>To Country*</FormLabel>
          <SelectFieldComponent
            value={country}
            onChange={e => setCountry(e.target.value as string)}
          >
            <MenuItem value="" disabled>
              Select Country
            </MenuItem>
            {countries?.map((country: any) => (
              <MenuItem value={country?.value}>{country?.label}</MenuItem>
            ))}
          </SelectFieldComponent>
        </FormControl>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>From Date*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="start"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            margin="normal"
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel>TO Date*</FormLabel>
          <InputFieldComponent
            fullWidth
            type="date"
            name="end"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Freight Category *</FormLabel>
          <SelectFieldComponent
            value={category}
            onChange={e => setCategory(e.target.value as string)}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="AIR_FREIGHT">Air Freight</MenuItem>
            <MenuItem value="SEA_FREIGHT">Sea Freight</MenuItem>
            <MenuItem value="WEAREHOUSE">Warehouse</MenuItem>
          </SelectFieldComponent>
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
