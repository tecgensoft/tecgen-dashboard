/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import recievedBd from '../../assets/recievedBd.png'
import tBooking from '../../assets/tBooking.png'
import tCustomer from '../../assets/tCustomers.png'
import tDelivery from '../../assets/tDelivery.png'
import tExpense from '../../assets/tExpense.png'
import tMissing from '../../assets/tMissing.png'
import vehicle from '../../assets/vehicles.png'
// import tShipment from '../../assets/tShipment.png'
import tStuff from '../../assets/tStuff.png'
import { logout } from '../../redux/feature/auth/authSlice'
import { useGetDashboardDataQuery } from '../../redux/feature/dashboard/dashboardApi'
import { useAppDispatch } from '../../redux/hook'

import Loader from '../../components/Loader'
import DataTable from './_component/Table'
import RecentBookingColumns from './_component/columns/RecentBookingColumns'
import RecentDeliveredColumns from './_component/columns/RecentDeliveredColumns'
import RecentExpense from './_component/columns/RecentExpense'
import RecentShipment from './_component/columns/RecentShipment'
import './style.css'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { data, isLoading } = useGetDashboardDataQuery(undefined)
  

  if(isLoading) return <Loader />

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ padding: isSmallScreen ? 0 : '0px' }}>
          <Box>
            <Grid container sx={{ marginBottom: '10px' }}>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Booking
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                          // color: 'white',
                        }}
                      >
                        {data?.data?.total_booking || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tBooking} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    // background:
                    //   theme?.palette?.mode === 'dark'
                    //     ? '#202020'
                    //     : 'rgba(34, 78, 114, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                    background:theme?.palette?.mode === 'dark'
                    ? '#202020'
                    : 'rgba(255, 255, 255, 1)',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Shipment
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_shipment || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={vehicle} alt="vehicle"></img>
                    </Box>
                   
                    {/* <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tShipment} alt="vehicle"></img>
                    </Box> */}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Shipments Received BD
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_shipment_received || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={recievedBd} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Delivery
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_delivery || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tDelivery} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ marginBottom: '10px' }}>
              <Grid
                item
                lg={3}
                xs={12}
                md={6}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Office Expenses
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_office_expenses || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tExpense} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Customers
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_customers || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tCustomer} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Missing
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_missing || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tMissing} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                <Box
                  sx={{
                    background:
                      theme?.palette?.mode === 'dark'
                        ? '#202020'
                        : 'rgba(255, 255, 255, 1)',
                    borderRadius: '16px',
                    padding: '24px 35px',
                    margin: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        Total Staff
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: '10px 0',
                        }}
                      >
                        {data?.data?.total_staff || 0}
                      </Typography>
                    </Box>{' '}
                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(34, 78, 114, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <img src={tStuff} alt="vehicle"></img>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background: 'white',
                    borderRadius: '16px',
                    // height: '250px',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  <DataTable
                    columns={RecentBookingColumns()}
                    data={data?.data?.booking_list}
                    isLoading={isLoading}
                    title="Recent Bookings"
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background: 'white',
                    borderRadius: '16px',
                    // height: '250px',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  <DataTable
                    columns={RecentDeliveredColumns()}
                    data={data?.data?.recent_delivered}
                    isLoading={isLoading}
                    title="Recent Delivered Bookings"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background: 'white',
                    borderRadius: '16px',
                    // height: '250px',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  <DataTable
                    columns={RecentShipment()}
                    data={data?.data?.recent_shipments}
                    isLoading={isLoading}
                    title="Recent Shipments"
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
              >
                {' '}
                <Box
                  sx={{
                    background: 'white',
                    borderRadius: '16px',
                    // height: '250px',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  <DataTable
                    columns={RecentExpense()}
                    data={data?.data?.recent_expenses}
                    isLoading={isLoading}
                    title="Recent ML Expenses"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </Grid>
    </Box>
  )
}

// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material'
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts'
// import note from '../../assets/note.png'
// import user from '../../assets/user.png'
// import vehicle from '../../assets/vehicles.png'
// import { logout } from '../../redux/feature/auth/authSlice'
// import { useGetDashboardDataQuery } from '../../redux/feature/dashboard/dashboardApi'
// import { useAppDispatch } from '../../redux/hook'
// import './style.css'

// const testData = [
//   { name: 'January', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'February', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
//   { name: 'August', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'September', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'October', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'November', uv: 1000, pv: 9800, amt: 2290 },
//   { name: 'December', uv: 2000, pv: 9800, amt: 2290 },
// ]

// const pieData = [
//   { name: 'Paid', value: 400 },
//   { name: 'Unpaid', value: 100 },
// ]
// const lineChartData = [
//   { name: 'January', value1: 4000, value2: 2400 },
//   { name: 'February', value1: 3000, value2: 1398 },
//   { name: 'March', value1: 2000, value2: 9800 },
//   { name: 'April', value1: 2780, value2: 3908 },
//   { name: 'May', value1: 1890, value2: 4800 },
//   { name: 'June', value1: 2390, value2: 3800 },
//   { name: 'July', value1: 3490, value2: 4300 },
//   { name: 'August', value1: 4000, value2: 2400 },
//   { name: 'September', value1: 3000, value2: 1398 },
//   { name: 'October', value1: 2000, value2: 9800 },
//   { name: 'November', value1: 1000, value2: 9800 },
//   { name: 'December', value1: 2000, value2: 9800 },
// ]
// const tableData = [
//   { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
//   { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
//   { id: 3, name: 'Alice Johnson', age: 29, email: 'alice.johnson@example.com' },
//   { id: 4, name: 'Bob Brown', age: 45, email: 'bob.brown@example.com' },
// ]

// const columns = [
//   { id: 'name', label: 'Name' },
//   { id: 'age', label: 'Age' },
//   { id: 'email', label: 'Email' },
// ]
// export default function Dashboard() {
//   const dispatch = useAppDispatch()
//   const theme = useTheme()
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
//   const { data } = useGetDashboardDataQuery(undefined)
//   console.log('data', data?.data)
//   return (
//     <Box>
//       <Grid container spacing={1}>
//         <Grid item lg={9} xs={12} sx={{ padding: isSmallScreen ? 0 : '10px' }}>
//           <Box>
//             <Grid container sx={{ marginBottom: '10px' }}>
//               <Grid
//                 item
//                 lg={4}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 {' '}
//                 <Box
//                   sx={{
//                     background: 'rgba(34, 78, 114, 1)',
//                     borderRadius: '16px',
//                     padding: '24px 35px',
//                     margin: '5px',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box>
//                       {' '}
//                       <Typography
//                         variant="body2"
//                         sx={{ fontSize: '10px', color: 'white' }}
//                       >
//                         Total Booking
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         sx={{
//                           fontSize: '20px',
//                           fontWeight: 'bold',
//                           margin: '10px 0',
//                           color: 'white',
//                         }}
//                       >
//                         9125
//                       </Typography>
//                     </Box>{' '}
//                     <Box
//                       sx={{
//                         width: '30px',
//                         height: '30px',
//                         borderRadius: '8px',
//                         background: 'white',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       {' '}
//                       <img src={note} alt="vehicle"></img>
//                     </Box>
//                   </Box>

//                   <Box>
//                     <span
//                       style={{
//                         fontSize: '10px',
//                         color: '#24ae61',
//                         marginRight: ' 10px',
//                       }}
//                     >
//                       +5%
//                     </span>{' '}
//                     <span
//                       style={{
//                         fontSize: '10px',
//                         color: 'white',
//                         margin: '0 10px',
//                       }}
//                     >
//                       Since last month
//                     </span>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid
//                 item
//                 lg={4}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 <Box
//                   sx={{
//                     background: 'white',
//                     borderRadius: '16px',
//                     padding: '24px 35px',
//                     margin: '5px',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box>
//                       {' '}
//                       <Typography variant="body2" sx={{ fontSize: '10px' }}>
//                         Total Booking
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         sx={{
//                           fontSize: '20px',
//                           fontWeight: 'bold',
//                           margin: '10px 0',
//                         }}
//                       >
//                         9125
//                       </Typography>
//                     </Box>{' '}
//                     <Box
//                       sx={{
//                         width: '30px',
//                         height: '30px',
//                         borderRadius: '8px',
//                         background: 'rgba(34, 78, 114, 1)',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       {' '}
//                       <img src={user} alt="vehicle"></img>
//                     </Box>
//                   </Box>

//                   <Box>
//                     <span
//                       style={{
//                         fontSize: '10px',
//                         marginRight: ' 10px',
//                         color: '#24ae61',
//                       }}
//                     >
//                       +5%
//                     </span>{' '}
//                     <span style={{ fontSize: '10px', margin: '0 10px' }}>
//                       Since last month
//                     </span>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid
//                 item
//                 lg={4}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 <Box
//                   sx={{
//                     background: 'white',
//                     borderRadius: '16px',
//                     padding: '24px 35px',
//                     margin: '5px',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box>
//                       {' '}
//                       <Typography variant="body2" sx={{ fontSize: '10px' }}>
//                         Total Booking
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         sx={{
//                           fontSize: '20px',
//                           fontWeight: 'bold',
//                           margin: '10px 0',
//                         }}
//                       >
//                         9125
//                       </Typography>
//                     </Box>{' '}
//                     <Box
//                       sx={{
//                         width: '30px',
//                         height: '30px',
//                         borderRadius: '8px',
//                         background: 'rgba(34, 78, 114, 1)',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       {' '}
//                       <img src={vehicle} alt="vehicle"></img>
//                     </Box>
//                   </Box>

//                   <Box>
//                     <span
//                       style={{
//                         fontSize: '10px',
//                         color: 'red',
//                         marginRight: ' 10px',
//                       }}
//                     >
//                       +5%
//                     </span>{' '}
//                     <span style={{ fontSize: '10px', margin: '0 10px' }}>
//                       Since last month
//                     </span>
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>

//             <Grid container sx={{ margin: '20px 0' }}>
//               <Grid
//                 item
//                 lg={12}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 {' '}
//                 <Box
//                   sx={{
//                     background: 'white',
//                     borderRadius: '16px',
//                     padding: '20px',
//                     overflowX: isSmallScreen ? 'auto' : 'hidden', // Enable scroll on small screens
//                   }}
//                 >
//                   <ResponsiveContainer
//                     width={isSmallScreen ? 800 : '100%'}
//                     height={400}
//                   >
//                     <BarChart data={testData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="uv" fill="rgba(34, 78, 114, 1)" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </Grid>
//             </Grid>
//             <Grid container>
//               <Grid
//                 item
//                 lg={6}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 {' '}
//                 <Box
//                   sx={{
//                     background: 'white',
//                     borderRadius: '16px',
//                     height: '250px',
//                     margin: '5px',
//                   }}
//                 >
//                   <TableContainer component={Paper} sx={{ height: '100%' }}>
//                     <Table stickyHeader>
//                       <TableHead>
//                         <TableRow>
//                           {columns.map(column => (
//                             <TableCell key={column.id}>
//                               {column.label}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {tableData.map(row => (
//                           <TableRow key={row.id}>
//                             <TableCell>{row.name}</TableCell>
//                             <TableCell>{row.age}</TableCell>
//                             <TableCell>{row.email}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Box>
//               </Grid>
//               <Grid
//                 item
//                 lg={6}
//                 xs={12}
//                 sx={{ padding: isSmallScreen ? 0 : '0 10px' }}
//               >
//                 <Box
//                   sx={{
//                     background: 'white',
//                     borderRadius: '16px',
//                     height: '250px',
//                     margin: '5px',
//                   }}
//                 >
//                   <TableContainer component={Paper} sx={{ height: '100%' }}>
//                     <Table stickyHeader>
//                       <TableHead>
//                         <TableRow>
//                           {columns.map(column => (
//                             <TableCell key={column.id}>
//                               {column.label}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {tableData.map(row => (
//                           <TableRow key={row.id}>
//                             <TableCell>{row.name}</TableCell>
//                             <TableCell>{row.age}</TableCell>
//                             <TableCell>{row.email}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>

//         <Grid
//           item
//           lg={3}
//           xs={12}
//           sx={{ padding: isSmallScreen ? 0 : '10px 0' }}
//         >
//           <Box
//             sx={{
//               background: 'white',
//               marginBottom: '10px',
//               borderRadius: '16px',
//               height: '280px',
//               color: 'black',
//             }}
//           >
//             <ResponsiveContainer
//               width="100%"
//               height="100%"
//               style={{ padding: ' 15px 20px 10px' }}
//             >
//               <LineChart data={lineChartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="value1"
//                   stroke="rgba(34, 78, 114, 1)"
//                   dot={false}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value2"
//                   stroke="rgba(255, 0, 0, 1)"
//                   dot={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//           <Box
//             sx={{
//               background: 'white',
//               margin: '20px 0',
//               borderRadius: '16px',
//               height: '280px',
//             }}
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={80}
//                   innerRadius={40} // Creates the donut effect
//                   fill="rgba(34, 78, 114, 1)"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill="rgba(34, 78, 114, 1)" />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>
//           <Box
//             sx={{
//               background: 'rgba(34, 78, 114, 1)',
//               marginTop: '10px ',
//               padding: '24px',
//               borderRadius: '16px',
//               height: '280px',
//             }}
//           >
//             <Box
//               sx={{
//                 height: '25px',
//                 width: '60px',
//                 background: 'white',
//                 borderRadius: '16px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Typography> NEW</Typography>
//             </Box>
//             <Typography sx={{ color: 'white', margin: '30px 0' }}>
//               WE have added new <br></br>
//               tracking options!
//             </Typography>

//             <Typography
//               variant="body2"
//               sx={{ color: 'white', margin: '30px 0' }}
//             >
//               This will enable you to track in details in <br></br> bookings.
//             </Typography>
//           </Box>
//         </Grid>
//         <Button onClick={() => dispatch(logout())}>Logout</Button>
//       </Grid>
//     </Box>
//   )
// }
