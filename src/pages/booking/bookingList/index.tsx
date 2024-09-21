import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import DataTable from './_component/Table'

import AddIcon from '@mui/icons-material/Add'


export default function BookingList() {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Box
      className="booking"
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      <Grid container>
      <Grid item  lg={6} sx={{ textAlign: 'left' }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 500, marginBottom: '32px' }}
      >
        Category List
      </Typography>
      </Grid> 
      <Grid item lg={6} sx={{ textAlign: 'right' }}>
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
                width: isLargeScreen ? '100%' : 'auto',
                height: '38px',
                textTransform: 'capitalize',
                marginBottom: '10px',
              }}
            >
              Create
            </Button>
          </Grid>
      </Grid>

      <DataTable search={'text'} />
    </Box>
  )
}
