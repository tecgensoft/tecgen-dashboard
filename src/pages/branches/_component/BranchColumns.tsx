/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import ConfirmProductDelete from '../../../components/modals/ConfirmProductDelete'
import { useDeleteBranchMutation } from '../../../redux/feature/brances/branchesApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../redux/hook'
import DeleteActionButton from './actionButton/DeleteActionButton'
import EditActionButton from './actionButton/EditActionButton'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { SUCCESS } from '../../../redux/feature/notification/constant'

// import ConfirmProductDelete from '../../../../components/modals/ConfirmProductDelete'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
// import { useDeleteLocationMutation } from '../../../../redux/feature/product/ProductApi'
// import { useAppDispatch } from '../../../../redux/hook'

export default function BranchColumns(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [branchDeleteModalOpen, setBranchDeleteModalOpen] = useState(false)
  const [deleteBranch] = useDeleteBranchMutation()
  const dispatch = useAppDispatch()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  const handleDeleteBranch = async (id: string) => {
    await deleteBranch({
      id: id,
    }).then(data => {
      setBranchDeleteModalOpen(false)
      if (!data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'Branch Deleted Successfully!',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Branch Deleted Successfully!'))
      }
      if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.message,
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.message))
      }
    })
  }
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 600,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,

      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'address',
      headerName: 'Address',
      sortable: false,
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
              setBranchDeleteModalOpen={setBranchDeleteModalOpen}
            />
            <ConfirmProductDelete
              title={'Are you sure you want to delete this Branch?'}
              open={branchDeleteModalOpen}
              onClose={() => setBranchDeleteModalOpen(false)}
              onConfirm={() => handleDeleteBranch(selectedRow?.id)}
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
