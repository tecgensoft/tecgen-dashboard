import { Box, styled } from '@mui/material'

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
  },
  '& .no-rows-secondary': {
    fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
  },
}))

export default function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 2, color: 'black' }}>No results found.</Box>
    </StyledGridOverlay>
  )
}
