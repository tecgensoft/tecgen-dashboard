/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck 
import { IconButton, Theme } from '@mui/material'
import { useState } from 'react'
import editImg from '../../../../../assets/edit.png'
import editImgHover from '../../../../../assets/hoverEdit.png'
import { setSelectAction } from '../../../../../redux/feature/product/ProductSlice'
import { useAppDispatch } from '../../../../../redux/hook'
import { EDIT_ACTION } from '../../../Product/constant'
import { CUSTOM_EDIT_ACTION } from '../../constant'


const EditActionButton = ({
  theme,
  row,
  onRowSelect,
  setIsOpen,
}: {
  theme: Theme
  row: any
  onRowSelect: any
  setIsOpen: any
}) => {
  const [imgSrc, setImgSrc] = useState(editImg)
  const dispatch = useAppDispatch()
  const handleMouseEnter = () => {
    setImgSrc(editImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(editImg)
  }
  // console.log(row)
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
        // console.log('action', row)
        onRowSelect(row)
        dispatch(setSelectAction(CUSTOM_EDIT_ACTION))
        setIsOpen(true)
      }}
    >
      <img src={imgSrc} alt="edit" />
    </IconButton>
  )
}
export default EditActionButton
