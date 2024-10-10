import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Layout from './layout/Layout'

import Notification from './components/Notification'
import { setNotification } from './redux/feature/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { darkTheme, lightTheme } from './theme/CustomTheme'
function App() {
  const { themeMood } = useAppSelector(state => state.theme)
  // const dispatch = useAppDispatch()
  const { open, message, type } = useAppSelector(state => state.notification)
  const dispatch = useAppDispatch()

  return (
    <ThemeProvider theme={themeMood ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout />
      <Notification
        open={open}
        handleClose={() => dispatch(setNotification({ open: false }))}
        message={message}
        type={type}
      />
    </ThemeProvider>
  )
}

export default App
