/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck 
import {
    Box,
    Button,
    ButtonProps,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    useTheme,
} from '@mui/material'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useDispatch } from 'react-redux'
import Toastify from '../../components/Toastify'
import { tracking } from '../../redux/feature/tracking/trackingAction'
import { useAppSelector } from '../../redux/hook'
import TrackingModal from './_components/TrackingModal'

const StyledTableHead = styled(TableHead)(() => {
    const theme = useTheme()
    const mode = theme?.palette?.mode
    return ({
        // 202020
        backgroundColor: mode === 'dark' ? "#121212" : "#EFF3F4",
        borderRadius: '8px',
        '& .MuiTableCell-root': {
            borderBottom: 'none',
            color: '#999999',
        },
    })
})
interface PaymentButtonProps extends ButtonProps {
    paymentStatus: 'PAID' | 'UNPAID'
}
const StyledTableRow = styled(TableRow)(() => {
    const theme = useTheme()
    const mode = theme?.palette?.mode
    return ({
        backgroundColor: mode === 'dark' ? '#3737377e' : '#fff',
        border: `1px solid  ${mode === 'dark' ? '#3737377e' : '#D9E3E7'} `,
        height: '40px',
    })
})

const StyledPaymentButton = styled(Button)<PaymentButtonProps>(
    ({ paymentStatus }) => ({
        color: paymentStatus === 'PAID' ? '#02BF6C' : '#EA244E',
        backgroundColor: paymentStatus === 'PAID' ? '#24bb7c1d' : '#ea244f1f',
    }),
)
export default function Tracking() {
    const theme = useTheme()
    const mode = theme?.palette?.mode
    const [open, setOpen] = useState(false)
    const { tracking: trackData, success } = useAppSelector(
        state => state.tracking,
    )
    const {
        sl_no,
        reference,
        payment_status,
        from,
        booking_date,
        total_lot,
        status,
        to,
    } = trackData || {}
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        reference: '',
        bookingType: 'reference',
        bookingDays: 'last_seven_days',
    })

    const [formErrors, setFormErrors] = useState<{
        reference: string | null | undefined
        bookingType: string | null | undefined
        bookingDays: string | null | undefined
    }>({
        reference: '',
        bookingType: '',
        bookingDays: '',
    })
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#EFF3F4',
        border: `1px solid  ${mode === 'light' ? '#D9E3E7' : '#464646'}`,
        borderRadius: '8px',
    }
    const inputStyle = {
        width: '100%',
        height: '40px',
        backgroundColor: mode === 'light' ? '#EFF3F4' : '#464646',
        border: 'none',
        color: mode === 'light' ? '#999999' : '#848484',
        fontSize: '16px',
        outline: 'none',
    }
    const buttonStyle = {
        backgroundColor: mode === 'light' ? '#EFF3F4' : '#353434',
        border: 'none',
    }
    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        const trimValue = value.trim()
        setFormValues({
            ...formValues,
            [name]: trimValue,
        })
        setFormErrors({
            ...formErrors,
            [name]: '',
        })
    }
    const validateForm = () => {
        let errors: {
            reference: string | null | undefined
            bookingType: string | null | undefined
            bookingDays: string | null | undefined
        } = {
            reference: undefined,
            bookingType: undefined,
            bookingDays: undefined,
        }
        if (!formValues.reference.trim()) {
            errors.reference = 'Reference is required'
        }
        if (!formValues.bookingType) {
            errors.bookingType = 'Status is required'
        }
        if (!formValues.bookingDays) {
            errors.bookingDays = 'Days is required'
        }
        setFormErrors(errors)

        const hasErrors = Object.values(errors).some(error => error !== undefined)
        return !hasErrors
    }
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (validateForm()) {
            await dispatch(tracking(formValues))
        }
    }

    const bookingType = [
        {
            value: 'reference',
            label: 'Booking Reference No.',
        },
        {
            value: 'sender__phone',
            label: 'Sender Phone',
        },
        {
            value: 'receiver__phone',
            label: 'Receiver Phone',
        },
    ]
    const bookingDaysOption = [
        {
            value: 'last_seven_days',
            label: 'Last 7 Days',
        },
        {
            value: 'last_fourteen_days',
            label: 'Last 14 Days',
        },
        {
            value: 'last_thirty_days',
            label: 'Last 30 Days',
        },
        {
            value: 'last_sixty_days',
            label: 'Last 60 Days',
        },
    ]

    const isEmptyTracking = trackData && Object.keys(trackData).length > 0
    const handleTrackingModal = () => {
        setOpen(true)
    }
    const handleCloseTrackingModal = () => {
        setOpen(false)
    }
    return (
        <Box
            sx={{
                bgcolor: theme =>
                    theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
                padding: { xs: '16px', sm: '16px', md: '32px 24px' },
                height: `calc(100vh - ${140}px)`,
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: { xs: '100%', sm: '90%', md: '80%' },
                    marginX: 'auto',
                }}
            >
                <Typography
                    variant="h6"
                    mb={{ xs: 5, sm: 8, md: 10 }}
                    sx={{
                        fontSize: { xs: '14px', sm: '16px' },
                        fontWeight: '500',
                    }}
                >
                    Track Booking Status
                </Typography>
                <Typography
                    variant="h6"
                    mb={{ xs: 4, sm: 6, md: 8 }}
                    sx={{
                        fontSize: { xs: '12px', sm: '14px' },
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#999999',
                    }}
                >
                    Track booking details in one place with real-time updates. Track
                    product by Sender Phone, Receiver Phone, or Booking Reference No.
                </Typography>
            </Box>
            <Box
                sx={{
                    width: { xs: '100%', sm: '90%', md: '80%' },
                    marginX: 'auto',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} mb={4}>
                        <Grid item xs={12} lg={4}>
                            <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!formErrors.bookingType}
                                sx={{ minWidth: 150 }}
                            >
                                <Select
                                    name="bookingType"
                                    value={formValues.bookingType}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    sx={{ minWidth: 150, height: '42px' }}
                                >
                                    {bookingType?.map(
                                        (item: { label: string; value: number | string }) => (
                                            <MenuItem key={item.value} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ),
                                    )}
                                </Select>
                                <FormHelperText>{formErrors.bookingType}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!formErrors.bookingDays}
                                sx={{ minWidth: 150 }}
                            >
                                <Select
                                    name="bookingDays"
                                    value={formValues.bookingDays}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    displayEmpty
                                    sx={{ minWidth: 150, height: '42px' }}
                                >
                                    {bookingDaysOption?.map(
                                        (item: { label: string; value: number | string }) => (
                                            <MenuItem key={item.value} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ),
                                    )}
                                </Select>
                                <FormHelperText>{formErrors.bookingDays}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            {formValues.bookingType === 'reference' ? (
                                <TextField
                                    name="reference"
                                    label="Reference"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={formValues.reference}
                                    onChange={handleInputChange}
                                    error={!!formErrors.reference}
                                    helperText={formErrors.reference}
                                    sx={{
                                        bgcolor: theme =>
                                            theme.palette.mode === 'dark' ? '#464646' : '#EFF3F4',
                                        borderRadius: '8px',
                                        height: '42px',
                                    }}
                                />
                            ) : (
                                <PhoneInput
                                    country="bd"
                                    containerStyle={containerStyle}
                                    inputStyle={inputStyle}
                                    buttonStyle={buttonStyle}
                                    inputProps={{
                                        name: 'reference',
                                        required: true,
                                        autoFocus: true,
                                    }}
                                    preferredCountries={['my', 'bd', 'cn', 'ae']}
                                    onChange={phone =>
                                        setFormValues(prev => ({ ...prev, reference: phone?.trim() }))
                                    }
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                sx={{
                                    height: '42px',
                                }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <TrackingModal
                open={open}
                handleClose={handleCloseTrackingModal}
                trackingData={trackData}
            />
            {success && (
                <Toastify
                    message={
                        isEmptyTracking ? 'Tracking data found.' : 'Booking data not found!'
                    }
                    isShow={success}
                    type={`${isEmptyTracking ? 'success' : 'error'}`}
                />
            )}
            {trackData && Object.keys(trackData).length > 0 && (
                <TableContainer component={Paper} elevation={0}>
                    <Table
                        // sx={{
                        //     // borderCollapse: 'separate',
                        //     // borderSpacing: '0',
                        //     // '& .MuiTableCell-root': { borderBottom: 'none' },
                        // }}
                        sx={{ minWidth: 850 }} aria-label="simple table"
                    >
                        <StyledTableHead>
                            <TableRow>
                                <TableCell sx={{ paddingLeft: '20px' }}>SL</TableCell>
                                <TableCell>Reference</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>Booking Date</TableCell>
                                <TableCell>Lot</TableCell>
                                <TableCell>Destination</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment Status</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <StyledTableRow>
                                <TableCell sx={{ paddingLeft: '20px' }}>{sl_no && sl_no}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={handleTrackingModal} >
                                        {reference && reference}
                                    </Button>
                                </TableCell>
                                <TableCell>{from && from}</TableCell>
                                <TableCell>{booking_date && booking_date}</TableCell>
                                <TableCell>{total_lot && total_lot}</TableCell>
                                <TableCell>{to && to}</TableCell>
                                <TableCell>{status && status}</TableCell>
                                <TableCell>
                                    <StyledPaymentButton
                                        paymentStatus={payment_status && payment_status}
                                    >
                                        {payment_status && payment_status}
                                    </StyledPaymentButton>
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}
