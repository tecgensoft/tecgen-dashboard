import { Box, keyframes } from '@mui/material'
import loader from '../../assets/logo.png'
import "../style.css"
const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`

export default function TableLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%",
        height:"75vh",
        // backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.062)',
        '& img': {
          animation: `${fadeInOut} 2s linear infinite`,
        },
      }}
    >
      <Box sx={{
          position: 'relative',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <img src={loader} alt="loader" width={70} />
        <Box className="loader absolute top-7 left-7 " left={-8} position='absolute' top={-8} />
      </Box>
      
    </Box>
  )
}
