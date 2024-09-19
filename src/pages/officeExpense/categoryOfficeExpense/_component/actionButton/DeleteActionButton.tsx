/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import deleteImg from '../../../../../assets/deleteIcon.png'
import deleteImgHover from '../../../../../assets/hoverDelete.png'
const DeleteActionButton = ({
  theme,
  row,
  updateState,
  state,
  onRowSelect,
  setDeleteModalOpen,
  // setProductDeleteModalOpen,
}: any) => {
  const [imgSrc, setImgSrc] = useState(deleteImg)

  const handleMouseEnter = () => {
    setImgSrc(deleteImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(deleteImg)
  }

  return (
    <Tooltip title="Delete Category">
      <IconButton
        // disabled={updateState||state?.item?.status==="DONE"}
        aria-label="view"
        sx={{
          background:
            updateState || state?.item?.status === 'DONE'
              ? '#d9e2e7'
              : theme?.palette?.mode === 'dark'
                ? 'white'
                : 'rgba(217, 227, 231, 1)',

          '&:hover': {
            backgroundColor:
              updateState || state?.item?.status === 'DONE'
                ? '#d9e2e7'
                : theme?.palette?.mode === 'dark'
                  ? theme?.palette?.primary.main
                  : theme?.palette?.secondary.main,
          },
          padding: '15px',
          borderRadius: '8px',
          margin: '0 4px',
          cursor:
            updateState || state?.item?.status === 'DONE'
              ? 'not-allowed'
              : 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (!(updateState || state?.item?.status === 'DONE')) {
            setDeleteModalOpen(true)
            onRowSelect(row)
          }
        }}
      >
        <img
          src={
            updateState || state?.item?.status === 'DONE' ? deleteImg : imgSrc
          }
          alt="delete"
        />
      </IconButton>
    </Tooltip>
  )
}
export default DeleteActionButton
