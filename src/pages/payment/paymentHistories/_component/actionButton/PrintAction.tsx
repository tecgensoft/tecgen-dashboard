/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Theme, Tooltip } from '@mui/material'
import { useState } from 'react'
import printImgHover from '../../../../../assets/hoverPrint.png'
import printImg from '../../../../../assets/print.png'
// import { setSelectAction } from '../../../../../redux/feature/product/ProductSlice'
// import { useAppDispatch } from '../../../../../redux/hook'

const PrintAction = ({
  theme,
  row,
  // onRowSelect,
  // setPrinting,
  setSelectedRow,
  setIsOpen,
}: {
  theme: Theme
  row: any
  // onRowSelect: any
  setIsOpen: any
  // setPrinting:any
  setSelectedRow: any
}) => {
  const [imgSrc, setImgSrc] = useState(printImg)

  // const dispatch = useAppDispatch()
  const handleMouseEnter = () => {
    setImgSrc(printImgHover)
  }

  const handleMouseLeave = () => {
    setImgSrc(printImg)
  }

  return (
    <Tooltip title="Print">
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
          // setPrinting(true)

          setSelectedRow(row)
          // onRowSelect()
          // dispatch(setSelectAction(CUSTOM_EDIT_ACTION))
          setIsOpen(true)
        }}
      >
        <img src={imgSrc} alt="edit" />
      </IconButton>
    </Tooltip>
  )
}
export default PrintAction
