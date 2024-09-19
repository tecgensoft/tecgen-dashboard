import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

export default function RecentBookingColumns() {
  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      minWidth: 160,
    },
    {
      field: 'reference',
      headerName: 'Reference',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 190,
    },
    {
      field: 'phone_number',
      headerName: 'Sender Phone',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
    },
    {
      field: 'gross_weight',
      headerName: 'Country',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 60,
    },
    {
      field: 'created_by',
      headerName: 'Booking Creator',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 170,
    },
  ]

  return columns
}
