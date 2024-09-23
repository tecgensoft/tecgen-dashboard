

import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { IconButton, Tooltip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

export default function CategoryColumn() {
  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
    },
    {
      field: 'logo',
      headerName: 'Logo',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'show_in_ecommerce',
      headerName: 'Show in Ecommerce',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'is_active',
      headerName: 'is Active',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'destination',
      headerName: 'Destination',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
      // valueGetter: (_value, row) =>
      //   row?.receiver?.state?.name + ',' + row?.receiver?.country?.name,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      disableColumnMenu: true,
      // valueGetter: (value: any) => value?.email,
      minWidth: 150,
    },
    
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: (_params: GridRenderCellParams) => {
        // const row = params?.row
        return (
          <>
            <Tooltip title="Quick View">
              <IconButton aria-label="view">
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            {(
                <Tooltip
                  title={``}
                >
                  <IconButton
                    aria-label="edit"
                    sx={{ borderRadius: '8px', padding: '8px' }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
          </>
        )
      },
    },
  ]

  return columns
}
