/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

// import {
//   setMessage,
//   setOpen,
// } from '../../../../redux/feature/notification/notificationSlice'
import {
  useDownloadSinglePaymentQuery,
  usePrintPaymentReportQuery,
} from '../../../../redux/feature/payment/paymentApi'
import { useAppDispatch } from '../../../../redux/hook'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import InvoiceAction from './actionButton/InvoiceAction'
import PrintAction from './actionButton/PrintAction'

export default function PaymentColumn(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const dispatch = useAppDispatch()
  const [file, setFile] = useState<any>({})
  const handleFileSelect = (row: any) => {
    setFile(row)
    // You can also perform other actions here if needed
  }
  // console.log(selectedRow)
  const { isError } = usePrintPaymentReportQuery(selectedRow?.id, {
    skip: !selectedRow, // Only fetch when a row is selected
  })

  useEffect(() => {
    if (isError) {
      // dispatch(setOpen(true))
      // dispatch(setMessage('Something went wrong'))
    }
  }, [isError])
  const { data: urlData } = useDownloadSinglePaymentQuery(
    {
      id: file?.id,
    },
    { skip: !file?.id },
  )
  // console.log(urlData)

  // const getBase64 = file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = error => reject(error)
  //   })
  // }

  // const handlePrint = async (id: string) => {
  //   setPrinting(true)
  //   if (!invoicePrinter) {
  //     console.log('Invoice printer is not found')
  //     setPrinting(false)
  //     return
  //   }
  // console.log('DATA', error, isError, success)
  // // try {
  //   const { data, error } = usePrintPaymentReportQuery(id);
  //   if (error) {
  //     throw new Error('Failed to fetch payment invoice');
  //   }

  //   const file = new Blob([data], { type: "application/pdf" });
  //   const g64 = await getBase64(file);

  //   const getBase64StringFromDataURL = (dataURL: string) => dataURL.replace("data:", "").replace(/^.+,/, "");

  //   qz.printers
  //     .find(invoicePrinter)
  //     .then((printers) => {
  //       const config = qz.configs.create(printers, {
  //         copies: 1,
  //         units: "mm",
  //         size: {
  //           width: 210,
  //           height: 297,
  //         },
  //       });
  //       const data = [
  //         {
  //           type: "pixel",
  //           format: "pdf",
  //           flavor: "base64",
  //           data: getBase64StringFromDataURL(g64),
  //         },
  //       ];
  //       return qz.print(config, data);
  //     })
  //     .then(() => {
  //       console.log("Payment Invoice sent to the Printer");
  //       setPrinting(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.toString());
  //       setPrinting(false);
  //     });
  // } catch (error) {
  //  console.log(error.toString());
  //   setPrinting(false);
  // }
  // }
  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Payment Date',
      valueGetter: value => formatDate(value) + ' ' + formatTime(value),
      sortable: false,
      disableColumnMenu: true,
      minWidth: 190,
    },
    {
      field: 'booking',
      headerName: 'Booking Reference',
      sortable: false,
      disableColumnMenu: true,

      valueGetter: (booking: any) => booking?.reference,
      minWidth: 200,
    },
    {
      field: 'reference',
      headerName: 'Invoice Number',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 200,
    },
    {
      field: 'payment_method',
      headerName: 'Payment Type',
      sortable: false,
      disableColumnMenu: true,

      minWidth: 140,
    },
    {
      field: 'transaction_note',
      headerName: 'Transaction Note',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'local_currency_amount',
      headerName: 'Total Local Amount',
      valueGetter: (_value, row) => `${row?.local_currency_code}
        ${row?.local_currency_amount}`,
      sortable: false,
      disableColumnMenu: true,
      minWidth: 160,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      valueGetter: (created_by: any) => created_by?.email,
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'updated_at',
      headerName: 'Last Modified',
      valueGetter: (value: any) => formatDate(value) + ' ' + formatTime(value),
      sortable: false,
      disableColumnMenu: true,
      minWidth: 180,
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            {' '}
            {/* <InvoiceAction
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              setIsOpen={setIsOpen}
            /> */}
            <InvoiceAction
              theme={theme}
              row={row}
              onRowSelect={handleFileSelect}
            />
            <PrintAction
              theme={theme}
              row={row}
              setSelectedRow={setSelectedRow}
              setIsOpen={setIsOpen}
            />
          </Box>
        )
      },
    },
  ]

  return columns
}
