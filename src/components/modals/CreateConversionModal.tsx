/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  styled,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { CONVERSION_EDIT_ACTION } from '../../pages/payment/conversionRate/constanst'
import { DANGER } from '../../redux/feature/notification/constant'
import { useAppSelector } from '../../redux/hook'

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
      padding: '10px 12px',
    },
  }
})
export default function CreateConversionModal({
  open,
  handleClose,
  createConversion,
  updateConversion,
}) {
  // State for all form fields
  const [formValues, setFormValues] = useState({
    name: '',
    conversionRate: '',
    currencyCode: '',
    code: '',
    shortName: '',
  })
  // useEffect(() => {
  //   if (isOpen) {
  //     if (selectAction === CONVERSION_EDIT_ACTION && selectedRow) {
  //       setCategory(selectedRow?.name || '')
  //     } else {
  //       setCategory('')
  //     }
  //   }
  // }, [isOpen, selectAction, selectedRow])
  // Single handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const { selectAction } = useAppSelector(state => state.payment)
  const handleSubmit = async () => {
    const action =
      selectAction === CONVERSION_EDIT_ACTION
        ? updateConversion
        : createConversion
    // const payload =
    //   selectAction === CONVERSION_EDIT_ACTION
    //     ? {

    //       }
    //     : {

    //       }
    const payload = formValues

    await action(payload).then(data => {
      if (data?.data?.success) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: ` ${selectAction === CONVERSION_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(
        //   setMessage(
        //     ` ${selectAction === CONVERSION_EDIT_ACTION ? 'Updated' : 'Created'} successfully!`,
        //   ),
        // )
      } else if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.details?.name[0],
            type: DANGER,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })
  }

  // const isFormValid = selectedProduct?.value && charge && country

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="expense-modal-title"
      aria-describedby="expense-modal-description"
    >
      <Box sx={style}>
        <h2 id="expense-modal-title">{` ${selectAction === CONVERSION_EDIT_ACTION ? 'Update ' : 'Create '} Conversion Rate`}</h2>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>Name*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="name"
            type="text"
            placeholder="Name"
            margin="normal"
            value={formValues.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl style={{ width: '100%' }}>
          <FormLabel>Conversion Rate*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="conversionRate"
            type="text"
            placeholder="Conversion Rate"
            margin="normal"
            value={formValues.conversionRate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel>Currency Code*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="currencyCode"
            type="text"
            placeholder="Currency Code"
            margin="normal"
            value={formValues.currencyCode}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel>Code*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="code"
            placeholder="Code"
            type="text"
            margin="normal"
            value={formValues.code}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <FormLabel>Short Name*</FormLabel>
          <InputFieldComponent
            fullWidth
            name="shortName"
            type="text"
            placeholder="Short Name"
            margin="normal"
            value={formValues.shortName}
            onChange={handleChange}
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
