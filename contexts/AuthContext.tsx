import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'user_auth_token';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if a token exists in secure store
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        setIsAuthenticated(!!token);
      } catch (e) {
        console.error('[AuthContext] Failed to check auth status:', e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (token: string) => {
    try {
      // Store the token and update state
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('[AuthContext] Failed to save auth token:', e);
    }
  };

  const logout = async () => {
    try {
      // Remove the token and update state
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('[AuthContext] Failed to delete auth token:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
