import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hook'

const Authenticate = ({ children }: { children: any }) => {
  const { token } = useAppSelector(state => state.auth)
  if (token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default Authenticate
