import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'


import { useAppSelector } from '../../../redux/hook'
import { steps } from '../constant/stepper'
import { useMediaQuery, useTheme } from '@mui/material'

export default function BookingStepper() {
  
  const theme = useTheme()
  const { activeStep } = useAppSelector(state => state.stepper)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: theme?.palette?.mode === 'dark' ? 'black' : 'white',
        marginBottom: '23px',
        padding: '28px 41px',
        borderRadius: '8px',
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{isSmallScreen ? index + 1 : label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
