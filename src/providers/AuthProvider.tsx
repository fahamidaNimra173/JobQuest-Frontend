"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Cookies from "js-cookie";

interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string|null;
  role?: string;
  [key: string]:unknown;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // NextAuth session
  const { data: session } = useSession();

  // Load user & token from localStorage on mount (JWT login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(JSON.parse(storedToken));
  }, []);

  // Sync NextAuth Google login
  useEffect(() => {
    if (session?.user) {
      const googleUser: User = {
        firstName: session.user.name?.split(" ")[0],
        lastName: session.user.name?.split(" ")[1] || "",
        email: session.user.email??undefined,
        role: Cookies.get("auth_role") || "candidate", // default role
      };

      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));

      // If token already exists in localStorage from previous login
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) setToken(JSON.parse(storedToken));
    }
  }, [session]);

  // Update user partially (e.g., updating firstName, lastName, role)
  const updateUser = (data: Partial<User>) => {
    const updatedUser = { ...user, ...data } as User;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    Cookies.remove("auth_role");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token || !!session,
        setUser: (userData) => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        },
        setToken: (t) => {
          setToken(t);
          localStorage.setItem("authToken", JSON.stringify(t));
        },
        updateUser,
        logout,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;