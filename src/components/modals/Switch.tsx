import { Box, Switch, Typography } from '@mui/material'
const label = { inputProps: { 'aria-label': 'Switch demo' } }

interface ISwitchFieldProps {
  labelOfChecked?: string
  placeholder?: string
  value?: boolean
  onChange?: () => void
  required?: boolean
}
export default function SwitchField({
  labelOfChecked,
  value,
  onChange,
  required = false,
}: ISwitchFieldProps) {
  return (
    <Box>
      {labelOfChecked && (
        <Typography sx={{ color: '#0D0D0D', mb: '0px', fontSize: '14px' }}>
          {labelOfChecked}
        </Typography>
      )}
      <Switch
        required={required}
        {...label}
        checked={value}
        onChange={onChange}
      ></Switch>
    </Box>
  )
}
