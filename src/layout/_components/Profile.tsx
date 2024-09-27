import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/auth/authSlice';
// import { logout } from '../../redux/feature/auth/authSlice';
export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  // const dispatch = useAppDispatch()
  // const { userInfo } = useAppSelector(state => state?.auth)
 
  return (
    <Box>
      <Box onClick={handleClick} sx={{
        width:"40px",
        height:"40px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        border:"3px solid #fff",
        borderRadius:"50%",
        background:"#32976A12",
        cursor:"pointer"
      }}>
      <PersonIcon color='primary' sx={{fontSize:"28px"}} />
      </Box>
      {/* <Avatar src={profile} onClick={handleClick} sx={{ cursor: 'pointer' }} /> */}
      <Menu
        sx={{ marginTop: '5px'}}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box onClick={handleClose} sx={{ padding: '10px 20px', borderBottom:"1px solid silver" }}>
          <Typography variant="h6" sx={{textTransform:"capitalize", fontSize:"14px", fontWidth:'bold'}}></Typography>
          <Typography variant="body1"  sx={{textTransform:"capitalize", fontSize:"14px", fontWidth:'bold'}}></Typography>
        </Box>

        <MenuItem  onClick={() => dispatch(logout())}  sx={{textTransform:"capitalize", fontSize:"14px", fontWidth:'bold'}}><LogoutIcon sx={{textTransform:"capitalize", fontSize:"14px", fontWidth:'bold', margin:"0 2px"}}></LogoutIcon>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
