/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck 
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Box,
    Button,
    Collapse,
    Divider,
    Grid,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material'
import { useState } from 'react'
import closeIcon from '../../../../assets/closeIcon.png'

// import lotIcon from "../../../../assets/lotIcon.png"
import Span from './Span'

interface Product {
  name: string
  weight: number
  quantity: number
  customCharge: number
  subTotal: number
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#eff3f4',
  boxShadow: 0,
  p: 0,
  borderRadius: 6,
  // "-webkit-box-shadow": "6px 2px 32px 4px rgba(0, 0, 0, 0.090)",
  // "-moz-box-shadow": "6px 2px 32px 4px rgba(0, 0, 0, 0.090)",
  // "box-shadow": "6px 2px 32px 4px rgba(0, 0, 0, 0.090);"
}

export default function ViewBooking({
  // product,
  // senderInfo,
  // receiverInfo,
  data,
  onClose,
}: any) {
  const { palette } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    receiver_information,
    sender_information,
    lot_list,
    reference,
    total_local_amount,
    discount,
    additional_charge,
    packing_charge,
    district_delivery_charge,
    home_delivery_charge,
    gross_weight,
    gross_weight_price,
    volume_weight,
    volume_weight_price
  } = data
  const {
    name: rec_name,
    phone: rec_phone,
    rec_city,
    rec_country,
  } = receiver_information //rec= receiver
  const { name, phone, city, country } = sender_information
  const handleExpandClick = (index: any) => {
    setIsExpanded(isExpanded === index ? null : index);
  }
  const mode = palette.mode === 'dark'
  return (
    <Modal
      open
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor:"rgba(0,0,0,0.1)"
        }
      }}
    >
      <Box sx={{
        ...style,
        width: { xs: '95%', sm: '85%', md: '70%', lg: '60%', xl: '50%' },
        maxHeight: '95vh',
        overflowY: 'auto',
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#202020' : '#eff3f4',
      }}>
        <Box
          display="flex"
          justifyContent="center"
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
              color: `${mode ? '#fff' : "'#0E141F'"}`,
            }}
          >
            Quick View
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: '0',
            }}
            onClick={onClose}
          >
            {/* <CloseIcon /> */}
            <img src={closeIcon} alt="close" />
          </IconButton>
        </Box>
        <Divider />
        <Grid container spacing={2} mt={2} pl={4} pr={4}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              padding: '8px',
              maxHeight: '200px',
            }}
          >
            <Paper variant="outlined" sx={{ p: 6 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                  textAlign: 'center',
                  paddingBottom: '24px',
                }}
              >
                Sender Information
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Name: <Span>{name && name}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Phone: <Span>{phone && phone}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Location:{' '}
                <Span>
                  {city && city.name}
                  {city && ','} {country && country.name}
                </Span>
              </Typography>
            </Paper>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            sx={{
              padding: '8px',
              height: '200px',
            }}
          >
            <Paper variant="outlined" sx={{ p: 6 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                  textAlign: 'center',
                  paddingBottom: '24px',
                }}
              >
                Receiver Information
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Name: <Span>{rec_name && rec_name}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Phone: <Span>{rec_phone && rec_phone}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`,
                }}
              >
                Location:{' '}
                <Span>
                  {rec_city && rec_city.name} {rec_city && ','}{' '}
                  {rec_country && rec_country.name}
                </Span>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box pl={4} pr={4}>
          {lot_list?.map((lot: any, index: number) => {
            const isExpandedCom = isExpanded === index;
            return (
              <Box mb={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleExpandClick(index)}
                  borderRadius={'8px'}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: '#32976A',
                    color: '#fff',
                    height: '56px',
                    padding: '0px',
                    position: 'relative',
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
                    }}
                  >
                    {/* <img src={lotIcon} alt="lot" />  */}
                    LOT 0{index + 1}
                  </Typography>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: '0px',
                      color: '#fff',
                    }}
                  >
                    {isExpandedCom ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={isExpandedCom} >
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ maxHeight: 250, overflow: 'auto' }}
                  >
                    <Box height={"48px"} sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: 'center'
                    }} >Product List</Box>
                    <Table>
                      <TableHead sx={{
                        bgcolor: theme =>
                          theme.palette.mode === 'dark' ? '#202020' : '#fff',
                      }}>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Custom Charge</TableCell>
                          <TableCell>Sub Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lot?.product_list?.map((prod: any) => (
                          <TableRow key={prod.id}>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.weight}</TableCell>
                            <TableCell>{prod.quantity}</TableCell>
                            <TableCell>{prod.custom_charge}</TableCell>
                            <TableCell>{prod.sub_total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Box>
            )
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: "wrap",
            gap: 4,
            marginTop: '32px',
            marginBottom: '32px',
          }}
          pl={4}
          pr={4}
        >
          <Button
            variant="outlined"
            sx={{
              bgcolor: 'white',
              color: '#0E141F',
              fontSize: '14px !important ',
              fontWeight: '400',
              textTransform: 'capitalize',
            }}
          >
            Gross Weight(KG): {gross_weight && gross_weight}
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: 'white',
              color: '#0E141F',
              fontSize: '14px !important ',
              fontWeight: '400',
              textTransform: 'capitalize',
            }}
          >
            Gross Weight Price:{gross_weight_price && gross_weight}
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: 'white',
              color: '#0E141F',
              fontSize: '14px !important ',
              fontWeight: '400',
              textTransform: 'capitalize',
            }}
          >
            Volume Weight(KG):{volume_weight && volume_weight}
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: 'white',
              color: '#0E141F',
              fontSize: '14px !important ',
              fontWeight: '400',
              textTransform: 'capitalize',
            }}
          >
            Volume Weight Price: {volume_weight_price && volume_weight_price}
          </Button>
        </Box>
        <Grid container spacing={2} pl={4} pr={4}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              padding: '8px',
              maxHeight: '200px',
            }}
          >
            <Paper variant="outlined" sx={{ p: 6 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Reference: <Span>{reference && reference}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                NOC: <Span>{phone && phone}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Total Local Amount:{' '}
                <Span>{total_local_amount && total_local_amount}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Discount Amount: <Span>{discount && discount}</Span>
              </Typography>
            </Paper>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            sx={{
              padding: '8px',
              maxHeight: '200px',
            }}
          >
            <Paper variant="outlined" sx={{ p: 6 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Additional Charge:{' '}
                <Span>{additional_charge && additional_charge}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Packing Charge: <Span>{packing_charge && packing_charge}</Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                District Delivery Charge:{' '}
                <Span>
                  {district_delivery_charge && district_delivery_charge}{' '}
                  {rec_city && ','}
                </Span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: `${mode ? '#fff' : "'#0E141F'"}`
                }}
              >
                Home Delivery Charge:{' '}
                <Span>{home_delivery_charge && home_delivery_charge}</Span>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box
          pl={4}
          pr={4}
          pb={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
