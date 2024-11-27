import React, { createContext, useContext, useState, useEffect } from "react";
import { apiCall } from "@/utils/auth-api-w-refresh"; // Your API wrapper
import router, { Router } from "next/router";
import { access } from "fs";

// Define the UserContext type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch user info and set it in context
  const refreshUser = async () => {
    try {
      const response = await apiCall("/api/users/user-info", { method: "GET" });
      if (response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null); // If user info cannot be fetched, set to null
    logout();
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    router.push("/");
  };

  // Automatically fetch user info on initial load
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
