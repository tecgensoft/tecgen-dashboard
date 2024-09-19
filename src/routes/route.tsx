import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorReturn from '../errors/ErrorReturn'
import NoInternetConnection from '../errors/NoInternetConnection'
import Product from '../pages/ProductManagement/Product'
import CustomCharge from '../pages/ProductManagement/customCharge'
import Tracking from '../pages/Tracking'
import UpdateLotStatus from '../pages/booking/UpdateLotStatus'
import CreateForm from '../pages/booking/createBooking'
import Payment from '../pages/booking/createBooking/_component/Payment'
import LotList from '../pages/booking/lotList'
import ChallanList from '../pages/challan/challanList'
import ChallanLot from '../pages/challan/challanLot'
import CreateChallan from '../pages/challan/createChallan'
import Customers from '../pages/customers'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import NotFound from '../pages/notFound'
import OfficeExpenseCategory from '../pages/officeExpense/categoryOfficeExpense'
import OfficeExpenseList from '../pages/officeExpense/officeExpenseList'

import PaymentHistory from '../pages/payment/paymentHistories'

import LocationStatus from '../pages/ProductManagement/locationStatus'
import Settings from '../pages/Settings'
import BookingList from '../pages/booking/bookingList'
import PromoCode from '../pages/booking/createBooking/_component/PromoCode'
import Branches from '../pages/branches'
import ConversionRate from '../pages/payment/conversionRate'
import AddLot from '../pages/shipments/addLot'
import ShipmentList from '../pages/shipments/shipmentList'

