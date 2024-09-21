/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import qz from 'qz-tray'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import invoceImg from '../../../../assets/invoice.png'
import paymentImg from '../../../../assets/payment.png'
import printImg from '../../../../assets/print.png'
import TableLoader from '../../../../components/TableLoader'
import {
  useGetBookingByIdQuery,
  useLazyGetPrintInvoiceQuery,
} from '../../../../redux/feature/booking/bookingApi'
import {
  DANGER,
  SUCCESS,
} from '../../../../redux/feature/notification/constant'
import { setNotification } from '../../../../redux/feature/notification/notificationSlice'
import { setFrom } from '../../../../redux/feature/payment/paymentSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import { BOOKING_EDIT_ACTION } from '../../constant/action'
import ViewBooking from './ViewBooking'

interface RowData {
  created_at?: string
  reference?: string
  receiverName?: string
  receiver?: {
    name?: string
    phone?: string
    state?: { name?: string }
    country?: { name?: string }
  }
  destination?: string
  total_carton?: number
  gross_weight?: number
  location_status?: string
  total_local_amount?: number
  paid_amount?: number
  payment_status?: string
  created_by?: { email?: string }
  updated_at?: string
}

export default function BookingColumn(
  theme: Theme,
  setDownLoadInvoice: any,
  setId: any,
) {
  const navigate = useNavigate()
  const [bookingId, setBookingId] = useState<string | number | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [triggerGetPrintInvoice] = useLazyGetPrintInvoiceQuery({
    id: selectedRow?.id,
  })

  const { data, isLoading } = useGetBookingByIdQuery(
    {
      id: bookingId,
    },
    {
      skip: !bookingId,
    },
  )
  const dispatch = useAppDispatch()
  const { invoicePrinter } = useAppSelector(state => state.print)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { userInfo } = useAppSelector(state => state?.auth)

  useEffect(() => {
    // Cleanup function for disconnecting QZ Tray
    return () => {
      qz.websocket.disconnect()
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: RowData) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleInvoicePdf = () => {
    setId(selectedRow?.id)
    setDownLoadInvoice(true)
    handleClose()
  }
  // console.log('selectedRow', selectedRow)

  // loc?.state = '/booking'

  const getBase64StringFromDataURL = (dataURL: string) =>
    dataURL.replace('data:', '').replace(/^.+,/, '')

  const printInvoice = async (id: string) => {
    let res
    let invoiceList
    setIsPrinting(true)
    try {
      res = await triggerGetPrintInvoice(id).unwrap()
      // console.log('response', res)
      invoiceList = res.data?.invoice_pdf_b64_list
    } catch (error) {
      // console.log('firsttry', error)
      setIsPrinting(false)
      return
    }

    try {
      if (!qz.websocket.isActive()) {
        // console.log('QZ Tray is not active. Attempting to reconnect...')
        await qz.websocket.connect()
      }

      if (!invoicePrinter) {
        // console.log('Invoice printer not found')
      } else {
        const config = qz.configs.create(invoicePrinter, {
          copies: 1,
          units: 'mm',
          size: {
            width: 210,
            height: 297,
          },
        })

        const data = invoiceList?.map((invoice: string) => {
          return {
            type: 'pixel',
            format: 'pdf',
            flavor: 'base64',
            data: getBase64StringFromDataURL(invoice),
          }
        })

        // Print the document
        await qz.print(config, data)
        dispatch(
          setNotification({
            open: true,
            message: 'Document sent to the printer!',
            type: SUCCESS,
          }),
        )
        // console.log('Document sent to the printer')
      }
    } catch (error) {
      // console.log(error.toString())
      dispatch(
        setNotification({
          open: true,
          message: error.toString(),
          type: DANGER,
        }),
      )
    } finally {
      setIsPrinting(false)
    }
  }

  const handlePrintClick = async () => {
    try {
      if (!qz.websocket.isActive()) {
        await qz.websocket.connect()
      }
      // Proceed with printing
      printInvoice(selectedRow?.id)
    } catch (error) {
      // console.error('Error printing:', error)
    }
  }

  const handleView = id => {
    if (id) {
      setBookingId(id)
    }
    setIsModalOpen(true)
  }
  const handleCloseModel = () => {
    setIsModalOpen(false)
  }

  const columns: GridColDef[] = [
    // {
    //   field: 'created_at',
    //   headerName: 'Date',
    //   sortable: false,
    //   disableColumnMenu: true,
    //   minWidth: 150,
    //   valueGetter: value => formatDate(value) + ' ' + formatTime(value),
    // },
    {
      field: 'icon',
      headerName: 'Icon',
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
      valueGetter: (_value, row) =>
        row?.receiver?.state?.name + ',' + row?.receiver?.country?.name,
    },
    // {
    //   field: 'payment_status',
    //   headerName: 'Payment Status',
    //   sortable: false,
    //   disableColumnMenu: true,
    //   minWidth: 150,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <span
    //       style={{
    //         color: params?.value === 'PAID' ? 'green' : 'red',
    //         background:
    //           params?.value === 'PAID'
    //             ? 'rgba(36, 187, 124, 0.1)'
    //             : 'rgba(234, 36, 78, 0.1)',
    //         borderRadius: '4px',
    //         padding: '1px 6px',
    //       }}
    //     >
    //       {params?.value}
    //     </span>
    //   ),
    // },
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
      renderCell: (params: GridRenderCellParams) => {
        //  if(selectedRow?.id===params?id){
        const row = params?.row
        // }else{return}
        // console.log(params?.row,selectedRow)
        return (
          <>
            <Tooltip title="Quick View">
              <IconButton
                aria-label="view"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? 'white'
                      : 'rgba(14, 20, 31, 1)',
                }}
                disabled={row?.has_due_task}
                onClick={event => handleView(params?.row?.id)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            {isLoading ? (
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
            )}

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
                onClick={event => handleClick(event, params?.row)}
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
