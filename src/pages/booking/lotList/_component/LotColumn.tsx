/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Theme } from '@mui/material/styles'
import { GridColDef } from '@mui/x-data-grid'

import { useState } from 'react'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import ActionButton from './ActionButton'
export default function LotColumn(
  theme: Theme,
  setFileItem: any,
  fileModalOpen: any,
) {
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRowSelect = (row: any) => {
    setSelectedRow(row)
    // You can also perform other actions here if needed
  }
  // console.log(selectedRow)
  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      valueGetter: value => formatDate(value),
    },
    {
      field: 'reference',
      headerName: 'Lot Reference',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'receiverName',
      headerName: 'Receiver Name',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (_value, row) => row?.booking?.receiver?.name || '',
    },
    {
      field: 'receiver',
      headerName: 'Receiver Phone',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      valueGetter: (_value, row) => row?.booking?.receiver?.phone || '',
    },

    {
      field: 'gross_weight',
      headerName: 'Gross Weight',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
    },
    {
      field: 'gross_weight_price',
      headerName: 'Gross Price',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
    },
    {
      field: 'shipment_number',
      headerName: 'Shipment Number',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
      valueGetter: _value => _value || 0,
    },
    {
      field: 'updated_at',
      headerName: 'Last Modified',
      minWidth: 180,
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'location_status',
      headerName: 'Location Status',
      minWidth: 300,
      valueGetter: (location_status: any) =>
        location_status?.name + ', ' + location_status?.country?.name,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'booking',
      headerName: 'Booking Reference',
      minWidth: 200,
      valueGetter: (booking: any) => booking?.reference,
      sortable: false,
      disableColumnMenu: true,
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 80,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row
        return (
          <ActionButton
            setFileItem={setFileItem}
            fileModalOpen={fileModalOpen}
            theme={theme}
            row={row}
            onRowSelect={handleRowSelect}
          />
        )
      },
    },
  ]

  return columns
}
