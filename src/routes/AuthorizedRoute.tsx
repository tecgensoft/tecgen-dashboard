/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import { ReactNode } from 'react'
// import { roles } from '../layout/constant/roles'

interface PrivateRouteProps {
  children: ReactNode
  path: string
}

export default function AuthorizedRoute({
  children,

}: PrivateRouteProps): JSX.Element {
 
  
  return <>{children}</>
}
