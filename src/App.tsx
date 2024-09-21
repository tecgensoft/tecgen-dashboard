import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Layout from './layout/Layout'

import { useAppSelector } from './redux/hook'
import { darkTheme, lightTheme } from './theme/CustomTheme'
function App() {
  const { themeMood } = useAppSelector(state => state.theme)
  // const dispatch = useAppDispatch()

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
      
    </ThemeProvider>
  )
}

export default App
