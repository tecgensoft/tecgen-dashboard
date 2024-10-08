/* eslint-disable @typescript-eslint/no-explicit-any */

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
export default function CategoryColumn() {
  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      flex:0.2,
      renderCell: (value) => {
        return <Box sx={{display:"flex", py:"4px"}}>
          <img src={value.value} alt="Icon" height={"40px"} />
        </Box>
      }

    },
    {
      field: 'logo',
      headerName: 'Logo',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      flex:0.2,
      renderCell: (value) => {
        return <Box sx={{display:"flex", py:"4px"}}>
          {value.value !== null && <img src={value.value} alt="Icon" height={"40px"} />}          
        </Box>
      }
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 300,
      flex:1,
    },
    {
      field: 'show_in_ecommerce',
      headerName: 'Show in Ecommerce',
      minWidth: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (value: any) => <Box sx={{display:"flex", alignItems:"center", justifyContent: 'center',width:"100%", height:"100%"}}>
        {value.value ? <CheckIcon sx={{color: "rgb(2, 191, 108)"}}/> : <CloseIcon sx={{color: "rgb(238, 72, 92)"}}/> }
      </Box>
    },
    {
      field: 'is_active',
      headerName: 'Is Active',
      flex:0.2,
      minWidth: 70,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (value: any) => <Box sx={{display:"flex", alignItems:"center", justifyContent: 'center',width:"100%", height:"100%"}}>
        {value.value ? <CheckIcon sx={{color: "rgb(2, 191, 108)"}}/> : <CloseIcon sx={{color: "rgb(238, 72, 92)"}}/> }
      </Box>
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      flex:0.5
    },
    {
      field: 'ordering',
      headerName: 'Ordering',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: () => {
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
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon sx={{color:"#ea244e", }}  />
              </IconButton>
            </Tooltip>
          </>
        )
      },
    },
  ]

  return columns
}