import Users from '../pages/users'
import Authenticate from './AuthenticateRoute'
import AuthorizedRoute from './AuthorizedRoute'
import PrivateRoute from './PrivateRoute'
import UpdateStatus from '../pages/shipments/updateStatus'
const routes = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
    element: (
      <NoInternetConnection>
        <ErrorBoundary
          FallbackComponent={ErrorReturn}
          onReset={() => (location.href = '/')}
        >
          <App />
        </ErrorBoundary>
      </NoInternetConnection>
    ),
    // errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/booking',
        children: [
          {
            index: true,
            element: (
              // <PrivateRoute>
              //   <BookingList />
              // </PrivateRoute>
              <AuthorizedRoute path="/booking">
                <BookingList />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'create_new_booking',
            element: (
              <AuthorizedRoute path="/booking/create_new_booking">
                <CreateForm />
              </AuthorizedRoute>
            ),
          },
          {
            path: `payment`,
            element: (
              // <PrivateRoute>
              //   <Payment />
              // </PrivateRoute>
              <AuthorizedRoute path="/booking/payment">
                <Payment />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'lot_list',
            element: (
              // <PrivateRoute>
              //   <LotList />
              // </PrivateRoute>
              <AuthorizedRoute path="/booking/lot_list">
                <LotList />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'promo_code',
            element: (
              <PrivateRoute>
                <PromoCode />
              </PrivateRoute>
            ),
          },
          {
            path: 'update_lot_status',
            element: (
              // <PrivateRoute>
              //   <UpdateLotStatus />
              // </PrivateRoute>
              <AuthorizedRoute path="/booking/update_lot_status">
                <UpdateLotStatus />
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: '/product_management',
        children: [
          {
            path: 'product',
            element: (
              // <PrivateRoute>
              //   <Product />
              // </PrivateRoute>
              <AuthorizedRoute path="/product_management/product">
                <Product />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'custom_charge',
            element: (
              // <PrivateRoute>
              //   <CustomCharge />
              // </PrivateRoute>
              <AuthorizedRoute path="/product_management/custom_charge">
                <CustomCharge />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'location_status',
            element: (
              // <PrivateRoute>
              //   <CustomCharge />
              // </PrivateRoute>
              <AuthorizedRoute path="/product_management/location_status">
                <LocationStatus />
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: '/challan',
        children: [
          {
            path: 'challan_history',
            element: (
              // <PrivateRoute>
              //   <ChallanList />
              // </PrivateRoute>
              <AuthorizedRoute path="/challan/challan_history">
                <ChallanList />
              </AuthorizedRoute>
            ),
          },
          {
            path: `challan_lot`,
            element: (
              // <PrivateRoute>
              //   <ChallanLot />
              // </PrivateRoute>
              <AuthorizedRoute path="/challan/challan_lot">
                <ChallanLot />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'create_challan',
            element: (
              // <PrivateRoute>
              //   <CreateChallan />
              // </PrivateRoute>
              <AuthorizedRoute path="/challan/create_challan">
                <CreateChallan />
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: '/payment',
        children: [
          {
            path: 'payment_history',
            element: (
              // <PrivateRoute>
              //   <PaymentHistory />
              // </PrivateRoute>
              <AuthorizedRoute path="/payment/payment_history">
                <PaymentHistory />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'conversion_Rate',
            element: (
              // <PrivateRoute>
              //   <ConversionRate />
              // </PrivateRoute>
              <AuthorizedRoute path="/conversion_Rate">
                <ConversionRate />
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: '/customers',
        element: (
          // <PrivateRoute>
          //   <Customers />
          // </PrivateRoute>
          <AuthorizedRoute path="/customers">
            <Customers />
          </AuthorizedRoute>
        ),
      },
      {
        path: '/tracking',
        element: (
          // <PrivateRoute>
          //   <Tracking />
          // </PrivateRoute>
          <AuthorizedRoute path="/tracking">
            <Tracking />
          </AuthorizedRoute>
        ),
      },
      {
        path: '/shipments',
        children: [
          {
            index: true,
            element: (
              // <PrivateRoute>
              //   <ShipmentList />
              // </PrivateRoute>
              <AuthorizedRoute path="/shipments">
                <ShipmentList />
              </AuthorizedRoute>
            ),
          },

          {
            path: 'addLot',
            element: (
              // <PrivateRoute>
              //   <AddLot />
              <AuthorizedRoute path="/shipments/addLot">
                <AddLot />
              </AuthorizedRoute>
            ),
          },
          {
            path: 'updateStatus',
            element: (
              // <PrivateRoute>
              //   <UpdateStatus />
              // </PrivateRoute>
              <AuthorizedRoute path="/shipments/updateStatus">
                <UpdateStatus />
              </AuthorizedRoute>
            ),
          },
        ],
        // element: (
        //   <PrivateRoute>
        //     <ShipmentList />
        //   </PrivateRoute>
        // ),
      },
      {
        path: '/users',
        element: (
          // <PrivateRoute>
          //   <Tracking />
          // </PrivateRoute>
          <AuthorizedRoute path="/users">
            <Users />
          </AuthorizedRoute>
        ),
      },
      {
        path: '/branches',
        element: (
          // <PrivateRoute>
          //   <Tracking />
          // </PrivateRoute>
          <AuthorizedRoute path="/branches">
            <Branches />
          </AuthorizedRoute>
        ),
      },
      {
        path: '/officeExpense',
        children: [
          {
            path: 'officeExpenses',
            element: (
              // <PrivateRoute>
              //   <OfficeExpenseList />
              // </PrivateRoute>
              <AuthorizedRoute path="/officeExpense/officeExpenses">
                <OfficeExpenseList />
              </AuthorizedRoute>
            ),
          },

          {
            path: 'officeExpense_category',
            element: (
              // <PrivateRoute>
              //   <OfficeExpenseCategory />
              // </PrivateRoute>
              <AuthorizedRoute path="/officeExpense/officeExpense_category">
                <OfficeExpenseCategory />
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: '/settings',
        children: [
          {
            path: 'company-meta-info-list',
            element: (
              // <PrivateRoute>
              //   <Settings />
              // </PrivateRoute>
              <AuthorizedRoute path="/settings/company-meta-info-list">
                <Settings />
              </AuthorizedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Authenticate>
        <Login />
      </Authenticate>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
  // {
  //   path: "/notFound",
  //   element: <NotFound />,
  // },
])

export default routes
