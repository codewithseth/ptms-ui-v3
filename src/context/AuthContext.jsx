import { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../api/auth";
import { setStoredAccessToken } from "../lib/authToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken: newToken, user } = await refreshAccessToken();

        setAccessToken(newToken);
        setUser(user);
        setStoredAccessToken(newToken);
      } catch (err) {
        console.log("Failed to refresh access token", err);
      }
    };

    loadAuth();
  }, []);

  useEffect(() => {
    setStoredAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a provider");
  return context;
};
