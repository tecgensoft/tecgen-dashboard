/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CircularProgress, IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import downloadImg from '../../../../../assets/download.png'
import downloadImgHover from '../../../../../assets/download_hover.png'

const DownloadButton = ({
  theme,
  row,
  onRowSelect,
  loading,
}: {
  theme: Theme
  row: any
  onRowSelect: any
  // setIsOpen: any
}) => {
  const [imgSrc, setImgSrc] = useState(downloadImg)

  const handleMouseEnter = () => {
    setImgSrc(downloadImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(downloadImg)
  }

  return (
    <Tooltip title="Download Challan Report">
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
        onClick={() => {
          onRowSelect(row)
        }}
      >
        {loading ? (
          <CircularProgress size={12} sx={{ color: 'black' }} />
        ) : (
          <img src={imgSrc} alt="download" />
        )}
      </IconButton>
    </Tooltip>
  )
}
export default DownloadButton
