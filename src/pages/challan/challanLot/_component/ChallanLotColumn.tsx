/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Theme } from '@mui/material'
import { useState } from 'react'
import ConfirmProductDelete from '../../../../components/modals/ConfirmProductDelete'
import { useDeleteChallanMutation } from '../../../../redux/feature/challan/ChalanApi'
import { SUCCESS } from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../../redux/hook'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import DeleteActionButton from './actionButton/DeleteActionButton'

export default function CustomerColumn(
  theme: Theme,
  updateState: any,
  state: any,
) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [deleteChallan] = useDeleteChallanMutation()
  const handleRowSelect = (row: any) => {
    setDeleteModalOpen(true)
    setSelectedRow(row)
  }
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    // console.log(selectedRow)
    if (selectedRow?.id) {
      await deleteChallan({ id: selectedRow?.id })
      // dispatch(setOpen(true))
      setDeleteModalOpen(false)
      // dispatch(setMessage('Data Deleted '))
      dispatch(
        setNotification({
          open: true,
          message: 'Data Deleted ',
          type: SUCCESS,
        }),
      )
    }
  }
  const columns = [
    {
      field: 'created_at',
      headerName: 'Create Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (value: any) => formatDate(value) + ' ' + formatTime(value),
      minWidth: 300,
    },
    {
      field: 'lot_ref',
      headerName: 'Lots Reference',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 400,
    },
    {
      field: 'shipment_number',
      headerName: 'Shipment Number',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 350,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (created_by: any) => created_by || ' N/A',
      minWidth: 350,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const row = params?.row

        return (
          <>
            {' '}
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
              {' '}
              <DeleteActionButton
                theme={theme}
                row={row}
                updateState={updateState}
                state={state}
                onRowSelect={handleRowSelect}
              />
            </Box>
            <ConfirmProductDelete
              title={'Are you sure you want to delete?'}
              open={deleteModalOpen}
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
