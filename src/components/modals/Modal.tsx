import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import closeIcon from '../../assets/closeIcon.png'
import { setOpen } from '../../redux/feature/open/openSlice'
import { useAppSelector } from '../../redux/hook'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  boxShadow: 0,
  p: 0,
  borderRadius: 6,
}
export default function ModalView({
  children,
  headerTitle= 'Quick View',
  buttonValue = 'Create',
  onClick
}: {
  children: React.ReactNode;
  headerTitle?: string;
  buttonValue?: string;
  onClick?: () => void
}) {
  const { open } = useAppSelector(state => state.open)
  const dispatch = useDispatch()
  return (
    <Modal
      open={open}
      onClose={() => dispatch(setOpen(!open))}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.596)',
        },
      }}
    >
      <Box
        sx={{
          ...style,
          width: { xs: '95%', sm: '85%', md: '70%', lg: '40%', xl: '40%' },
          maxHeight: '95vh',
          overflowY: 'auto',
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#202020' : '#fff',
        }}
      >
        <Box
          display="flex"
          justifyContent="left"
          alignItems={'center'}
          sx={{ position: 'relative' }}
          pt={6}
          pb={6}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#0E141F',
              paddingLeft: '18px',
              //   color: `${mode ? '#fff' : "'#0E141F'"}`,
            }}
          >
            {headerTitle && headerTitle}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: '0',
              paddingRight: '12px',
            }}
            onClick={() => dispatch(setOpen(!open))}
          >
            <img src={closeIcon} alt="close" />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ py: '18px', px: '16px' }}>{children}</Box>
        <Divider sx={{ mb: 4 }} />
        <Box
          pl={4}
          pr={4}
          pb={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setOpen(!open))}
          >
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={onClick}>
            {buttonValue}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
