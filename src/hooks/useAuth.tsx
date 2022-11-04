import { AuthContext, AuthContextDataProps } from "../contexts/AuthContext";
import { useContext } from 'react'

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext)
  return context
}