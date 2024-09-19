/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { roles } from '../layout/constant/roles'
import { useAppSelector } from '../redux/hook'

interface PrivateRouteProps {
  children: ReactNode
  path: string
}

export default function AuthorizedRoute({
  children,

  ...rest
}: PrivateRouteProps): JSX.Element {
  const { userInfo, loading } = useAppSelector(state => state.auth)

  // const { userInfo } = useAppSelector(state => state?.auth)

  const isAuthorized = roles[userInfo?.role]?.includes(rest?.path)


  const location = useLocation()
  const { pathname, state } = location
  if (loading) {
    return <Loader />
  }

  if (userInfo) {
    if (isAuthorized) {
      return <>{children}</>

      // <Redirect to="/unauthorized" /> // Redirect to an unauthorized page
      // null
      // <Navigate to="/login" state={{ ...state, path: pathname }} />
    } else {
      return <Navigate to="/" state={{ ...state, path: pathname }} />
    }
    // isAuthorized ? (
    //   <>{children}</>
    // ) : (
    //   // <Redirect to="/unauthorized" /> // Redirect to an unauthorized page
    //   // null
    //   // <Navigate to="/login" state={{ ...state, path: pathname }} />
    //   C
    // )
  }

  if (!userInfo && !loading) {
    return <Navigate to="/login" state={{ ...state, path: pathname }} />
  }
  return <>{children}</>
}
