import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import React from 'react'
interface StyledInputProps {
  type?: string
  errorText?: string
  name: string
  label?: string
  placeholder?: string
  value?: string
  disable?: boolean
  error?: boolean
  helperText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  inputLabel?: string
}
const InputFieldComponent = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: mode === 'dark' ? '#464646' : '#EFF3F4',
      height: '42px',
      '& fieldset': {
        borderColor: mode === 'dark' ? '#464646' : '#D9E3E7',
      },
      '&:hover fieldset': {
        borderColor: mode === 'dark' ? 'none' : '#818D90',
      },
      '&.Mui-focused fieldset': {
        borderColor: mode === 'dark' ? 'none' : '#818D90',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 18px !important',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  }
})
const InputField: React.FC<StyledInputProps> = ({
  type='text',
  name,
  label,
  inputLabel,
  value,
  error,
  helperText,
  disable,
  onChange,
  required,
  placeholder
} ) => {
  return (
    <Box>

      {label && <Typography sx={{color:"#0D0D0D", mb:"8px", fontSize:"14px"}}>{label}{required && <Box component='span' color={'red'} >*</Box>}</Typography>}
      <InputFieldComponent
        type={type}
        helperText={helperText}
        label={inputLabel && inputLabel}
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        error={error}
        name={name}
        placeholder={placeholder && placeholder}
        disabled={disable}
        onChange={onChange}
      />
    </Box>
  )
}
export default InputField
