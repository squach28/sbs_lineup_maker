import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { api } from "../api/api";

type UserCredentials = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: UserCredentials) => Promise<{ message: string } | null>;
  logout: () => Promise<{ message: string } | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/auth/me`);
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: UserCredentials) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      checkAuthStatus();
    }
  };

  const logout = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {}
      );

      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      checkAuthStatus();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with AuthProvider");
  }
  return context;
};

export default AuthProvider;
