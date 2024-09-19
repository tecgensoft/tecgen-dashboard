/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import TableLoader from '../../../../components/TableLoader'
// import '../style.css'
import { Theme, useTheme } from '@mui/material'

import DataFetchingLoad from '../../../../components/DataFetchingLoad'
import CustomNoRowsOverlay from '../../../../components/NoData'
import { useGetOfficeExpenseCategoryQuery } from '../../../../redux/feature/officeExpense/officeExpenseApi'
import CategoryOfficeExpenseColumn from './CategoryOfficeExpenseColumn'

interface DataTableProps {
  text: string
  setIsOpen: any
  setSelectedRow: any
  selectedRow: any
}

const DataTable: React.FC<DataTableProps> = ({
  text,
  setIsOpen,
  setSelectedRow,
  selectedRow,
}) => {
  const theme: Theme = useTheme()
  // const isLoading = false
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  //Destructure the data and the total count from the API response
  const { data ,isLoading} = useGetOfficeExpenseCategoryQuery({
    page: paginationModel.page + 1,
  })

  const columns: GridColDef[] = CategoryOfficeExpenseColumn(
    theme,
    setIsOpen,
    setSelectedRow,
    selectedRow,
  )
  const rows = data?.data?.length ? data.data : []
  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="table" style={{ height: 'auto', width: '100%' }}>
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
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
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
