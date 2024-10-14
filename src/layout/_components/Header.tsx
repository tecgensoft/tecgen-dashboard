import {
  AppBar,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useEffect } from 'react'
import { setThemeMood } from '../../redux/feature/theme/themeSlice'
import { useAppDispatch } from '../../redux/hook'
import Profile from './Profile'
export default function Header({
  open,
  drawerWidth,
  // handleDrawerToggle,
}: {
  open: boolean
  drawerWidth: number
  // handleDrawerToggle: () => void
}) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useAppDispatch()
  // const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    dispatch(setThemeMood(savedTheme === 'dark'))
  }, [dispatch])

  // const handleThemeToggle = (isDarkMode: boolean) => {
  //   localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  //   dispatch(setThemeMood(isDarkMode))
  // }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#141414' : '#eff3f4',
        backgroundImage: 'none',
        boxShadow: 'none',
        width:
          open && !isSmallScreen ? `calc(100% - ${drawerWidth}px)` : '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: open
          ? '0 24px'
          : !isSmallScreen
            ? '0px 24px 0 70px'
            : '0px 24px 0 14px',
        transition: 'padding 0.3s ease-in-out', // Only keep transition for padding
        // Remove other transitions that might cause layout shifts
      }}
    >
      <Box></Box>
      <Box display="flex" flexDirection="row" alignItems="center" gap="24px">

        <Profile />
      </Box>
    </AppBar>
  )
}
