import { Box, Typography } from '@mui/material'

export default function InputLabel({
  label,
  required,
}: {
  label: string | undefined
  required?: boolean
}) {
  return (
    <div>
      {label && (
        <Typography sx={{ color: '#0D0D0D', mb: '8px', fontSize: '14px' }}>
          {label}
          {required && (
            <Box component="span" color={'red'}>
              *
            </Box>
          )}
        </Typography>
      )}
    </div>
  )
}
