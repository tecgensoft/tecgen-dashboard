/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import CustomNoRowsOverlay from '../../../../components/NoData';
import TableLoader from '../../../../components/table/TableLoader';
import { useGetSubCategoryQuery } from '../../../../redux/feature/productManagement/productManagementApi';

export default function Table({ columns, }: { columns: any[]; }) {
  const theme = useTheme()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const { data: categoryData, isLoading, isFetching } = useGetSubCategoryQuery({
    page: paginationModel.page + 1
  })
  const getCategoryData = categoryData?.results || []

  return (
    <Box sx={{ marginTop: "24px" }}>
      {isLoading || isFetching ? <TableLoader /> : <DataGrid
        rows={getCategoryData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={categoryData?.count}
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
          height: getCategoryData.length > 0 ? 'auto' : 400,
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
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />}
      {/* <DataFetchingLoad isLoading={true} /> */}
    </Box>
  )
}
