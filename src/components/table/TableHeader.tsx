import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setOpen } from '../../redux/feature/open/openSlice'
import { useAppSelector } from '../../redux/hook'

export default function TableHeader({ tableTitle }: { tableTitle: string }) {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { open } = useAppSelector(state => state.open)
  const dispatch = useDispatch()

  return (
    <Grid container alignItems="center">
      <Grid item md={6} sx={{ textAlign: 'left' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {tableTitle && tableTitle}
        </Typography>
      </Grid>
      <Grid item md={6} sx={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
            padding: '0px 16px',
            borderRadius: '8px',
            width: isLargeScreen ? '30%' : 'auto',
            height: '38px',
            textTransform: 'capitalize',
          }}
          onClick={() => dispatch(setOpen(!open))}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  )
}
