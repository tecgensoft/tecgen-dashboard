/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editImg from '../../../../../assets/edit.png'
import editImgHover from '../../../../../assets/hoverEdit.png'
import { useAppDispatch } from '../../../../../redux/hook'
import { red } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit';
const EditButton = ({
  theme,
  row,
  onRowSelect,
  setIsOpen,
  disabled, // Add this prop
}: {
  theme: Theme
  row: any
  onRowSelect: any
  setIsOpen: any
  disabled?: boolean // Make it optional
}) => {
  const [imgSrc, setImgSrc] = useState(editImg)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setImgSrc(editImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(editImg)
  }

  return (
    <Tooltip title="Update Lot Status">
      <IconButton
        aria-label="view"
        sx={{
          background: theme?.palette?.mode === 'dark'
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
          if (!disabled) {
            navigate('/shipments/updateStatus', {
              state: {
                id: row?.id,
              },
            })
          }
        }}
        disabled={disabled} // Disable button based on the prop
      >
       {disabled?<EditIcon></EditIcon>:<img src={imgSrc} alt="edit" />} 
      </IconButton>
    </Tooltip>
  )
}

export default EditButton
