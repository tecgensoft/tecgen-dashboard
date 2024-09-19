/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  CircularProgress,
  IconButton,
  Theme,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import downloadImg from '../../../../../assets/download.png'
import downloadImgHover from '../../../../../assets/download_hover.png'
// import {
//   setMessage,
//   setOpen,
// } from '../../../../../redux/feature/notification/notificationSlice'
import { setSelectDownloadType } from '../../../../../redux/feature/shipment/shipmentSlice'
import { useAppDispatch } from '../../../../../redux/hook'
import {
  PACKING_LIST_DOWNLOAD,
  PRODUCT_ITEMS_LIST_DOWNLOAD,
  SHIPMENT_BOOKINGS_DOWNLOAD,
} from '../../../constant'

const DownloadButton = ({
  theme,
  row,
  onRowSelect,
  isType,
  setLoad,
}: {
  theme: Theme
  row: any
  onRowSelect: any
  isType: any
  setLoad: any
}) => {
  const [imgSrc, setImgSrc] = useState(downloadImg)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleMouseEnter = () => {
    setImgSrc(downloadImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(downloadImg)
  }

  const handleDownload = () => {
    if (row?.lot_count === 0) {
      // dispatch(setOpen(true))
      // dispatch(setMessage('No Data Found'))
    } else {
      onRowSelect(row)
      setLoading(true) // Start loading on button click

      // Simulate download process
      setTimeout(() => {
        setLoading(false) // Stop loading after process completes
      }, 5000)

      // Dispatch based on the download type
      if (isType === PACKING_LIST_DOWNLOAD) {
        dispatch(setSelectDownloadType(PACKING_LIST_DOWNLOAD))
      } else if (isType === PRODUCT_ITEMS_LIST_DOWNLOAD) {
        dispatch(setSelectDownloadType(PRODUCT_ITEMS_LIST_DOWNLOAD))
      } else if (isType === SHIPMENT_BOOKINGS_DOWNLOAD) {
        dispatch(setSelectDownloadType(SHIPMENT_BOOKINGS_DOWNLOAD))
      }
    }
  }

  return (
    <Tooltip title={isType}>
      <IconButton
        aria-label="view"
        sx={{
          background:
            theme?.palette?.mode === 'dark'
              ? 'white'
              : 'rgba(217, 227, 231, 1)',
          '&:hover': {
            backgroundColor:
              theme?.palette?.mode === 'dark'
                ? theme?.palette?.secondary.main
                : theme?.palette?.primary.main,
          },
          padding: '15px',
          borderRadius: '8px',
          margin: '0 4px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDownload} // Set the download handler
      >
        {loading ? (
          <CircularProgress size={12} sx={{ color: 'black' }} />
        ) : (
          <Box component="img" src={imgSrc} alt="download" />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default DownloadButton
