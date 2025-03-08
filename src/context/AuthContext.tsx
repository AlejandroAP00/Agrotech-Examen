import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "../api/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", { username, password });

      if (response.data.accessToken) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.accessToken);
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      throw new Error("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
