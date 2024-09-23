import { createTheme } from '@mui/material/styles'
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#02BF6C',
      white: '#FFFFFF',
    },

    primary: {
      main: '#32976A',
    },
    secondary: {
      main: '#ea244e',
    },
    success: {
      main: '#02BF6C',
    },
    warning: {
      main: '#FFCC4D',
    },

    // red: {
    //   main:'#ff0100'
    // },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  spacing: 4,

})
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#0E141F',
      white: '#FFFFFF',
    },
    primary: {
      main: '#32976A',
    },
    secondary: {
      main: '#32976A',
    },
    slateGrey: {
      main: "#202020"
    }
  },
  typography: {
    fontFamily: 'Poppins',
  },
  spacing: 4
})
