/* eslint-disable @typescript-eslint/ban-ts-comment */

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import bookingIcon from '../../../assets/bookingIcon.png'
import callIcon from '../../../assets/callIcon.png'
import closeIcon from '../../../assets/closeIcon.png'
import dateIcon from '../../../assets/date.png'
import paidIcon from '../../../assets/paidIcon.png'
import totalLotIcon from '../../../assets/totalLotIcon.png'
import { formatDateString } from '../../../utils/localTime'
import TrackingCard from './TrackingCard'

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
interface PaymentButtonProps extends ButtonProps {
  paymentStatus: 'PAID' | 'UNPAID'
}
const StyledPaymentButton = styled(Button)<PaymentButtonProps>(
  ({ paymentStatus }) => ({
    color: paymentStatus === 'PAID' ? '#02BF6C' : '#EA244E',
    backgroundColor: paymentStatus === 'PAID' ? '#24bb7c1d' : '#ea244f1f',
  }),
)

export default function TrackingModal({
  open,
  handleClose,
  trackingData,
}: any) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const {
    lot_list,
    booking_date,
    paid_amount,
    payment_status,
    receiver_phone,
    sender_phone,
    from,
    to,
    total_lot,
    current_user_currency_code,
    reference,
  } = trackingData || {}

  const [isExpanded, setIsExpanded] = useState(false)
  const handleExpandClick = (index: any) => {
    setIsExpanded(isExpanded === index ? null : index)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...style,
          width: { xs: '95%', sm: '85%', md: '80%', lg: '80%', xl: '80%' },
          maxHeight: '95vh',
          overflowY: 'auto',
          px: '32px',
          pt: '32px',
          pb: '48px',
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#202020' : '#EFF3F4',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={{ xs: 3, md: 5 }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '12px', md: '14px' },
                fontWeight: '400',
                color: '#999999',
              }}
            >
              Booking Reference No
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: '500',
                color: theme =>
                  theme.palette.mode === 'dark' ? '#fff' : '#0E141F',
              }}
            >
              {reference && reference}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              bgcolor: theme => (theme.palette.mode === 'dark' ? '#fff' : ''),
            }}
          >
            <img src={closeIcon} alt="close" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 6, md: 5, lg: 3 },
            mb: { xs: 2, md: 3 },
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? '#141414' : 'white',
            p: { xs: '16px', md: '16px' },
            borderRadius: '8px',
            justifyContent: 'space-between',
          }}
        >
          <TrackingCard
            icon={dateIcon}
            title="Booking Date"
            date={booking_date}
          />
          <TrackingCard icon={bookingIcon} title="Booking From" date={from} />
          <TrackingCard
            icon={callIcon}
            title="Sender Contact"
            date={sender_phone}
          />
          <TrackingCard icon={totalLotIcon} title="Destination" date={to} />
          <TrackingCard
            icon={callIcon}
            title="Receiver Contact"
            date={receiver_phone}
          />
          <TrackingCard icon={paidIcon} title="Total LOT" date={total_lot} />
          <TrackingCard
            icon={dateIcon}
            title="Paid Amount"
            date={paid_amount + " " +current_user_currency_code}
          />
          <TrackingCard
            icon={dateIcon}
            title="Payment Status"
            date={
              <StyledPaymentButton
                paymentStatus={payment_status && payment_status}
              >
                {payment_status && payment_status}
              </StyledPaymentButton>
            }
          />
        </Box>

        <Box>
          {lot_list?.map((lot: any, index: number | any) => {
            const isExpandedCom = isExpanded === index

            const sortHistoryByDate = (history: { created_at: string }[]) => {
              return [...history].sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime(),
              )
            }
            const lotReverseList = sortHistoryByDate(lot.history)
            return (
              <Box key={index} mb={'8px'}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => handleExpandClick(index)}
                  borderRadius={`8px 8px ${isExpandedCom ? '0px 0px' : '8px 8px'}`}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: theme =>
                      theme.palette.mode === 'dark' ? '' : '#fff',
                    color: '#999999',
                    height: '44px',
                    padding: '0px',
                    position: 'relative',
                    border: `1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#D9E3E7'}`,
                    px: '18px',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      marginBottom: '0px',
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      marginBottom: '0px',
                      color:"#434343"
                    }}
                  >
                    {lot?.reference}
                  </Typography>
                  <IconButton sx={{ padding: '0px' }}>
                    {isExpandedCom ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={isExpandedCom}>
                  <Box
                    bgcolor={theme =>
                      theme.palette.mode === 'dark' ? '#141414' : '#fff'
                    }
                    py="68px"
                    // 434343
                    borderBottom={`1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#D9E3E7'}`}
                    borderLeft={`1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#D9E3E7'}`}
                    borderRight={`1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#D9E3E7'}`}
                    borderRadius={'0px 0px 8px 8px'}
                    sx={{
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'center',
                    }}
                  >
                    <Stepper
                      alternativeLabel={!isMobile}
                      orientation={isMobile ? 'vertical' : 'horizontal'}
                      sx={{
                        px: '20px',
                        '.MuiStepConnector-line': {
                          borderColor: '#02BF6C',
                          borderTopWidth: '4px',
                          position: 'relative',
                          top:"-1px"
                        },
                        '.MuiStepIcon-root': {
                          color: '#02BF6C',
                        },
                        '.MuiStepIcon-root.Mui-active': {
                          color: '#02BF6C',
                        },
                      }}
                    >
                      {lotReverseList.map((location: any) => {
                        console.log(location.created_at)
                        return (
                          <Step key={location?.id}active={true} completed>
                            <StepLabel >
                              <Typography
                                variant="body1"
                                fontWeight={500}
                                // theme => theme.palette.mode === 'dark' ? '' :''
                                color={theme =>
                                  theme.palette.mode === 'dark'
                                    ? '#fff'
                                    : '#3B5C77'
                                }
                                fontSize={'14px'}
                                mb={2}
                              >
                                {location?.location_status}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                mb={2}
                              >
                                <Typography component='span' sx={{fontSize:"12px"}}>
                                  {formatDateString(location.created_at)}
                                </Typography>
                                
                              </Typography>
                              <Typography
                                // color="#434343"
                                fontSize={'14px'}
                                fontWeight={'300'}
                                sx={{
                                  color: (theme) => theme.palette.mode === 'light'? "#434343" :"#D9E3E7"
                                }}
                              >
                                Created by{' '}
                                <Typography component="span" 
                                sx={{
                                  color: (theme) => theme.palette.mode === 'light'? "#434343" :"#D9E3E7"
                                }}fontSize={"14px"}>
                                  {location.created_by}
                                </Typography>
                              </Typography>
                            </StepLabel>
                          </Step>
                        )
                      })}
                    </Stepper>
                  </Box>
                </Collapse>
              </Box>
            )
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: '32px',
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
