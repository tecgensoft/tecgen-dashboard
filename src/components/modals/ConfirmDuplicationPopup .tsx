/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRef, useState } from 'react'
import InputField from '../../pages/booking/createBooking/_component/InputField'
import Notification from '../Notification'
import '../style.css'

const useStyles = makeStyles(theme => ({
  popup: {
    position: 'absolute',
    zIndex: 1,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
  },
  button: {
    marginRight: theme.spacing(2),
  },
}))

//{ onConfirm, onCancel, children }
const ConfirmDuplicationPopup = ({
  onConfirm,
  children,
  setTime,
  time,
  disabled,
}: any) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClick = () => {
    if (!disabled) {
      setOpen(prevOpen => !prevOpen)
    }
  }

  const [notificationOpen, setNotificationOpen] = useState(false)
  const handleClickAway = () => {
    setOpen(false)
    setTime(null)
  }

  const handleTime = (e: any) => {
    setTime(e.target.value)
  }
  return (
    <Box position="relative" display="inline-block">
      <Button
        ref={anchorRef}
        // variant="contained"
        // color="primary"
        onClick={handleClick}
      >
        {children}
      </Button>
      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            className={classes.popup}
            style={{
              top:
                anchorRef.current.offsetTop +
                anchorRef.current.offsetHeight +
                20,
              left: anchorRef.current.offsetLeft,
            }}
          >
            <Box
              mt={2}
              style={{
                width: isSmallScreen ? '220px' : '330px',
                height: '200px',
                padding: isSmallScreen ? '5px' : '20px 24px',
              }}
            >
              <Box
                sx={{
                  margin: '0px 2px',
                }}
              >
                <InputField
                  // key={input?.key}
                  type="number"
                  // disable={input?.disabled}
                  variant="outlined"
                  placeholder={`Lot duplication times`}
                  onChange={(e: any) => handleTime(e)}
                  sx={{
                    minWidth: '120px',
                    bgcolor: 'white',
                    borderRadius: '8px',
                  }}
                  name="time"
                ></InputField>
              </Box>
              {time ? (
                <Typography
                  variant="body2"
                  sx={{ margin: '16px 2px 5px', color: '#ec2251' }}
                >
                  Are you sure you want to duplicate the lot {time}{' '}
                  {time === '1' ? 'time' : 'times'}?
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ margin: '16px 2px 10px' }}>
                  Add duplication times
                </Typography>
              )}
              <Button
                sx={{ margin: '0 2px' }}
                variant="contained"
                color="secondary"
                disabled={time < 1}
                // className={classes.button}
                onClick={() => {
                  setTime(0)
                  onConfirm()
                  setOpen(false)
                  setNotificationOpen(true)
                }}
              >
                Duplicate
              </Button>
              {/* onCancel(); setOpen(false);  */}
              <Button
                sx={{ margin: '0 2px' }}
                variant="outlined"
                onClick={() => {
                  setTime(0)
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      )}
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        message="Duplication successful! "
        // severity="success"
      />
    </Box>
  )
}

export default ConfirmDuplicationPopup
