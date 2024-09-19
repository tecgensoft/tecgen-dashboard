/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { IconButton, Theme } from '@mui/material'
import { useState } from 'react'
import editImg from '../../../../../assets/edit.png'
import editImgHover from '../../../../../assets/hoverEdit.png'

const EditButton = ({
  theme,
  row,

  setSetSelectedRow,
}: {
  theme: Theme
  row: any

  setSetSelectedRow: any
}) => {
  const [imgSrc, setImgSrc] = useState(editImg)
  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  const handleMouseEnter = () => {
    setImgSrc(editImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(editImg)
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
        dispatch(setSelectAction(CONVERSION_EDIT_ACTION))
        setSetSelectedRow(row)
        // if (!disabled) {
        //   navigate('/shipments/updateStatus', {
        //     state: {
        //       id: row?.id,
        //     },
        //   })
        // }
      }}
    >
      <img src={imgSrc} alt="edit" />
    </IconButton>
  )
}

export default EditButton
