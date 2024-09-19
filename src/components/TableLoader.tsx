// import { Box } from '@mui/material'
// import loader from '../assets/loader.png'

// export default function Loader() {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: 'rgba(217, 227, 231, 1)',
//       }}
//     >
//       <img
//         src={loader}
//         alt="loader"
//         style={{
//           animation: 'spin 2s linear infinite',
//         }}
//       />
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   )
// }

import { Box, keyframes } from '@mui/material'
import loader from '../assets/loader.png'

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
        height:"70vh",
        // backdropFilter: 'blur(10px)',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '& img': {
          animation: `${fadeInOut} 2s linear infinite`,
        },
      }}
    >
      <Box sx={{position:"relative", borderRadius:"50%", width:"80px", height:"80px"}}>
        <img src={loader} alt="loader" width={80} />
        <Box className="loader absolute top-7 left-7 " left={-8} position='absolute' top={-8} />
      </Box>
      {/* <img
        src={loader}
        alt="loader"
        style={{ height: '80px', width: '80px' }}
      /> */}
    </Box>
  )
}
