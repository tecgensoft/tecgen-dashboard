// Notification.js
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { SUCCESS } from '../constant/constant'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Notification = ({
  open,
  message,
  handleClose,
  autoHideDuration = 6000,
  type = SUCCESS, // default type is 'neutral'
}) => {
  // Map type to MUI Alert severity
  const getSeverity = () => {
    switch (type) {
      case 'success':
        return 'success'
      case 'danger':
        return 'error'
      case 'warning':
        return 'warning'
      default:
        return 'info' // 'info' can be used for neutral or default type
    }
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverity()}
        sx={{
          width: '100%',
          ...(type === 'success' && {
            backgroundColor: '#4caf50', // Custom green color for success
            color: '#ffffff',
          }),
          ...(type === 'danger' && {
            backgroundColor: '#f44336', // Custom red color for danger
            color: '#ffffff',
          }),
          ...(type === 'warning' && {
            backgroundColor: '#ff9800', // Custom orange color for warning
            color: '#ffffff',
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
