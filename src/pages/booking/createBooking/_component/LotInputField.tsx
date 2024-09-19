/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import { at } from 'lodash'
import React from 'react'

interface StyledInputProps {
  sx?: any
  variant: any
  errorText?: string
  name: string
  label: string | any
  placeholder?: string
  type?: string

  disable?: boolean
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  SelectValue?: string | number
}
const handleWheel = (e: any, type: string | any) => {
  if (type === 'number') {
    const inputElement = e.target as HTMLInputElement
    inputElement.blur()
  }
}
const LotInputFieldComponent = styled(TextField)(({ theme, type }) => {
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
      ...(type === 'number' && {
        // Hides the spinner (up/down arrows) in number inputs
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      }),
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  }
})

const LotInputField: React.FC<StyledInputProps> = props => {
  const { SelectValue, handleChange, type, disable, ...rest } = props
  const [field, meta] = useField(props)

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error')

    if (touched && error) {
      return error
    }
  }
  const preventMinus = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (type === 'number') {
      if (e.code === 'Minus') {
        e.preventDefault()
      }
    }
  }
  const isError = Boolean(meta.touched && meta.error)
  return (
    <Box>
      {rest.label && <Typography>{rest.label}</Typography>}
      <LotInputFieldComponent
        helperText={_renderHelperText()}
        variant="outlined"
        fullWidth
        type={type}
        margin="normal"
        error={isError}
        onWheel={e => handleWheel(e, type)}
        {...field}
        name={rest.name}
        onKeyDown={e => preventMinus(e, type)}
        onChange={handleChange}
        value={SelectValue}
        disabled={disable}
        placeholder={props.placeholder && props.placeholder}
      />
    </Box>
  )
}

export default LotInputField
