import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

export interface UserProps {
  name: string;
  avatarURL: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '740309648542-5mf5r7kgufr23da9ncb24jdr0m2ktacd.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync()
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', { access_token });
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);

    } catch (error) {
      console.log(error.response.data);
      throw error;
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      user,
      isUserLoading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}