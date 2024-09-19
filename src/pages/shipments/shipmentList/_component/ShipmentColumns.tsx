/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Theme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useDownloadPackingListQuery } from '../../../../redux/feature/shipment/shipmentApi'
import { useAppSelector } from '../../../../redux/hook'
import { formatDate, formatTime } from '../../../../utils/dateTimeFormat'
import {
  PACKING_LIST_DOWNLOAD,
  PRODUCT_ITEMS_LIST_DOWNLOAD,
  SHIPMENT_BOOKINGS_DOWNLOAD,
} from '../../constant'
import AddButton from './actionButton/Add'
import DownloadButton from './actionButton/Download'
import EditButton from './actionButton/EditButton'

export default function ShipmentColumns(
  theme: Theme,
  setIsOpen: any,
  setSelectedRow: any,
  selectedRow: any,
) {
  const [download, setDownload] = useState(false)
  const [load, setLoad] = useState(false)
  const { userInfo } = useAppSelector(state => state.auth)
  const handleRowSelect = (row: any) => {
    setDownload(true)
    setSelectedRow(row)
  }

  const { selectDownloadType } = useAppSelector(state => state?.shipment)
  const { isSuccess, isLoading } = useDownloadPackingListQuery(
    {
      id: selectedRow?.id,
      setDownload: setDownload,
      type: selectDownloadType,
      setLoad: setLoad,
    },
    { skip: !download },
  )
  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (value: any) => formatDate(value) + ' ' + formatTime(value),
      minWidth: 250,
    },
    {
      field: 'date_range',
      headerName: 'Date Range',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 250,
      renderCell: params => {
        const { start_date, end_date } = params.row

        return (
          <Box>
            <Box
              component="span"
              sx={{
                background: '#fdff32',
                padding: '2px 2px 0',
                color: '#484b4d',
              }}
            >
              {start_date}
            </Box>
            {' to '}
            <Box
              component="span"
              sx={{
                background: '#fdff32',
                padding: '2px 2px 0',
                color: '#484b4d',
              }}
            >
              {end_date}
            </Box>
          </Box>
        )
      },
    },
    {
      field: 'freight_category',
      headerName: 'Freight Category',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 180,
    },
    {
      field: 'shipment_number',
      headerName: 'Shipment Number',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 180,
    },
    {
      field: 'lot_count',
      headerName: 'Total Lots',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'packing_list',
      headerName: 'Packing List',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      renderCell: params => {
        const row = params?.row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            <DownloadButton
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              isType={PACKING_LIST_DOWNLOAD}
              load={load}
              setLoad={setLoad}
            />
          </Box>
        )
      },
    },
    {
      field: 'product_items',
      headerName: 'Product Items',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      renderCell: params => {
        const row = params?.row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            <DownloadButton
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              isType={PRODUCT_ITEMS_LIST_DOWNLOAD}
            />
          </Box>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 230,
      disableColumnMenu: true,
      renderCell: params => {
        const row = params?.row
        const isDisabled = row?.lot_count === 0

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
            <DownloadButton
              theme={theme}
              row={row}
              onRowSelect={handleRowSelect}
              isType={SHIPMENT_BOOKINGS_DOWNLOAD}
            />
            <AddButton theme={theme} row={row} />
            {userInfo?.role !== 'Staff' &&
              userInfo.role !== 'Staff  for test role' && (
                <EditButton
                  theme={theme}
                  row={row}
                  onRowSelect={handleRowSelect}
                  setIsOpen={setIsOpen}
                  disabled={isDisabled}
                />
              )}
          </Box>
        )
      },
    },
  ]

  return columns
}
