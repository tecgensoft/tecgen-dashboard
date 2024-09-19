

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
// import { useEffect, useState } from 'react'
// import {
//   EDIT_ACTION,
//   productType,
// } from '../../pages/ProductManagement/Product/constant'
// import {
//   setMessage,
//   setOpen,
// } from '../../redux/feature/notification/notificationSlice'

import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { DANGER, SUCCESS } from '../../redux/feature/notification/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAddUserMutation, useUpdateUserMutation } from '../../redux/feature/user/userApi'
import { useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'
import Phone from '../Phone'



export default function UsersModal({
    // updateLocation,
    // createLocation,
    branch, roles,
    isOpen,
    setIsOpen,
    selectedRow,
}: any) {
    const { selectUserAction } = useAppSelector(state => state.user)
    const dispatch = useDispatch()
    // const [selectedCountry, setSelectedCountry] = useState('')
    // const [location, setLocation] = useState('')
    // const [position, setPosition] = useState('')
    // const [key, setKey] = useState('')



    const [userInfo, setUserInfo] = useState<any>({
        full_name: "",
        email: "",
        password: "",
        branch: '',
        role: '',
        phone_number: ''
    });

    // const { data: branch } = useGetBranchQuery(undefined)
    // const { data: roles } = useGetRolesQuery(undefined)
    const [addUser] = useAddUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const branchList = branch?.data
    const rolesList = roles?.data

    // const validateForm = () => {
    //     let errors: {
    //         name: string | null | undefined;
    //         email: string | null | undefined;
    //         password: string | null | undefined;
    //         branch: number | null | undefined;
    //         role: number | null | undefined,
    //     } = {
    //         name: undefined,
    //         email: undefined,
    //         password: undefined,
    //         branch: undefined,
    //         role: undefined,
    //     };
    //     // Regular expression to validate email format
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!userInfo.email.trim()) {
    //         errors.email = "E-mail is required";
    //     } else if (!emailRegex.test(userInfo.email)) {
    //         errors.email = "Please enter a valid email address";
    //     }
    //     if (!userInfo.password) {
    //         errors.password = "Password is required";
    //     } else if (userInfo.password.length < 0) {
    //         errors.password = "Password must be at least 6 characters long";
    //     }
    //     setErrors(errors);

    //     const hasErrors = Object.values(errors).some(
    //         (error) => error !== undefined
    //     );
    //     return !hasErrors;
    // };


    const handleChange = (e: any) => {
        // login information store in state
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        if (isOpen) {
            if (selectUserAction === 'EDIT' && selectedRow) {
                setUserInfo((prev: any) => ({
                    ...prev,
                    full_name: selectedRow?.full_name,
                    email: selectedRow?.email,
                    branch: selectedRow.branch.id ?? '',
                    role: selectedRow.role.id ?? '',
                    phone_number: selectedRow?.phone_number
                }))
            }
        }
    }, [selectedRow])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (selectUserAction === 'CREATE') {
                const reps = await addUser(userInfo)
                console.log(reps)
                if (reps?.data?.success) {
                    console.log(reps?.data?.success)
                    setUserInfo((prev: any) => ({
                        ...prev, full_name: "",
                        email: "",
                        password: "",
                        branch: '',
                        role: '',
                        phone_number: ''
                    }))
                    setIsOpen(false)
                    dispatch(setNotification({
                        open: true,
                        message:  'Successfully created.',
                        type:SUCCESS,
                      }))
                      
                    // dispatch(setOpen(true))
                    // dispatch(setMessage('Successfully created.'))
                } else {
                    setIsOpen(false)
                    dispatch(setNotification({
                        open: true,
                        message:  'Something went wrong!',
                        type:DANGER,
                      }))
                    // dispatch(setOpen(true))
                    // dispatch(setMessage('Something went wrong!'))
                }

            } else if (selectUserAction === 'EDIT') {
                // const { password, ...restUserInfo } = userInfo;
                const { password, ...restUserInfo } = userInfo;
                const editData = { ...restUserInfo, id: selectedRow?.id };
                if (selectedRow?.id) {
                    const resp = await updateUser
                        (editData)
                    if (resp?.data?.success) {
                        dispatch(setNotification({
                            open: true,
                            message:  'Successfully updated.',
                            type:SUCCESS,
                          }))
                        setIsOpen(false)
                        // dispatch(setOpen(true))
                        // dispatch(setMessage('Successfully updated.'))
                    } else {
                        setIsOpen(false)
                        dispatch(setNotification({
                            open: true,
                            message:  'Something went wrong!',
                            type:DANGER,
                          }))
                        // dispatch(setOpen(true))
                        // dispatch(setMessage('Something went wrong!'))
                    }

                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    const isCreateValid = userInfo.full_name !== '' && userInfo.email !== '' && userInfo.password !== '' && userInfo.branch !== '' && userInfo.role !== '' && userInfo.phone_number !== ''

    const isUpdateValid = userInfo.full_name !== '' && userInfo.email !== '' && userInfo.branch !== '' && userInfo.role !== '' && userInfo.phone_number !== ''





    return (
        <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
            <DialogTitle>
                {`${selectUserAction === 'CREATE' ? 'Create' : 'Edit'}`}{' '}
                User
            </DialogTitle>
            <DialogContent>
                <FormControl style={{ width: '100%' }}>
                    <FormLabel
                        sx={{
                            marginBottom: '8px',
                            color: 'rgba(14, 20, 31, 1)',
                        }}
                    >
                        <span style={{ fontSize: '12px' }}>Name</span>
                        <span>*</span>
                    </FormLabel>
                    <CommonInput
                        required
                        placeholder="Enter your full name"
                        variant="outlined"
                        onChange={handleChange}
                        value={userInfo.full_name}
                        name='full_name'
                        sx={{
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                padding: '11px 8px',
                            },
                        }}
                    />
                </FormControl>
                <FormControl style={{ width: '100%' }}>
                    <FormLabel
                        sx={{
                            marginBottom: '8px',
                            color: 'rgba(14, 20, 31, 1)',
                        }}
                    >
                        <span style={{ fontSize: '12px' }}>E-mail</span>
                        <span>*</span>
                    </FormLabel>
                    <CommonInput
                        type='email'
                        placeholder="Enter your E-mail"
                        name='email'
                        variant="outlined"
                        onChange={handleChange}
                        value={userInfo.email}
                        sx={{
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                padding: '11px 8px',
                            },
                        }}
                    />
                </FormControl>

                {selectUserAction === 'CREATE' && <FormControl style={{ width: '100%' }}>
                    <FormLabel
                        sx={{
                            marginBottom: '8px',
                            color: 'rgba(14, 20, 31, 1)',
                        }}
                    >
                        <span style={{ fontSize: '12px' }}>Password</span>
                        <span>*</span>
                    </FormLabel>
                    <CommonInput
                        type='password'
                        name='password'
                        placeholder="Enter your password"
                        variant="outlined"
                        onChange={handleChange}
                        value={userInfo.password}
                        sx={{
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                padding: '11px 8px',
                            },
                        }}
                    />
                </FormControl>}
                <Phone selectedCountry='my' handlePhone={(phone: string) => setUserInfo({ ...userInfo, phone_number: phone })} value={userInfo.phone_number} />
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
                        <span style={{ fontSize: '12px' }}>Select Branch</span>
                        <span>*</span>
                    </FormLabel>

                    <Select
                        displayEmpty
                        name='branch'
                        value={userInfo?.branch}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            height: '42px',
                            bgcolor: theme =>
                                theme.palette.mode === 'light' ? 'white' : '#464646',
                        }}
                    >
                        {' '}
                        <MenuItem key="" value="">
                            Select Branch
                        </MenuItem>
                        {branchList?.map((branch: any) => (
                            <MenuItem key={branch?.id} value={branch?.id}>
                                {branch?.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                        <span style={{ fontSize: '12px' }}>Enter Role</span>
                        <span>*</span>
                    </FormLabel>
                    <Select
                        displayEmpty
                        name='role'
                        value={userInfo?.role}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            height: '42px',
                            bgcolor: theme =>
                                theme.palette.mode === 'light' ? 'white' : '#464646',
                        }}
                    >
                        {' '}
                        <MenuItem key="" value="">
                            Select Role
                        </MenuItem>
                        {rolesList?.map((branch: any) => (
                            <MenuItem key={branch?.id} value={branch?.id}>
                                {branch?.name}
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
                    onClick={handleSubmit}
                    disabled={selectUserAction === 'CREATE' ? !isCreateValid : !isUpdateValid}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
