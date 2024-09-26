import { Box, Switch, Typography } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Switch demo' } }

interface ISwitchFieldProps {
  name: string;
  labelOfChecked?: string
  placeholder?: string
  value?: boolean
  onChange?: (e: any) => void
  required?: boolean
}
export default function SwitchField({
  name,
  labelOfChecked,
  value = false,
  onChange,
  required = false,
}: ISwitchFieldProps) {
  return (
    <Box>
      {labelOfChecked && (
        <Typography sx={{ color: '#0D0D0D', mb: '0px', fontSize: '14px' }}>
          {labelOfChecked}{required && <Box component='span' color={'red'} >*</Box>}
        </Typography>
      )}
      <Switch
        name={name}
        required={required}
        {...label}
        checked={value}
        onChange={onChange}
      ></Switch>
    </Box>
  )
}
