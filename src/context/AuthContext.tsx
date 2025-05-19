import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { SESSIONTIMEOUT } from "../constant";

// Define the type for the authentication context
interface AuthContextType {
  user: any; // Replace `any` with a more specific type if available
  setUser: React.Dispatch<React.SetStateAction<any>>; // Add this line
  login: (userDetails: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const SESSION_TIMEOUT = SESSIONTIMEOUT;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (storedUser && loginTimestamp) {
      try {
        const elapsed = Date.now() - parseInt(loginTimestamp, 10);
        if (elapsed > SESSION_TIMEOUT) {
          logout();
        } else {
          setUser(JSON.parse(storedUser));
          startSessionTimeout(SESSION_TIMEOUT - elapsed);
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userDetails: string) => {
    const timestamp = Date.now();
    const parsedDetails = JSON.parse(userDetails);
    setUser(parsedDetails);
    localStorage.setItem("loginTimestamp", timestamp.toString());
    localStorage.setItem("user", userDetails);
    startSessionTimeout(SESSION_TIMEOUT);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
  };

  const startSessionTimeout = (timeoutDuration: number) => {
    setTimeout(() => {
      alert("Session has expired. Please log in again.");
      logout();
    }, timeoutDuration);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };
