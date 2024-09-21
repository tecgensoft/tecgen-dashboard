import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorReturn from '../errors/ErrorReturn'
import NoInternetConnection from '../errors/NoInternetConnection'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import NotFound from '../pages/notFound'


import BookingList from '../pages/booking/bookingList'

import Authenticate from './AuthenticateRoute'
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
        path: '/products/manage-products',
        children: [
          {
            index: true,
            element: (
                <BookingList />
            ),
          },
          
        ],
      },
      {
        path: '/category',
        children: [
          {
            path: 'manage-category',
            element: (
                <BookingList />
            ),
          },

          {
            path: 'manage-subcategory',
            element: (
                <BookingList />
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
