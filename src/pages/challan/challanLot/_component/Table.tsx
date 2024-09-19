/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme, useTheme } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'
import TableLoader from '../../../../components/TableLoader'
import { useGetChallanLLotQuery } from '../../../../redux/feature/challan/ChalanApi'
import ChallanLotColumn from './ChallanLotColumn'

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

  const { data, isFetching } = useGetChallanLLotQuery({
    id: state?.id,
    search: text,
    page: paginationModel.page + 1,
  })

  const rows = data?.data?.length ? data.data : []
  const columns: GridColDef[] = ChallanLotColumn(theme, updateState, state)
  // const noData = !isFetching && rows.length === 0

  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <Box
          className="table"
          // sx={{
          //     height: rows.length > 0 ? 'auto' : 400,
          //     minHeight: 400,
          //     width: '100%',
          //   }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={data?.page?.total || 0}
            paginationMode="server"
            autoHeight={rows.length > 0}
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
            loading={isFetching}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          <DataFetchingLoad isLoading={isFetching} />
        </Box>
      )}
    </>
  )
}

export default DataTable
