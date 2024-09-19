import { Box, Grid, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import DataTable from './_component/Table'
import { GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'
import useDebounce from '../../utils/useDebounce'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setText } from '../../redux/feature/search/searchSlice'

export default function Customers() {

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchTerm, setSearchTerm] = useState<string>('')
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

  return (
    <Box
      className="customers"
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: isSmallScreen ? '20px 10px' : '33px 24px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
       Customers
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        {isSmallScreen ? (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: isSmallScreen ? '5px 0' : '16px 0' }}
          >
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
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
      
      </Box>
      <DataTable
        text={text}
      />
    </Box>
  )
}
