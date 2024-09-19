/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DeleteActionButton from './actionButton/DeleteActionButton'
import EditActionButton from './actionButton/EditActionButton'

import { useState } from 'react'
import ConfirmProductDelete from '../../../../components/modals/ConfirmProductDelete'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import { DANGER, SUCCESS } from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import { useDeleteLocationMutation } from '../../../../redux/feature/product/ProductApi'
import { useAppDispatch } from '../../../../redux/hook'

export default function ProductColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [locationDeleteModalOpen, setLocationDeleteModalOpen] = useState(false)
  const [deleteLocation] = useDeleteLocationMutation()
  const dispatch = useAppDispatch()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  const handleDeleteLocation = async (id: string) => {
    await deleteLocation({
      id: id,
    }).then(data => {
      setLocationDeleteModalOpen(false)
      if (!data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'Location Deleted Successfully!',
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
      field: 'name',
      headerName: 'Product Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 600,
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: false,
      valueGetter: (value: any) => value?.name,
      disableColumnMenu: true,
      minWidth: 300,
    },
    {
      field: 'position',
      headerName: 'Position',
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
              setLocationDeleteModalOpen={setLocationDeleteModalOpen}
            />
            <ConfirmProductDelete
              title={'Are you sure you want to delete this Location?'}
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
