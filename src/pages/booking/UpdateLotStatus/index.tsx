/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck 
import {
    Box,
    Button,
    CircularProgress,
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
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Toastify from '../../../components/Toastify'
import { bookingLotStatus } from '../../../redux/feature/booking/bookingAction'
import { useGetLotStatusQuery } from '../../../redux/feature/booking/bookingApi'
import { useAppSelector } from '../../../redux/hook'

export default function UpdateLotStatus() {
    const dispatch = useDispatch()
    const { bookingLotStatus: bookingLot, loading, error } = useAppSelector(
        state => state.booking,
    )
    const { reference, location_status, branch, booking } = bookingLot || {}
    const [formValues, setFormValues] = useState({
        lotsReference: '',
        status: '',
    })
    const { data } = useGetLotStatusQuery(undefined)

    const [formErrors, setFormErrors] = useState<{
        lotsReference: string | null | undefined
        status: string | null | undefined
    }>({
        lotsReference: '',
        status: '',
    })

    const handleInputChange = (event:any) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
        setFormErrors({
            ...formErrors,
            [name]: '',
        })
    }
    const validateForm = () => {
        const errors: {
            lotsReference: string | null | undefined
            status: string | null | undefined
        } = {
            lotsReference: undefined,
            status: undefined,
        }
        if (!formValues.lotsReference.trim()) {
            errors.lotsReference = 'Lots Reference is required'
        }
        if (!formValues.status) {
            errors.status = 'Status is required'
        }
        setFormErrors(errors)

        return Object.keys(errors).length === 0
    }
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (!validateForm()) {
            await dispatch(bookingLotStatus(formValues))
            // if(bookingLot){
            //     setFormValues((prev) => ({...prev, lotsReference: '', status:""}))
            // }
        }
    }

    const lotStatusOptions = () => {
        return data?.data?.map((item: { name: any; id: any }) => {
            return {
                label: item.name,
                value: item.id,
            }
        })
    }
    
    const lotStatus = lotStatusOptions()
    
    return (
        <Box
            sx={{
                bgcolor: theme =>
                    theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
                padding: '32px 24px',
                height: `calc(100vh - ${140}px)`,
                borderRadius: '8px',
            }}
        >
            {error && <Toastify message={error} isShow={Boolean(error)} type={'error'} />}
            <Typography
                variant="h6"
                mb={8}
                sx={{
                    fontSize: '16px',
                    fontWeight: '500',
                }}
            >
                Update Lot Status
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            name="lotsReference"
                            label="Lots Reference"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formValues.lotsReference}
                            onChange={handleInputChange}
                            error={!!formErrors.lotsReference}
                            helperText={formErrors.lotsReference}
                            sx={{
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#464646' : '#EFF3F4',
                                borderRadius: '8px',
                                height:"42px"
                            }}
                        />
                        
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            error={!!formErrors.status}
                            sx={{ minWidth: 150 }}
                        >
                            <Select
                                name="status"
                                value={formValues.status}
                                onChange={handleInputChange}
                                variant="outlined"
                                size="small"
                                displayEmpty
                                sx={{ minWidth: 150, height:"42px" }}
                            >
                                <MenuItem value="">
                                    Select Status
                                </MenuItem>
                                {lotStatus?.map(
                                    (item: { label: string; value: number | string }) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                            <FormHelperText>{formErrors.status}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                            sx={{
                                height:"42px"
                            }}
                        >
                            Update
                        </Button>
                    </Grid>
                    </Grid>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead
                        sx={{
                            bgcolor: theme =>
                                theme.palette.mode === 'dark' ? '#353535' : '#EFF3F4',
                        }}
                    >
                        <TableRow>
                            <TableCell>Reference</TableCell>
                            <TableCell>Branch</TableCell>
                            <TableCell>Location Status</TableCell>
                            <TableCell>Lots Of</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (reference || branch || location_status || booking) ? (
                            <TableRow>
                                <TableCell>{reference && reference}</TableCell>
                                <TableCell>{branch && branch}</TableCell>
                                <TableCell>{location_status && location_status}</TableCell>
                                <TableCell>{booking && booking}</TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        No data available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
