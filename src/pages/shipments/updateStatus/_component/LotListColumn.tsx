/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

export default function LotListColumn() {
  const columns: GridColDef[] = [
 
    {
      field: 'reference',
      headerName: 'Reference',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 400,
    },
    {
      field: 'branch',
      headerName: 'Branch',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 400,
    },
    {
      field: 'location_status',
      headerName: 'Location Status',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 400,
    },
    {
      field: 'booking',
      headerName: 'Booking',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 400,
    },
  ]

  return columns
}
