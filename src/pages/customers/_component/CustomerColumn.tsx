/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from '@mui/x-data-grid'

export default function CustomerColumn() {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'freight_category',
      headerName: 'Freight Category',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
      valueGetter: (country :any)=> country?.name,
    },
    {
      field: 'state',
      headerName: 'State',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
      valueGetter:( state:any )=> state?.name,
    },
    {
      field: 'city',
      headerName: 'City',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
      valueGetter: (city:any) => city?.name,
    },
  ]

  return columns
}
