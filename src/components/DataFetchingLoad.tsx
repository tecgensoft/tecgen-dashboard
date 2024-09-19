import { Box } from '@mui/material'

export default function DataFetchingLoad({
  isLoading,
}: {
  isLoading: boolean
}) {
  return (
    <div>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          
        </Box>
      )}
    </div>
  )
}
