import React, { createContext, useCallback, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@DespesasViagem:token',
        '@DespesasViagem:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    // TODO:
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    // const { token, user } = response.data;

    // await AsyncStorage.multiSet([
    //   ['@DespesasViagem:token', token],
    //   ['@DespesasViagem:user', JSON.stringify(user)],
    // ]);

    // setData({ token, user });
    setData({token: 'abcd-1234', user: {name: 'André'}});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@DespesasViagem:token',
      '@DespesasViagem:user',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
