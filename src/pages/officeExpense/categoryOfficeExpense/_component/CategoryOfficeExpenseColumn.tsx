/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
// import DeleteActionButton from './actionButton/DeleteActionButton'
// import EditActionButton from './actionButton/EditActionButton'

import { useState } from 'react'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'

import ConfirmProductDelete from '../../../../components/modals/ConfirmProductDelete'
import { SUCCESS } from '../../../../redux/feature/notification/constant'
import { useDeleteCategoryMutation } from '../../../../redux/feature/officeExpense/officeExpenseApi'
import { useAppDispatch } from '../../../../redux/hook'
import DeleteActionButton from './actionButton/DeleteActionButton'
import EditActionButton from './actionButton/EditActionButton'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'

export default function CategoryOfficeExpenseColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [deleteCategory] = useDeleteCategoryMutation()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
  }
  const handleDelete = async () => {
    // console.log(selectedRow)
    if (selectedRow?.id) {
      await deleteCategory({ id: selectedRow?.id })
      // dispatch(setOpen(true))
      setDeleteModalOpen(false)
      dispatch(
        setNotification({
          open: true,
          message: 'Data Deleted ',
          type: SUCCESS,
        }),
      )
      // dispatch(setMessage('Data Deleted '))
    }
  }
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Title',
      sortable: false,
      disableColumnMenu: true,
      flex: 1, // Takes up half of the table width
      minWidth: 200, // Minimum width for small screens
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      disableColumnMenu: true,
      flex: 1, // Takes up half of the table width
      minWidth: 150, // Minimum width for small screens
      renderCell: params => {
        const row = params?.row
        return (
          <>
            {' '}
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
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
                setDeleteModalOpen={setDeleteModalOpen}
              />
            </Box>
            <ConfirmProductDelete
              title={'Are you sure you want to delete?'}
              open={DeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={() => handleDelete()}
            />
          </>
        )
      },
    },
  ]

  return columns
}
