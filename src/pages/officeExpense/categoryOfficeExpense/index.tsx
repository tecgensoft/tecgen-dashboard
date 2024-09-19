/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExpenseCategoryModal from '../../../components/modals/ExpenseCategoryModal'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../redux/feature/officeExpense/officeExpenseApi'
import { setSelectAction } from '../../../redux/feature/product/ProductSlice'
import { setText } from '../../../redux/feature/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import useDebounce from '../../../utils/useDebounce'
import { CREATE_ACTION } from '../../ProductManagement/Product/constant'
import DataTable from './_component/Table'
// import DataTable from './_component/Table'
// import './style.css'
export default function OfficeExpenseCategory() {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const dispatch = useAppDispatch()
  const { text } = useAppSelector(state => state.search)
  // const [date, setDate] = useState('')
  // const [category, setCategory] = useState('')
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }
  // const navigate = useNavigate()
  return (
    <Box
      className="officeExpense"
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? '#202020'
            : 'rgba(255, 255, 255, 1)',
        padding: '33px 24px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
        Expense Category List
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
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            dispatch(setSelectAction(CREATE_ACTION))
            setIsOpen(true)
          }}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
            },
            color: 'white',
            margin: isSmallScreen ? '5px 0' : '10px 0',
          }}
        >
          Create
        </Button>
      </Box>

      <DataTable
        text={text}
        setIsOpen={setIsOpen}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
      />
      {isOpen && (
        <ExpenseCategoryModal
          updateProduct={updateCategory}
          createCategory={createCategory}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRow={selectedRow}
        />
      )}
    </Box>
  )
}
