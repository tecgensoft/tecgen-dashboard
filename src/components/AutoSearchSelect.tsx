/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, TextField } from '@mui/material'
import InputLabel from './InputLabel'

interface IAutoSearchSelect {
  name?: string
  label?: string
  placeholder?: string
  handleChange?: (_e: React.SyntheticEvent, value: { label: string; value: number } | null) => void 
  options: { label: string; value: number }[]
  required?: boolean
  error?: string | null | undefined
  value?: number | null | undefined
}

export default function AutoSearchSelect({
  value,
  label,
  placeholder,
  handleChange,
  options,
  required,
  error,
}: IAutoSearchSelect) {
  console.log(value)
  return (
    <Box width={'100%'}>
      <InputLabel label={label} required={required} />
      <Autocomplete
        value={options?.find(option => option?.value === value)}
        onChange={(event, newValue) => {
            if (handleChange) {
              handleChange(event, newValue);
            }
          }}
        options={options || []}
        getOptionLabel={option => option.label || ''}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        renderInput={params => (
          <TextField
            placeholder={placeholder}
            {...params}
            sx={{
              minWidth: '100%',
              '& .MuiInputBase-root': {
                // For the inner input field
                padding: '0px 12px',
                height: '42px',
                backgroundColor: theme =>
                  theme.palette.mode === 'dark' ? '#464646' : '#EFF3F4',
              },
            }}
            error={!!error}
            helperText={error}
          />
        )}
      />
    </Box>
  )
}
