/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Theme, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import DataFetchingLoad from '../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../components/NoData'

interface DataTableProps {
  columns: GridColDef[]
  data: any[]
  isLoading: boolean
  title?: string
}

const DataTable = ({ columns, data, isLoading, title }: DataTableProps) => {
  const theme: Theme = useTheme()
  const rows = data?.length ? data : []
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  return (
    <Box className="table" sx={{ padding: '10px',  background:
      theme?.palette?.mode === 'dark'
        ? '#202020'
        : 'rgba(255, 255, 255, 1)', }}>
      <Typography variant="subtitle1" sx={{ margin: '3px 0' }}>
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={row => `${row.created_at}-${row.entry_by}`}
        rowCount={4} // Ensure the total count is passed correctly
        paginationMode="server" // Enable server-side pagination
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
          height: rows.length > 0 ? 'auto' : 330, // Fixed height when no rows, auto height when rows exist
          minHeight: 330, // Ensures a minimum height of 400px
          width: '100%',
          '& .MuiDataGrid-cell--textLeft': {
            color:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(14, 20, 31, 1)',
            fontSize: '14px',
          },
        }}
      />
      <DataFetchingLoad isLoading={isLoading} />
    </Box>
  )
}

export default DataTable
