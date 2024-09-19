/* eslint-disable @typescript-eslint/no-unused-vars */
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    slateGrey: Palette['primary']
  }
  interface PaletteOptions {
    slateGrey?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    slateGrey: true
  }
}
