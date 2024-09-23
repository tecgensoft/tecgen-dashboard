

import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { IconButton, Tooltip } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'


// interface RowData {
//   created_at?: string
//   reference?: string
//   receiverName?: string
//   receiver?: {
//     name?: string
//     phone?: string
//     state?: { name?: string }
//     country?: { name?: string }
//   }
//   destination?: string
//   total_carton?: number
//   gross_weight?: number
//   location_status?: string
//   total_local_amount?: number
//   paid_amount?: number
//   payment_status?: string
//   created_by?: { email?: string }
//   updated_at?: string
// }

export default function BookingColumn(
  theme: Theme,
  // setDownLoadInvoice: any,
  // setId: any,
) {
  // const [bookingId, setBookingId] = useState<string | number | null>(null)
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  // const [selectedRow, setSelectedRow] = useState<any>(null)
  // const [isPrinting, setIsPrinting] = useState(false)
  
  // const dispatch = useAppDispatch()
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const { userInfo } = useAppSelector(state => state?.auth)

  // const handleClick = (event: React.MouseEvent<HTMLElement>, row: RowData) => {
  //   setAnchorEl(event.currentTarget)
  //   setSelectedRow(row)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  //   setSelectedRow(null)
  // }

  // const handleInvoicePdf = () => {
  //   setId(selectedRow?.id)
  //   setDownLoadInvoice(true)
  //   handleClose()
  // }
  // console.log('selectedRow', selectedRow)

  // loc?.state = '/booking'


  // const handleView = id => {
  //   if (id) {
  //     setBookingId(id)
  //   }
  //   setIsModalOpen(true)
  // }
  // const handleCloseModel = () => {
  //   setIsModalOpen(false)
  // }

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'logo',
      headerName: 'Logo',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
    },
    {
      field: 'show_in_ecommerce',
      headerName: 'Show in Ecommerce',
      minWidth: 250,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'is_active',
      headerName: 'is Active',
      minWidth: 250,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'destination',
      headerName: 'Destination',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      // valueGetter: (_value, row) =>
      //   row?.receiver?.state?.name + ',' + row?.receiver?.country?.name,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      disableColumnMenu: true,
      // valueGetter: (value: any) => value?.email,
      minWidth: 150,
    },
    
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 160,
      disableColumnMenu: true,
      renderCell: (_params: GridRenderCellParams) => {
        //  if(selectedRow?.id===params?id){
        // const row = params?.row
        // }else{return}
        // console.log(params?.row,selectedRow)
        return (
          <>
            <Tooltip title="Quick View">
              <IconButton aria-label="view">
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            {/* {isLoading ? (
              <TableLoader />
            ) : (
              isModalOpen &&
              data && (
                <ViewBooking
                  isOpen={isModalOpen}
                  data={data?.data}
                  onClose={handleCloseModel}
                />
              )
            )} */}

            {(
                <Tooltip
                  title={``}
                >
                  <IconButton
                    aria-label="edit"
                    sx={{
                      background:
                        theme.palette.mode === 'dark'
                          ? 'rgba(57, 57, 57, 1)'
                          : 'rgba(217, 227, 231, 1)',
                      borderRadius: '8px',
                      padding: '8px',
                      color:
                        theme.palette.mode === 'dark'
                          ? 'white'
                          : 'rgba(14, 20, 31, 1)',
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}

            <Tooltip title="More Options">
              <IconButton
                aria-label="more"
                // disabled={row?.has_due_task}
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? 'white'
                      : 'rgba(14, 20, 31, 1)',
                }}
                // onClick={event => handleClick(event, params?.row)}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>

            
          </>
        )
      },
    },
  ]

  return columns
}
