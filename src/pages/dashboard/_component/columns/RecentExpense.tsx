import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

export default function RecentExpense() {
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
      field: 'category',
      headerName: 'Category',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 220,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
    },
    {
      field: 'entry_by',
      headerName: 'Entry By',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 200,
    },
  ]

  return columns
}
