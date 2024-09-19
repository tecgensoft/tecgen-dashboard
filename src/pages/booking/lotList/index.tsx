/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import "./style.css"
import { GridSearchIcon } from '@mui/x-data-grid'
import DataTable from './_component/Table'
import useToggleModal from '../../../hooks/useToggle'
import QrShow from './_component/QrShow'
import { SetStateAction, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { setText } from '../../../redux/feature/search/searchSlice'
import useDebounce from '../../../utils/useDebounce'

export default function LotList() {
  const theme=useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [FileItem, setFileItem] = useState({});
  const [isFileModalOpen, fileModalOpen, fileModalClose] = useToggleModal();
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const dispatch = useAppDispatch()
  const { text } = useAppSelector(state => state.search)
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
   // Handle search input change
   const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }
// console.log(FileItem)
  return <Box className="lotList" sx={{ background:theme?.palette?.mode==="dark"?"#202020": 'rgba(255, 255, 255, 1)', padding:"33px 24px", borderRadius:'8px'}}>

    <Typography variant="subtitle1" style={{"fontWeight":500}}>lot List</Typography>
    {isSmallScreen && (
        <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              placeholder="Search"
              value={searchTerm} // Bind search term state to input
              onChange={handleSearchChange} // Update search term state on input change
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GridSearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                padding: '2px 0',
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(57, 57, 57, 1)'
                    : 'rgba(239, 243, 244, 1)',
                borderColor: 'transparent',
                borderRadius: '8px',
                color:
                  theme.palette.mode === 'dark'
                    ? 'rgba(153, 153, 153, 1)'
                    : 'rgba(153, 153, 153, 1)',
              }}
            />
          </Grid>

          
        </Grid>
      )}
      <DataTable search={text}  setFileItem={setFileItem}
                          fileModalOpen={ fileModalOpen}/>
      {isFileModalOpen && <QrShow show={isFileModalOpen} onHide={fileModalClose} FileItem={FileItem} />}
  </Box>
}
