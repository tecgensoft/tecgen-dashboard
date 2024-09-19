// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { DataGrid, GridColDef } from '@mui/x-data-grid'
// import { useState } from 'react'

// // import TableLoader from '../../../../components/TableLoader'
// // import '../style.css'
// import { Theme, useTheme } from '@mui/material'

// import CustomerColumn from './PromoColumn'



// const DataTable = () => {
//   const theme: Theme = useTheme()
//   const isLoading = false
//   const [paginationModel, setPaginationModel] = useState({
//     pageSize: 10,
//     page: 0,
//   })

//   //Destructure the data and the total count from the API response
//   const { data } = useGetAllCustomersQuery({
//     search: text,
//     page: paginationModel.page + 1,
//   })

//   const columns: GridColDef[] = CustomerColumn()
//   const rows = data?.data?.length ? data.data : []
//   return (
//     <>
//       {isLoading ? (
//         <TableLoader />
//       ) : (
//         <div className="table">
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             paginationModel={paginationModel}
//             onPaginationModelChange={setPaginationModel}
//             rowCount={data?.page?.total || 0} // Ensure the total count is passed correctly
//             paginationMode="server" // Enable server-side pagination
//             getRowClassName={params =>
//               theme.palette.mode !== 'dark' &&
//               params.indexRelativeToCurrentPage % 2 === 1
//                 ? 'even-row'
//                 : ''
//             }
//             slots={{
//               noRowsOverlay: CustomNoRowsOverlay,
//             }}
//             sx={{
//               height: rows.length > 0 ? 'auto' : 400, // Fixed height when no rows, auto height when rows exist
//               minHeight: 400, // Ensures a minimum height of 400px
//               width: '100%',
//               '& .MuiDataGrid-cell--textLeft': {
//                 color:
//                   theme.palette.mode === 'dark'
//                     ? 'rgba(255, 255, 255, 1)'
//                     : 'rgba(14, 20, 31, 1)',
//                 fontSize: '14px',
//               },
//             }}
//             // pageSizeOptions={[10, 25, 50]}
//           />
//           <DataFetchingLoad isLoading={isLoading} />
//         </div>
//       )}
//     </>
//   )
// }
// export default DataTable
