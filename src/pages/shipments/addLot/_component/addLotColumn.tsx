/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 

import { Theme } from '@mui/material'
import { useState } from 'react'
import { useDeleteChallanMutation } from '../../../../redux/feature/challan/ChalanApi'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import { useAppDispatch } from '../../../../redux/hook'

export default function AddLotColumn(
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
    }
  }
  const columns = [
    // {
    //   field: 'created_at',
    //   headerName: 'Create Date',
    //   sortable: false,
    //   disableColumnMenu: true,
    //   valueGetter: (value: any) => formatDate(value) + ' ' + formatTime(value),
    //   minWidth: 300,
    // },
    {
      field: 'reference',
      headerName: 'Lots Reference',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 350,
    },
    {
      field: 'branch_name',
      headerName: 'Branch',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 350,
    },
    {
      field: 'location_status',
      headerName: 'Location Status',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (value: any) => value?.name + ' , ' + value?.country?.name,
      minWidth: 350,
    },
    {
      field: 'gross_weight',
      headerName: 'Gross Weight',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 200,
    },
    {
      field: 'booking',
      headerName: 'Booking Reference',
      sortable: false,
      valueGetter: (value: any) => value?.reference,
      disableColumnMenu: true,

      minWidth: 350,
    },
  ]

  return columns
}
