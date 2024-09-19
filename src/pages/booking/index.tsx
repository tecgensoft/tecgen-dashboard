import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function Booking() {
  return (
    <Box sx={{ padding: '0 24px' }}>
      <Outlet />
    </Box>
  )
}
