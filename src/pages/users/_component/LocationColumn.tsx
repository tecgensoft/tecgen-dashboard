/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DeleteActionButton from './actionButton/DeleteActionButton'
import EditActionButton from './actionButton/EditActionButton'

import { useState } from 'react'
import ConfirmProductDelete from '../../../components/modals/ConfirmProductDelete'
import { DANGER, SUCCESS } from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useDeleteUserMutation } from '../../../redux/feature/user/userApi'
import { useAppDispatch } from '../../../redux/hook'

export default function ProductColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [locationDeleteModalOpen, setLocationDeleteModalOpen] = useState(false)
  const [deleteUser] = useDeleteUserMutation()
  const dispatch = useAppDispatch()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  
  const handleDeleteLocation = async (id: string) => {
    // console.log(id)
    await deleteUser({
      id: id,
    }).then(data => {
      setLocationDeleteModalOpen(false)
      if (!data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'User Deleted Successfully!',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Location Deleted Successfully!'))
      }
      if (data?.error) {
        setIsOpen(false)
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
  const columns: GridColDef[] = [
    {
      field: 'full_name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'email',
      headerName: 'E-mail Address',
      sortable: false,
      // valueGetter: (value: any) => value?.name,
      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'phone_number',
      headerName: 'Phone',
      // valueGetter: (value: any) => value?.cell,
      sortable: false,
      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: false,
      valueGetter: (value: any) => value?.name,
      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 300,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            {' '}
            <EditActionButton
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              setIsOpen={setIsOpen}
            />
            <DeleteActionButton
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              setLocationDeleteModalOpen={setLocationDeleteModalOpen}
            />
            <ConfirmProductDelete
              title={'Are you sure you want to delete this User?'}
              open={locationDeleteModalOpen}
              onClose={() => setLocationDeleteModalOpen(false)}
              onConfirm={() => handleDeleteLocation(selectedRow?.id)}
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
