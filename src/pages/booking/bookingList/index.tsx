import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

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
      <Grid container alignItems="center">
        <Grid item md={6} sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Category List
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
              width: isLargeScreen ? '40%' : 'auto',
              height: '38px',
              textTransform: 'capitalize',
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>

      {/* <DataTable search={'text'} /> */}
    </Box>
  )
}
