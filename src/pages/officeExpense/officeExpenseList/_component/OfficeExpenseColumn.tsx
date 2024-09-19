/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
// import DeleteActionButton from './actionButton/DeleteActionButton'
// import EditActionButton from './actionButton/EditActionButton'

import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import EditActionButton from './actionButton/EditActionButton'

export default function OfficeExpenseColumn(
  theme: Theme,
  setCreateOpenModal: any,
  setSelectedRow: any,

) {
  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      minWidth: 200,
    },
    {
      field: 'expense_category',
      headerName: 'Category',
      sortable: false,
      valueGetter: (value: any) => value?.name,
      disableColumnMenu: true,
      minWidth: 200,
    },
    {
      field: 'local_amount',
      headerName: 'Amount',
      sortable: false,

      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'expense_by',
      headerName: 'Expense By',
      sortable: false,

      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'note',
      headerName: 'Note',
      sortable: false,

      disableColumnMenu: true,
      minWidth: 500,
    },
    {
      field: 'branch',
      headerName: 'Branch',
      sortable: false,
      valueGetter: (value: any) => value?.name,
      disableColumnMenu: true,
      minWidth: 200,
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,

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
              setCreateOpenModal={setCreateOpenModal}
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
