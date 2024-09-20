import { ReactNode } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  // const { userInfo, loading } = useAppSelector(state => state.auth)
  // const location = useLocation()
  // const { pathname, state } = location
  // if (loading) {
  //   return <Loader />
  // }

  // if (userInfo) {
  //   return <>{children}</>
  // }

  // if (!userInfo && !loading) {
  //   return <Navigate to="/login" state={{ ...state, path: pathname }} />
  // }
  return <>{children}</>
}
