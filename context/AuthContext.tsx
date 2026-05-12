import React, {
  createContext,
  useContext,
  useState,
} from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;

  login: (username: string) => void;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [username, setUsername] =
    useState<string | null>(null);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);