import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material'

interface ISelectProps {
  label: string
  name: string
  error?: any
  value?: string
  data?: { label: string; value: any }[]
  onChange?: () => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  errorMessage?: string
  placeholder?: string // Add placeholder prop
}

function SelectField(props: ISelectProps) {
  const theme = useTheme()
  const mode = theme?.palette?.mode
  const { name, error, label, value, onChange, onBlur, data, errorMessage } = props

  return (
    <FormControl fullWidth error={error}>
      {label && <Typography>{label}</Typography>}
      <Select 
        sx={{
          height: '42px',
          bgcolor: mode === 'light' ? '#EFF3F4' : '#464646',
        }}
        labelId={`${name}-label`}
        id={name || ''}
        name={name}
        value={String(value) || ""}
        onChange={onChange}
        onBlur={onBlur}
        displayEmpty 
      >
        {/* <MenuItem value="" disabled>
          { `Select ${label ? label :"an option"}`}
        </MenuItem> */}
        {data?.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default SelectField
