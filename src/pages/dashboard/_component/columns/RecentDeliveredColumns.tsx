import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

export default function RecentDeliveredColumns() {
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
      minWidth: 210,
    },
    {
      field: 'phone_number',
      headerName: 'Receiver Phone',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 130,
    },
    {
      field: 'gross_weight',
      headerName: 'Country',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 60,
    },
    {
      field: 'city',
      headerName: 'Destination',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
  ]

  return columns
}
