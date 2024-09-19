import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

export default function RecentShipment() {
  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      minWidth: 230,
    },
    {
      field: 'reference',
      headerName: 'Reference',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'number_of_lots',
      headerName: 'No of Lot Assigned',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
    },
    {
      field: 'freight_category',
      headerName: 'Freight Category',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 180,
    },
  ]

  return columns
}
