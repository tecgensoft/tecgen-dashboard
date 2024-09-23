

import { useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'


import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'
import TableLoader from '../../../../components/table/TableLoader'
import '../style.css'

export default function DataTable() {
  const theme = useTheme()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })



  
  // const [downloadInvoice, setDownLoadInvoice] = useState(false)
  // const [id, setId] = useState('')

  // console.log(isSuccess)

  // const columns = BookingColumn(theme, setDownLoadInvoice, setId)
  const rows:any[] = []
  return (
    <>
      {'isLoading' ? (
        <TableLoader />
      ) : (
        <div className="table" >
          <DataGrid
            rows={rows}
            columns={[]}
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
              height: rows.length > 0 ? 'auto' : 400, // Fixed height when no rows, auto height when rows exist
              minHeight: 400, // Ensures a minimum height of 400px
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
          <DataFetchingLoad isLoading={true} />
        </div>
      )}
    </>
  )
}
