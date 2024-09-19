/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  styled,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GridArrowDownwardIcon, GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'
import CreateExpenseModal from '../../../components/modals/CreateExpenseModal'
import { DANGER, SUCCESS } from '../../../redux/feature/notification/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import {
  useCreateExpenseMutation,
  useGetOfficeExpenseCategoryForSelectQuery,
  useLazyDownloadExpenseQuery,
  useUpdateExpenseMutation,
} from '../../../redux/feature/officeExpense/officeExpenseApi'
import { setSelectAction } from '../../../redux/feature/product/ProductSlice'
import { setText } from '../../../redux/feature/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import useDebounce from '../../../utils/useDebounce'
import DataTable from './_component/Table'
import { EXPENSE_CREATE_ACTION, EXPENSE_EDIT_ACTION } from './constant'
// import './style.css'
export default function OfficeExpenseList() {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // const [createProduct] = useCreateProductMutation()
  // const [updateProduct] = useUpdateProductMutation()
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { selectAction } = useAppSelector(state => state?.select)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Use the custom hook
  const { data: expenseCategory } = useGetOfficeExpenseCategoryForSelectQuery({
    page: 1,
  })
  const dispatch = useAppDispatch()
  const { text } = useAppSelector(state => state.search)
  const [date, setDate] = useState('')
  const [createOpenModal, setCreateOpenModal] = useState(false)
  const [createExpense] = useCreateExpenseMutation()
  const [updateExpense] = useUpdateExpenseMutation()
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    dispatch(setText(debouncedSearchTerm))
  }, [debouncedSearchTerm])
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  const [triggerDownloadExpense] = useLazyDownloadExpenseQuery({
    date: date,
    expense_category__id: category,
  })
  //  console.log(isSuccess
  //   )

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      res = await triggerDownloadExpense({
        date: date,
        expense_category__id: category,
      })
        .unwrap()
        .then(data => {
          console.log(data?.status)
          if (data?.status === 200) {
            setIsLoading(false)
            dispatch(
              setNotification({
                open: true,
                message: 'Report downloaded!',
                type: SUCCESS,
              }),
            )
          } else {
            console.log('here')
            setIsLoading(false)
          }
        })
    } catch (err) {
      const errorMessage =
        JSON.parse(err?.data)?.message ||
        'An error occurred while downloading the report'
      dispatch(
        setNotification({
          open: true,
          message: errorMessage,
          type: DANGER,
        }),
      )
      setIsLoading(false)
    }
  }
  const ExpenseButton = styled(Button)({
    textTransform: 'none',
    fontSize: 14,
    padding: '6px 12px',

    lineHeight: 1.5,
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
  })

  return (
    <>
      {' '}
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
          Office Expenses List
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
          <ExpenseButton
            startIcon={<AddIcon />}
            onClick={() => {
              dispatch(setSelectAction(EXPENSE_CREATE_ACTION))
              setCreateOpenModal(true)
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
          </ExpenseButton>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: '16px' }}
          alignItems={'center'}
        >
          <Grid item xs={12} md={6} lg={2}>
            <Select
              displayEmpty
              fullWidth
              sx={{
                minWidth: 100,
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(57, 57, 57, 1)'
                    : 'white',
                height: '42px',
              }}
              value={date}
              onChange={e => setDate(e.target.value as string)}
            >
              <MenuItem value="" disabled>
                Date
              </MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="last_thirty_days">Last thirty days</MenuItem>
              <MenuItem value="this_month">This month</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <Select
              displayEmpty
              fullWidth
              sx={{
                minWidth: 120,
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(57, 57, 57, 1)'
                    : 'white',
                height: '42px',
              }}
              value={category}
              onChange={e => setCategory(e.target.value as string)}
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {expenseCategory?.map((eCategory: any) => (
                <MenuItem value={eCategory?.value}>{eCategory?.label}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <Button
              // disabled={isLoading}
              variant="contained"
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <GridArrowDownwardIcon fontSize="small" />
                )
              }
              onClick={handleDownload}
              fullWidth
              sx={{
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : 'rgba(239, 243, 244, 1)',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : 'rgba(239, 243, 244, 1)',
                },
                color:
                  theme.palette.mode === 'dark'
                    ? 'white'
                    : 'rgba(14, 20, 31, 1)',
                padding: '0px 16px',
                borderRadius: '8px',
                border:
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(187, 36, 68, 1)'
                    : '1px solid rgba(217, 227, 231, 1)',
                boxShadow: 'none',
                textTransform: 'capitalize',
                height: '40px',
              }}
            >
              Expense Report
            </Button>
          </Grid>
        </Grid>
        <DataTable
          text={text}
          setCreateOpenModal={setCreateOpenModal}
          setSelectedRow={setSelectedRow}
          selectedRow={selectedRow}
        />
        {/* {isOpen && (
  <ProductModal
    updateProduct={updateProduct}
    createProduct={createProduct}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    selectedRow={selectedRow}
  />
)} */}
      </Box>{' '}
      <CreateExpenseModal
        open={createOpenModal}
        updateExpense={updateExpense}
        createExpense={createExpense}
        handleClose={() => setCreateOpenModal(false)}
        item={selectAction === EXPENSE_EDIT_ACTION ? selectedRow : {}}
        expenseCategory={expenseCategory}
      />
    </>
  )
}
