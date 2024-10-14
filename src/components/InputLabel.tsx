import { Box, Typography } from '@mui/material';

export default function InputLabel({
  label,
  required,
  mb='8px'
}: {
  label: string | undefined
  required?: boolean;
  mb?:string
}) {
  return (
    <div>
      {label && (
        <Typography sx={{ color: '#0D0D0D', mb: mb, fontSize: '14px' }}>
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
