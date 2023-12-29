"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtDecode from "jwt-decode";

// Define the shape of the decoded JWT token
interface DecodedToken {
  // Add any properties you expect in the JWT token
  type: string;
  name: string;
  sub: number;
  doctor: any;
  pharmacist: any;
}

interface AuthContextProps {
  decodedToken: DecodedToken | null;
  setDecodedToken: Dispatch<SetStateAction<DecodedToken | null>>;
}

// Create the context
const AuthContext = createContext<AuthContextProps>({
  decodedToken: null,
  setDecodedToken: () => {},
});

// Create the context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem("token");
    const session = sessionStorage.getItem("login");

    if (token) {
      // Decode the JWT token
      const decoded = jwtDecode<DecodedToken>(token);
      setDecodedToken(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ decodedToken, setDecodedToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthToken = () => useContext(AuthContext);
