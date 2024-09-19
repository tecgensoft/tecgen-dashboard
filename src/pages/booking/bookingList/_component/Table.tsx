/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import {
  useGetAllBookingsQuery,
  useGetInvoicePdfQuery,
} from '../../../../redux/feature/booking/bookingApi'

import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'
import TableLoader from '../../../../components/TableLoader'
import '../style.css'
import BookingColumn from './BookingColumn'

export default function DataTable({ search }: { search: string }) {
  const theme = useTheme()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  // Destructure the data and the total count from the API response
  const { data, refetch, isLoading } = useGetAllBookingsQuery({
    search,
    page: paginationModel.page + 1,
  })

  useEffect(() => {
    refetch()
  }, [paginationModel, refetch, search])
  const [downloadInvoice, setDownLoadInvoice] = useState(false)
  const [id, setId] = useState('')
  const { isSuccess } = useGetInvoicePdfQuery(id, {
    skip: !downloadInvoice,
  })

  // console.log(isSuccess)

  const columns = BookingColumn(theme, setDownLoadInvoice, setId)
  const rows = data?.data?.length ? data.data : []
  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="table" >
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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
