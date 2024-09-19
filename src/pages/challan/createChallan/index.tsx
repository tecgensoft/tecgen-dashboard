/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { useCreateChallanMutation } from '../../../redux/feature/challan/ChalanApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
import { CommonInput } from '../../../components/CommonInput'
import { DANGER, SUCCESS } from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../redux/hook'
export const InputFieldComponent = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '&& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px',
    },
    '&& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px',
    },
  }
})
export default function CreateChallan() {
  const theme = useTheme()
  const [createChallan, { isLoading }] = useCreateChallanMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [formValues, setFormValues] = useState({
    driver_name: '',
    delivery_man: '',
    destination: '',
    car_number: '',
    driver_number: '',
  })
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    const updatedFormValues = { ...formValues, [name]: value }
    setFormValues(updatedFormValues)

    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(updatedFormValues).some(
      fieldValue => fieldValue === '',
    )
    setIsSubmitDisabled(isAnyFieldEmpty)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const newData = {
      driver_name: formValues.driver_name,
      delivery_man: formValues.delivery_man,
      destination: formValues.destination,
      car_number: formValues.car_number,
      driver_number: formValues.driver_number,
    }
    await createChallan(newData).then(data => {
      if (data?.data?.success) {
        navigate('/challan/challan_history')
        dispatch(
          setNotification({
            open: true,
            message: 'Challan created Successfully',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Challan created Successfully'))
      }
      if (data?.error) {
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.message,
            type: DANGER,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.message))
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            bgcolor:
              theme?.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : 'white',
            borderRadius: '8px',
            minHeight: 'auto',
            padding: '24px',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 500, marginBottom: '32px' }}
          >
            Create New Challan
          </Typography>
          <Box
            sx={{
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(67, 67, 67, 1)' : 'rgba(239, 243, 244, 1)'}`,
              borderRadius: '16px',
              padding: isSmallScreen
                ? '30px 10px'
                : isMediumScreen
                  ? '40px'
                  : '78px 144px',
              margin: '24px 0',
            }}
          >
            <Grid container spacing={4}>
              <Grid item md={12} lg={6}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={{ fontSize: '12px', marginBottom: 2 }}>
                    Driver Name*
                  </FormLabel>
                  <CommonInput
                    name="driver_name"
                    fullWidth
                    margin="normal"
                    placeholder="Driver Name"
                    value={formValues.driver_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={{ fontSize: '12px', marginBottom: 2 }}>
                    Driver Phone*
                  </FormLabel>
                  <CommonInput
                    name="driver_number"
                    fullWidth
                    margin="normal"
                    placeholder="Driver Phone"
                    value={formValues.driver_number}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={{ fontSize: '12px', marginBottom: 2 }}>
                    Vehicle Number*
                  </FormLabel>
                  <CommonInput
                    name="car_number"
                    fullWidth
                    margin="normal"
                    placeholder="Vehicle Number"
                    value={formValues.car_number}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} lg={6}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={{ fontSize: '12px', marginBottom: 2 }}>
                    Destination*
                  </FormLabel>
                  <CommonInput
                    name="destination"
                    fullWidth
                    margin="normal"
                    placeholder="Destination"
                    value={formValues.destination}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={{ fontSize: '12px', marginBottom: 2 }}>
                    Delivery Man*
                  </FormLabel>
                  <CommonInput
                    name="delivery_man"
                    fullWidth
                    margin="normal"
                    placeholder="Delivery Man"
                    value={formValues.delivery_man}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                sx={{ padding: '4px 16px' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
