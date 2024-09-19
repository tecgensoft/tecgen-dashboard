/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'

import EditButton from './actionButton/EditButton'

export default function ConversionColumn(theme, selectedRow,setSelectedRow) {
  // theme: Theme,
  // setIsOpen: any,
  // setSelectedRow: any,
  // selectedRow: any,
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(setOpen(true))
  //     dispatch(setMessage('Something went wrong'))
  //   }
  // }, [isError])
  // const { data: urlData } = useDownloadSinglePaymentQuery(
  //   {
  //     id: file?.id,
  //   },
  //   { skip: !file?.id },
  // )

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      // valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'country',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 250,
    },
    {
      field: 'rate',
      headerName: 'Conversion Rate',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },

    {
      field: 'created_by',
      headerName: 'Created By',
      valueGetter: (created_by: any) => created_by?.email,
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'updated_at',
      headerName: 'Last Modified',
      valueGetter: (value: any) => formatDate(value) + ' ' + formatTime(value),
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },

    {
      field: 'updated_by',
      headerName: 'Updated By',
      valueGetter: (created_by: any) => created_by?.email,
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 300,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row
        // const isDisabled = row?.lot_count === 0

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            <EditButton
              theme={theme}
           row={row}
            
              setSetSelectedRow={setSelectedRow}
              // onRowSelect={handleRowSelect}
              // setIsOpen={setIsOpen}
              // disabled={isDisabled} // Pass the disabled prop
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
