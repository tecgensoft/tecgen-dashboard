import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CommonInput } from '../../../components/CommonInput'
import {
  useAddLotToChallanMutation,
  useCompleteChallanMutation,
} from '../../../redux/feature/challan/ChalanApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
import {
  DANGER,
  SUCCESS,
  WARNING,
} from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../redux/hook'
import '../style.css'
import DataTable from './_component/Table'
export default function ChallanLot() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [addLotToChallan] = useAddLotToChallanMutation()
  const [completeChallan] = useCompleteChallanMutation()
  const [lotRef, setLotRef] = useState('')
  const { state } = useLocation()
  const [updateState, setUpdateState] = useState(false)
  const dispatch = useAppDispatch()
  // console.log(state)
  const handleSubmit = async () => {
    if (!lotRef) {
      dispatch(
        setNotification({
          open: true,
          message: 'Please add lot reference',
          type: WARNING,
        }),
      )
      return
    }

    const newData = {
      delivery_challan: state?.id,
      lot: lotRef?.trim(),
      type: 'IN',
    }
    await addLotToChallan(newData).then(data => {
      if (data?.data?.success) {
        dispatch(
          setNotification({
            open: true,
            message: 'Lot added Successfully',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Lot added Successfully'))
        setLotRef('')
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
  const handleCompleteChallan = async () => {
    const newData = { id: state?.id, data: { status: 'DONE' } }
    await completeChallan(newData).then(data => {
      if (data?.data?.success) {
        // dispatch(setOpen(true))
        // dispatch(setMessage('Completed'))
        dispatch(
          setNotification({
            open: true,
            message: 'Completed',
            type: SUCCESS,
          }),
        )
        setUpdateState(true)
        setLotRef('')
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
    <Box
      className="customers"
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: isSmallScreen ? '20px 10px' : '33px 24px',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="subtitle1"
        style={{ fontWeight: 500, marginBottom: '24px' }}
      >
        {updateState || state?.item?.status === 'DONE'
          ? 'Challan Lots List'
          : 'Add Challan Lots'}
      </Typography>
      {!(updateState || state?.item?.status === 'DONE') && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            sx={{ marginBottom: '10px' }}
          >
            {' '}
            <Grid item lg={3}>
            
              <FormControl fullWidth sx={{ marginBottom: 0 }}>
                {/* <FormLabel>Add lot</FormLabel> */}
                <CommonInput
                  name="lot"
                  fullWidth
                  margin="normal"
                  placeholder="Add Lot"
                  value={lotRef}
                  onChange={e => setLotRef(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item lg={1}>
              {' '}
              <Button
                variant="contained"
                sx={{
                  padding: '0px 16px',
                  height: '38px',
                  borderRadius: '8px',
                  margin: '0 4px',
                }}
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              padding: '0px 16px',
              height: '38px',
              borderRadius: '8px',
              margin: '0 4px',
            }}
            onClick={handleCompleteChallan}
          >
            Complete
          </Button>
        </Box>
      )}
      {(updateState || state?.item?.status === 'DONE') && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'space-between',
          }}
        >
          {isSmallScreen ? (
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: isSmallScreen ? '5px 0' : '16px 0' }}
            >
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  placeholder="Search"
                  // value={searchTerm} // Bind search term state to input
                  // onChange={handleSearchChange} // Update search term state on input change
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GridSearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    padding: '2px 0',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'rgba(57, 57, 57, 1)'
                        : 'rgba(239, 243, 244, 1)',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
        </Box>
      )}
      <DataTable text={''} updateState={updateState} state={state} />
    </Box>
  )
}
