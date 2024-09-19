/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useDeleteCustomMutation } from '../../../../redux/feature/customCharges/CustomChargesApi'
import {
  SUCCESS,
  WARNING,
} from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../../redux/hook'

export default function CustomChargeColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [productDeleteModalOpen, setProductDeleteModalOpen] = useState(false)
  const [deleteCustom] = useDeleteCustomMutation()
  const dispatch = useAppDispatch()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  const handleDeleteProduct = async (id: string) => {
    await deleteCustom({
      id: id,
    }).then(data => {
      setProductDeleteModalOpen(false)
      if (!data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'Deleted Successfully!',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage('Deleted Successfully!'))
      }
      if (data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: data?.error?.data?.message,
            type: WARNING,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setMessage(data?.error?.data?.message))
      }
    })
  }
  const columns: GridColDef[] = [
    {
      field: 'product',
      headerName: 'Product Name',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (product: any) => product?.name,
      minWidth: 700,
    },
    {
      field: 'country',
      headerName: 'country',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (country: any) => country?.name,
      minWidth: 300,
    },
    {
      field: 'custom_charge',
      headerName: 'Custom Charge',
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
              setProductDeleteModalOpen={setProductDeleteModalOpen}
            />
            <ConfirmProductDelete
              title={'Are you sure you want to delete this?'}
              open={productDeleteModalOpen}
              onClose={() => setProductDeleteModalOpen(false)}
              onConfirm={() => handleDeleteProduct(selectedRow?.id)}
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
