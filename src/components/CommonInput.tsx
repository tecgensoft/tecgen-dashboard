import { styled, TextField } from '@mui/material'

export const CommonInput = styled(TextField)(({ theme }) => {
  const { mode } = theme.palette

  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: mode === 'dark' ? '#464646' : 'white',
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
      padding: '12px 18px ',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
 
  }
})
