import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import CustomNoRowsOverlay from '../NoData'

export default function Table({columns, rows = []}: {columns: any[]; rows: any[]}) {
  const theme = useTheme()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  // const rows: any[] = []
  return (
    <Box sx={{marginTop:"24px"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={0}
        paginationMode="server"
        getRowClassName={params =>
          theme.palette.mode !== 'dark' &&
          params.indexRelativeToCurrentPage % 2 === 1
            ? 'even-row'
            : ''
        }
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        sx={{
          height: rows.length > 0 ? 'auto' : 400,
          minHeight: '75vh',
          width: '100%',
          '& .MuiDataGrid-cell--textLeft': {
            color:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(14, 20, 31, 1)',
            fontSize: '14px',
          },
        }}
        // pageSizeOptions={[10, 25, 50]}
      />
      {/* <DataFetchingLoad isLoading={true} /> */}
    </Box>
  )
}
