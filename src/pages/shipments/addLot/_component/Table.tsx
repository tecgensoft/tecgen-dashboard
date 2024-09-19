/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { Box, Theme, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid'
import { useState } from 'react'
import TableLoader from '../../../../components/TableLoader'
import { useGetShipmentsLotQuery } from '../../../../redux/feature/shipment/shipmentApi'
import AddLotColumn from './addLotColumn'
import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'



interface DataTableProps {
  text: string
  updateState: any
  state: any
}

const DataTable: React.FC<DataTableProps> = ({ text, updateState, state }) => {
  const theme: Theme = useTheme()
  const isLoading = false

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  // Destructure the data and the total count from the API response
  const { data } = useGetShipmentsLotQuery({
    shipmentNumber: state?.item?.shipment_number,
    search: text,
    page: paginationModel.page + 1,
  })

  const rows = data?.data?.length ? data.data : []
  const columns: GridColDef[] = AddLotColumn(theme, updateState, state)
  
  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div
          className="table"
          // style={{
          //   // height: rows.length > 0 ? 'auto' : 400, // Fixed height when no rows, auto height when rows exist
          //   // minHeight: 400, // Ensures a minimum height of 400px
          //   width: '100%',
          // }}
          
        >
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={data?.page?.total || 0}
            paginationMode="server"
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            getRowClassName={params =>
              theme.palette.mode !== 'dark' &&
              params.indexRelativeToCurrentPage % 2 === 1
                ? 'even-row'
                : ''
            }
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
        
          />
           <DataFetchingLoad isLoading={isLoading}/>
        </div>
      )}
    </>
  )
}

export default DataTable
