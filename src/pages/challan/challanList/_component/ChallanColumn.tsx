/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import AddButton from './actionButton/Add'
import DownloadButton from './actionButton/Download'

export default function ChallanColumn(
  theme: Theme,
  setSelectedRow: any,
  handleChallanPdfReport: any,
) {
  const [loadingRowId, setLoadingRowId] = useState<number | null>(null)

  const handleRowSelect = async (row: any) => {
    setSelectedRow(row)
    setLoadingRowId(row.id) // Set loading state for the clicked row

    try {
      await handleChallanPdfReport(row)
      // dispatch(
      //   setNotification({
      //     open: true,
      //     message: 'Report Downloaded!',
      //     type: SUCCESS,
      //   }),
      // )
    } finally {
      setLoadingRowId(null) // Clear loading state after the process finishes
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Challan Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      minWidth: 250,
    },
    {
      field: 'delivery_man',
      headerName: 'Delivery Man',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 160,
    },
    {
      field: 'driver_number',
      headerName: 'Driver Number',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 160,
    },
    {
      field: 'car_number',
      headerName: 'Vehicle Number',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'shipment_numbers',
      headerName: 'Shipment Number',
      sortable: false,
      valueGetter: (shipment_numbers: any) =>
        shipment_numbers?.split(',')?.[0] || '',
      disableColumnMenu: true,
      minWidth: 170,
    },
    {
      field: 'destination',
      headerName: 'Destination',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <span
          style={{
            color:
              params?.value === 'ON_GOING'
                ? 'rgba(143, 103, 0, 1)'
                : 'rgba(2, 191, 108, 1)',
            background:
              params?.value === 'ON_GOING'
                ? 'rgba(255, 204, 77, 0.3)'
                : 'rgba(36, 187, 124, 0.1)',
            borderRadius: '4px',
            padding: '1px 6px',
          }}
        >
          {params?.value}
        </span>
      ),
    },
    {
      field: 'total_lot',
      headerName: 'Total Lot',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            <DownloadButton
              theme={theme}
              row={row}
              onRowSelect={() => handleRowSelect(row)}
              loading={loadingRowId === row.id} // Only show loading for the clicked row
            />
            <AddButton theme={theme} row={row} />
          </Box>
        )
      },
    },
  ]

  return columns
}
