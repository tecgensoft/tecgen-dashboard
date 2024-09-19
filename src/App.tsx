import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Notification from './components/Notification'
import Layout from './layout/Layout'

import { setNotification } from './redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { darkTheme, lightTheme } from './theme/CustomTheme'
function App() {
  const { themeMood } = useAppSelector(state => state.theme)
  const { open, message, type } = useAppSelector(state => state.notification)
  const dispatch = useAppDispatch()

  // const [isDarkMode, setIsDarkMode] = useState(false)
  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode)
  // }
  // const { userInfo } = useAppSelector(state => state?.auth)
  // console.log('userInfo', userInfo)

  return (
    <ThemeProvider theme={themeMood ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout />
      <Notification
        open={open}
        handleClose={() => dispatch(setNotification({ open: false }))}
        message={message}
        type={type}
        // severity="success"
      />
    </ThemeProvider>
  )
}

export default App
