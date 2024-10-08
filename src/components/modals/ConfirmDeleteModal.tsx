/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'

const ConfirmDeleteModal = ({ open, onClose, onConfirm, title, isLoading }: any) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ padding: '8px 32px', margin: '0 2px' }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: '8px 32px', margin: '0 2px' }}
            onClick={onConfirm}
          >
            {isLoading ? <CircularProgress size={'16px'} sx={{ color: 'white' }} /> : 'Confirm' }
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmDeleteModal
