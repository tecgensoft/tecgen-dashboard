/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import qrImg from '../../../../assets/qr.png'
import qrImgHover from '../../../../assets/qrHover.png'
const ActionButton = ({
  theme,
  setFileItem,
  fileModalOpen,
  row,
  onRowSelect,
}: {
  theme: Theme
  setFileItem: any
  fileModalOpen: any
  row: any
  onRowSelect: any
}) => {
  const [imgSrc, setImgSrc] = useState(qrImg)

  const handleMouseEnter = () => {
    setImgSrc(qrImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(qrImg)
  }

  return (
    <Tooltip title="QR Print">
      <IconButton
        aria-label="view"
        sx={{
          background:
            theme.palette.mode === 'dark' ? 'white' : 'rgba(217, 227, 231, 1)',
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
          padding: '15px',
          borderRadius: '8px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          onRowSelect(row)
          // console.log('selectedRow', selectedRow)
          setFileItem(row)
          fileModalOpen(row)
        }}
      >
        <img src={imgSrc} alt="qr" />
      </IconButton>
    </Tooltip>
  )
}
export default ActionButton
