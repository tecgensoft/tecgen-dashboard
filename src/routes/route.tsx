import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorReturn from '../errors/ErrorReturn'
import NoInternetConnection from '../errors/NoInternetConnection'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import NotFound from '../pages/notFound'



import Category from '../pages/ProductManagement/Category'
import SubCategory from '../pages/ProductManagement/SubCategory'
import Store from '../pages/Store'
import Authenticate from './AuthenticateRoute'
import PrivateRoute from './PrivateRoute'

const routes = createBrowserRouter([
  {
    path: '/',
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
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: '/store-list',
            element: <Store />,
          },
          {
            path: '/products/manage-products',
            children: [
              {
                index: true,
                element: <Category/>,
              },
            ],
          },
          {
            path: '/category',
            children: [
              {
                path: 'manage-category',
                element: <Category />,
              },
              {
                path: 'manage-subcategory',
                element: <SubCategory />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Authenticate>
        {' '}
        <Login />
      </Authenticate>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default routes
