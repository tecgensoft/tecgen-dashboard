import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Box, Button, CssBaseline, useMediaQuery } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import drawer_close_mb from '../assets/drawerClose_mb.png'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
const drawerWidth = 273

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.mode === 'dark' ? '#202020' : 'white',
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.mode === 'dark' ? '#202020' : 'white',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(22)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(22)})`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

function Layout() {
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  // const handleDrawerToggle = () => {
  //   if (isSmallScreen) {
  //     setMobileOpen(!mobileOpen)
  //   } else {
  //     setOpen(!open)
  //   }
  // }

  // const LogoImage = styled('img')({
  //   transition: 'all 0.3s ease-in-out',
  // })

  return (
    <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
      <CssBaseline />
      {!isSmallScreen || !isMediumScreen ? (
        <Drawer sx={{ height: '100vh' }} variant="permanent" open={open}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '32px 0px',

              bgcolor: theme =>
                theme.palette.mode === 'dark' ? '#202020' : 'white',
            }}
          >
            {/* <LogoImage
              src={
                !open
                  ? miniLogo
                  : theme.palette.mode === 'dark'
                    ? logo
                    : logo
              }
              // src={
              //   open
              //     ? logo_dark
              //     : theme.palette.mode === 'dark'
              //       ? logo_white
              //       : logo_dark
              // }
              alt="Logo"
              style={{
                transition: 'width 0.3s ease-in-out',
                maxHeight:"40px"
              }}
            /> */}

            <Button
              color="primary"
              variant="contained"
              sx={{
                position: 'absolute',
                right: '0',
                top: '80px',
                padding: '0px',
                minWidth: 10,
                zIndex:"99999"
              }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
            </Button>
          </Box>
          <Box>
            <Sidebar isOpenSidebar={open} />
          </Box>
        </Drawer>
      ) : (
        <MuiDrawer
          sx={{ position: 'relative' }}
          variant="temporary"
          open={mobileOpen}
          // onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: { width: '100%' },
          }}
        >
          <Box
            sx={{
              padding: '60px 30px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* <Box sx={{ bgcolor: 'primary' }}>
                <img
                  src={theme.palette.mode === 'dark' ? logo_white : logo_dark}
                  alt="Logo"
                />
              </Box> */}
              <Box sx={{ bgcolor: 'primary' }}>
                <img
                  src={drawer_close_mb}
                  alt="close"
                  onClick={() => setMobileOpen(!mobileOpen)}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Sidebar isOpenSidebar={true} />
          </Box>
        </MuiDrawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#141414' : ' #EFF3F4',
          width: '100%',
        }}
      >
        <Header
          open={open}
          drawerWidth={drawerWidth}
          // handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: '114px',
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? '#141414' : ' #eff3f4',
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              padding: '0 24px',

              width: isSmallScreen
                ? `100%`
                : open
                  ? `calc(100vw - ${drawerWidth}px)`
                  : `calc(100vw - ${86}px)`,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
