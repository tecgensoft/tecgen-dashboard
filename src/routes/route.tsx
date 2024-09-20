import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorReturn from '../errors/ErrorReturn'
import NoInternetConnection from '../errors/NoInternetConnection'
import UpdateLotStatus from '../pages/booking/UpdateLotStatus'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import NotFound from '../pages/notFound'


import BookingList from '../pages/booking/bookingList'
import PromoCode from '../pages/booking/createBooking/_component/PromoCode'

import Authenticate from './AuthenticateRoute'
import AuthorizedRoute from './AuthorizedRoute'
import PrivateRoute from './PrivateRoute'
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
        path: '/products',
        children: [
          {
            index: true,
            element: (
              // <PrivateRoute>
              //   <BookingList />
              // </PrivateRoute>
                <BookingList />
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
