/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addImg from '../../../../../assets/addPlus.png'
import addImgHover from '../../../../../assets/hoverAddPlus.png'
const AddButton = ({
  theme,
  row,
  // onRowSelect,
  // setProductDeleteModalOpen,
}: {
  theme: Theme
  row: any
}) => {
  const [imgSrc, setImgSrc] = useState(addImg)
  const navigate = useNavigate()
  const handleMouseEnter = () => {
    setImgSrc(addImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(addImg)
  }

  return (
    <Tooltip title="Add Lots">
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
          navigate(`/shipments/addLot`, {
            state: {
              id: row?.id,
              item: row,
            },
          })
        }}
      >
        <img src={imgSrc} alt="edit" />
      </IconButton>
    </Tooltip>
  )
}
export default AddButton
