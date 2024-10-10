import { Box, keyframes } from '@mui/material'
import loader from '../assets/logo.png'
import "./style.css"
const fadeInOut = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`

export default function Loader() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2c2c2ca0',
        '& img': {
          animation: `${fadeInOut} 2s linear infinite`,
        },
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: '99999',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={loader} alt="loader" width={70} />
        <Box
          className="loader absolute top-7 left-7 "
          left={-8}
          position="absolute"
          top={-8}
        />
      </Box>
    </Box>
  )
}
