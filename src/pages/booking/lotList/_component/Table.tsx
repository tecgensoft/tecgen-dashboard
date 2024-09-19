/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'
import TableLoader from '../../../../components/TableLoader'
import { useGetLotListQuery } from '../../../../redux/feature/lot/lotApi'
import '../style.css'
import LotColumn from './LotColumn'
// import BookingColumn from './BookingColumn'
// { search }: { search: string }
interface DataTableProps {
  search: string
  setFileItem: (item: any) => void // Define the correct type for FileItem
  fileModalOpen: () => void // This should be a boolean
}
const DataTable: React.FC<DataTableProps> = ({
  search,
  setFileItem,
  fileModalOpen,
}) => {
  const theme = useTheme()
  // const isLoading = false
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  // Destructure the data and the total count from the API response
  const { data, isLoading } = useGetLotListQuery({
    search,
    page: paginationModel.page + 1,
  })
  // console.log(search)
  // useEffect(() => {
  //   refetch()
  // }, [paginationModel, refetch, search])
  // console.log(data?.data)
  const columns = LotColumn(theme, setFileItem, fileModalOpen)
  const rows = data?.data?.length ? data.data : []

  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="table">
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // data?.page?.total ||
            rowCount={data?.page?.total || 0} // Ensure the total count is passed correctly
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
          <DataFetchingLoad isLoading={isLoading} />
        </div>
      )}
    </>
  )
}
export default DataTable
