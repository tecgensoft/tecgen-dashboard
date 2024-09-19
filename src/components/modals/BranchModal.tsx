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
  TextareaAutosize,
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
import { BRANCH_EDIT_ACTION } from '../../pages/branches/constant'
import { useGetCountryQuery } from '../../redux/feature/customCharges/CustomChargesApi'
import { SUCCESS } from '../../redux/feature/notification/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CommonInput } from '../CommonInput'
import Phone from '../Phone'

export default function BranchModal({
  updateBranch,
  createBranch,
  isOpen,
  setIsOpen,
  selectedRow,
}) {
  const { selectBranchesAction } = useAppSelector(state => state?.branch)

  const [selectedCountry, setSelectedCountry] = useState('')
  const [branch, setBranch] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const dispatch = useAppDispatch()
  const { data: countries } = useGetCountryQuery(undefined)
  console.log('selectedRow', selectBranchesAction)
  useEffect(() => {
    if (isOpen) {
      if (selectBranchesAction === BRANCH_EDIT_ACTION && selectedRow) {
        setSelectedCountry(selectedRow?.country?.id)
        setBranch(selectedRow?.name || '')
        setPhone(selectedRow?.phone)
        setAddress(selectedRow?.address)
      }
    }
  }, [isOpen, selectBranchesAction, selectedRow])

  const handleBranch = async () => {
    const branchData = {
      name: branch,
      phone: phone,
      country: String(selectedCountry),
      address: address,
    }

    const action =
      selectBranchesAction === BRANCH_EDIT_ACTION ? updateBranch : createBranch
    const payload =
      selectBranchesAction === BRANCH_EDIT_ACTION
        ? { id: selectedRow?.id, ...branchData }
        : branchData

    await action(payload).then(data => {
      if (data?.data?.success) {
        setIsOpen(false)

        dispatch(
          setNotification({
            open: true,
            message: `Branch ${selectBranchesAction === BRANCH_EDIT_ACTION ? 'updated' : 'created'} successfully!`,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(
        //   setMessage(
        //     `Branch ${selectBranchesAction === BRANCH_EDIT_ACTION ? 'updated' : 'created'} successfully!`,
        //   ),
        // )
      } else if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.details?.name[0],
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.details?.name[0]))
      }
    })
  }

  const isFormValid =
    branch !== '' && selectedCountry !== '' && phone !== '' && address !== ''

  return (
    <Dialog className="modal" open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {`${selectBranchesAction === BRANCH_EDIT_ACTION ? 'Edit' : 'Create'}`}{' '}
        Branch
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ width: '100%' }}
        >
          <FormLabel>Select Country</FormLabel>
          <Select
            displayEmpty
            value={selectedCountry}
            onChange={e => setSelectedCountry(e?.target?.value)}
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
              Select Country
            </MenuItem>
            {countries?.map(country => (
              <MenuItem key={country?.value} value={country?.value}>
                {country?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            placeholder="Branch Name"
            variant="outlined"
            onChange={e => setBranch(e?.target?.value)}
            value={branch}
            sx={{
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '11px 8px',
              },
            }}
          />
        </FormControl>

        <Phone
          selectedCountry="my"
          handlePhone={e => setPhone(e)}
          value={phone}
        ></Phone>

        <FormControl style={{ width: '100%' }}>
          <FormLabel
            sx={{
              marginBottom: '8px',
              color: 'rgba(14, 20, 31, 1)',
            }}
          >
            <span style={{ fontSize: '12px' }}>Address</span>
            <span>*</span>
          </FormLabel>
          <TextareaAutosize
            minRows={3}
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={{ width: '100%', padding: 8 }}
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
          onClick={handleBranch}
          disabled={!isFormValid}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
