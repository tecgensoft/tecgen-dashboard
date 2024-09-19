import { Autocomplete, styled } from "@mui/material"

export const AutoCompleteField = styled(Autocomplete)(({ theme }) => {
  const { mode } = theme.palette
  return {
    '&&': {
      marginTop: '0px',
      marginBottom: '0px',
    
    },

    '& .MuiOutlinedInput-root': {
      padding: 0,

      backgroundColor: mode === 'dark' ? '#464646' : 'white',
    },
 
   
  }
})