/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Theme } from '@mui/material'
import { useState } from 'react'
import deleteImg from '../../../../../assets/deleteIcon.png'
import deleteImgHover from '../../../../../assets/hoverDelete.png'
const DeleteActionButton = ({
  theme,
  row,
  onRowSelect,
  setProductDeleteModalOpen,
}:{ theme:Theme,
  row:any,
  onRowSelect:any,
  setProductDeleteModalOpen:any}) => {
  const [imgSrc, setImgSrc] = useState(deleteImg)

  const handleMouseEnter = () => {
    setImgSrc(deleteImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(deleteImg)
  }

  return (
    <IconButton
      aria-label="view"
      sx={{
        background:
          theme?.palette?.mode === 'dark' ? 'white' : 'rgba(217, 227, 231, 1)',
        '&:hover': {
          backgroundColor:
            theme?.palette?.mode === 'dark'
              ? theme?.palette?.primary.main
              : theme?.palette?.secondary.main,
        },
        padding: '15px',
        borderRadius: '8px',
        margin: '0 4px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onRowSelect(row)
        setProductDeleteModalOpen(true)
      }}
    >
      <img src={imgSrc} alt="delete" />
    </IconButton>
  )
}
export default DeleteActionButton
