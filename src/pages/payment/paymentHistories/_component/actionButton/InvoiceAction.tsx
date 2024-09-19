/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import invoiceImgHover from '../../../../../assets/hoverInvoice.png'
import invoiceImg from '../../../../../assets/invoice.png'
// import { setSelectAction } from '../../../../../redux/feature/product/ProductSlice'
// import { useAppDispatch } from '../../../../../redux/hook'

const InvoiceAction = ({
  theme,
  row,
  onRowSelect,

}: {
  theme: Theme
  row: any
  onRowSelect: any
}) => {
  const [imgSrc, setImgSrc] = useState(invoiceImg)
  const [loading, setLoading] = useState(false)
  const handleMouseEnter = () => {
    setImgSrc(invoiceImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(invoiceImg)
  }
  // console.log(row)
  return (
    <Tooltip title="Report">
    <IconButton
      aria-label="view"
      sx={{
        background:
          theme?.palette?.mode === 'dark' ? 'white' : 'rgba(217, 227, 231, 1)',
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
      onClick={() => {
    
        onRowSelect(row)
   
        setLoading(true) // Start loading on button click

        // Simulate download process
        setTimeout(() => {
          setLoading(false) // Stop loading after process completes
        }, 2000)
      }}
    >
{loading ? (
          <CircularProgress size={12} sx={{ color: 'black' }} />
        ) : (
          <Box component="img" src={imgSrc} alt="download" />
        )}
    </IconButton></Tooltip>
  )
}
export default InvoiceAction
