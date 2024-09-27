import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { useAppSelector } from '../redux/hook'

interface PrivateRouteProps {
  children: ReactNode
}


export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const { userInfo, loading } = useAppSelector(state => state.auth)
  const location = useLocation()
  const { pathname, state } = location
  if (loading) {
    return <Loader />
  }
console.log('ok')
  if (userInfo) {
    return <>{children}</>
  }

  if (!userInfo && !loading) {
    return <Navigate to="/login" state={{ ...state, path: pathname }} />
  }
  return <React.Fragment>{children}</React.Fragment>
}
