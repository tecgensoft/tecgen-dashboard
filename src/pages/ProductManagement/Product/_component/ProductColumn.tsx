/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DeleteActionButton from './actionButton/DeleteActionButton'
import EditActionButton from './actionButton/EditActionButton'

import { useState } from 'react'
import ConfirmProductDelete from '../../../../components/modals/ConfirmProductDelete'
import {
  DANGER,
  SUCCESS,
} from '../../../../redux/feature/notification/constant'
// import {
//   setMessage,
//   setNotification,
//   setOpen,
//   setType,
// } from '../../../../redux/feature/notification/notificationSlice'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import { useDeleteProductMutation } from '../../../../redux/feature/product/ProductApi'
import { useAppDispatch } from '../../../../redux/hook'

export default function ProductColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [productDeleteModalOpen, setProductDeleteModalOpen] = useState(false)
  const [deleteProduct] = useDeleteProductMutation()
  const dispatch = useAppDispatch()
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  const handleDeleteProduct = async (id: string) => {
    await deleteProduct({
      id: id,
    }).then(data => {
      setProductDeleteModalOpen(false)
      if (!data?.error) {
        setIsOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'Product Deleted Successfully!',
            type: SUCCESS,
          }),
        )
        // dispatch(setOpen(true))
        // dispatch(setType(DANGER))
        // dispatch(setMessage('Product Deleted Successfully!'))
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
      minWidth: 800,
    },
    {
      field: 'product_type',
      headerName: 'Product Type',
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
              title={'Are you sure you want to delete this Product?'}
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
