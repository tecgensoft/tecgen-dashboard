import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase, Paper, useTheme } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { setText } from '../../redux/feature/search/searchSlice'
import { useAppDispatch } from '../../redux/hook'
import useDebounce from '../../utils/useDebounce'

export default function Search() {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        boxShadow: 'none',
        borderRadius: '16px',
        margin: '0 5px',
      }}
    >
      <IconButton
        type="button"
        sx={{
          px: '10px',
          color: theme.palette.mode === 'dark' ? '#999999' : '#999999',
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
      sx={{width:"100%", ml: 1}}
        onChange={handleSearchChange}
        // sx={{ }}
        placeholder="Search options"
        inputProps={{ 'aria-label': 'Search options' }}
      />
    </Paper>
  )
}
