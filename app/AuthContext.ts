import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loadAuthState, login, logout, authenticated, setAuthenticated, token } from './auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated);

  useEffect(() => {
    loadAuthState();
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const success = await login(username, password);
    setIsAuthenticated(authenticated);
    return success;
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(authenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
