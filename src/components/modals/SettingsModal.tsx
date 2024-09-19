import { Box, Button, Divider, IconButton, Modal, Typography, useTheme } from '@mui/material'

import closeIcon from '../../assets/closeIcon.png'
import whiteCloseIcon from '../../assets/white_close.png'
import SettingsForm from '../../pages/Settings/_components/SettingsForm'
import '../style.css'


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#eff3f4',
  boxShadow: 0,
  p: 0,
  borderRadius: 6,
}

export default function SettingsModal({ metaInfo, isOpen, handleClose, handleInputChange, handleFileChange, handleSubmit, errors, edit }: any) {
  const { palette } = useTheme()
  return (
    <Modal open={isOpen} onClose={handleClose} sx={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    }}>
      <Box sx={{
        ...style,
        width: { xs: '95%', sm: '85%', md: '80%', lg: '50%', xl: '50%' },
        height: '95vh',
        overflowY: 'auto',
        px: '32px',
        pt: '32px',
        pb: '40px',
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#202020' : '#fff',
      }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems={'center'}
          sx={{ position: 'relative' }}
          pb={6}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              // color: '#0E141F',
            }}
          >
            Create Company Meta Info
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: '0',
              
            }}
            onClick={handleClose}
          >
            <img src={palette.mode === 'light' ? closeIcon: whiteCloseIcon} alt="close" />
          </IconButton>
        </Box>
        <Divider />
        <SettingsForm metaInfo={metaInfo} handleInputChange={handleInputChange} handleFileChange={handleFileChange} errors={errors} />
        <Box sx={{display:"flex", gap:"16px", justifyContent: 'flex-end'}}>
          <Button sx={{ bgcolor: "white", color: "#0E141F", height:"42px", width:"104px", textTransform:"capitalize" }} variant="contained" onClick={handleClose}>
           Close
          </Button>
          <Button sx={{ px: "16px", height:"42px", width:"112px", textTransform:"capitalize" }} variant="contained" color="secondary" onClick={handleSubmit}>
             {edit.isUpdate ? "Update" : "Create"} 
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

