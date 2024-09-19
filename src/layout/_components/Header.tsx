import PrintIcon from '@mui/icons-material/Print'
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import dark from '../../assets/dark.png'
import drawer_open_mb from '../../assets/drawerOpen_mb.png'
import light from '../../assets/light.png'
import light_in_dark from '../../assets/light_in_dark.png'
import PrintConfigModal from '../../components/modals/PrintConfigModal'
import Search from '../../components/search'
import { printerModalOpen } from '../../redux/feature/print/printSlice'
import { setThemeMood } from '../../redux/feature/theme/themeSlice'
import { useAppDispatch } from '../../redux/hook'
import Profile from './Profile'
export default function Header({
  open,
  drawerWidth,
  handleDrawerToggle,
}: {
  open: boolean
  drawerWidth: number
  handleDrawerToggle: () => void
}) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    dispatch(setThemeMood(savedTheme === 'dark'))
  }, [dispatch])

  const handleThemeToggle = (isDarkMode: boolean) => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    dispatch(setThemeMood(isDarkMode))
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#141414' : '#eff3f4',
        backgroundImage: 'none',
        boxShadow: 'none',
        width:
          open && !isSmallScreen ? `calc(100% - ${drawerWidth}px)` : '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: open
          ? '0 24px'
          : !isSmallScreen
            ? '0px 24px 0 114px'
            : '0px 24px 0 14px',
        transition: 'padding 0.3s ease-in-out', // Only keep transition for padding
        // Remove other transitions that might cause layout shifts
      }}
    >
      {isSmallScreen && (
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <img src={drawer_open_mb} alt="drawer_open" />
        </IconButton>
      )}
      {!isSmallScreen &&
      (location?.pathname === '/booking' ||
        location?.pathname === '/booking/lot_list' ||
        location?.pathname === '/product_management/product' ||
        location?.pathname === '/product_management/custom_charge' ||
        location?.pathname === '/payment/payment_history' ||
        location?.pathname === '/customers' ||
        location?.pathname === '/challan/challan_history' ||
        location?.pathname === '/officeExpense/officeExpense_history' ||
        location?.pathname === '/shipments' ||
        location?.pathname === '/officeExpense/officeExpenses') ? (
        <Search />
      ) : (
        <div></div>
      )}

      <Box display="flex" flexDirection="row" alignItems="center" gap="24px">
        {!isSmallScreen && (
          <ButtonGroup
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#202020 ' : '#fff',
              padding: '0px 16px',
              display: 'flex',
              gap: '16px',
              borderRadius: '16px',
            }}
          >
            <IconButton
              sx={{
                bgcolor:
                  theme.palette.mode !== 'dark' ? ' #EFF3F4 ' : 'transparent',
                padding: '10px',
                borderRadius: '16px',
                color: '#0E141F',
              }}
              onClick={() => handleThemeToggle(false)}
            >
              <img
                src={theme.palette.mode === 'dark' ? light_in_dark : light}
                alt="sun"
              />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                bgcolor:
                  theme.palette.mode === 'dark' ? ' #EFF3F4 ' : 'transparent',
                padding: '8px 12px',
                borderRadius: '16px',
                color: theme.palette.mode === 'dark' ? ' #000000 ' : '#000000',
              }}
              onClick={() => handleThemeToggle(true)}
            >
              <img src={dark} alt="moon" />
            </IconButton>
          </ButtonGroup>
        )}
        <Tooltip title="Connect Printer">
          <Button
            onClick={() => dispatch(printerModalOpen())}
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'rgba(14, 20, 31, 1)',
              },
              padding: '0px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              height: '38px',
              color:
                theme.palette.mode === 'dark' ? 'white' : 'rgba(14, 20, 31, 1)',
              textTransform: 'capitalize',
            }}
          >
            <PrintIcon />
          </Button>
        </Tooltip>
        <Profile />
      </Box>
      <PrintConfigModal />
    </AppBar>
  )
}
