"use client";
import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/components/ui/Toast";
import axios from "axios";

// ✅ Define the type for the Auth Context
interface AuthContextType {
  user: any | null;
  loading: boolean;
  register: (
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    role: string,
    companyName?: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ✅ Create context with proper type
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/auth/check`);
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Conditional register function with optional extra field
  const register = async (
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    role: string,
    companyName?: string
  ): Promise<void> => {
    setLoading(true);
    try {
      const payload: any = {
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        provider: "Email/Password",
      };

      if (companyName) {
        payload.companyName = companyName;
      }

      const res = await axiosInstance.post("/auth/signup", payload);

      if (res.status === 201) {
        setUser(res.data.user);
        router.push("/dashboard/profile");
        showToast("success", "You registered successfully");
      } else {
        showToast("error", res.data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        setUser(res.data.user);
        router.push("/dashboard");
        showToast("success", "Logged in successfully");
      } else {
        showToast("error", res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      let errorMessage = "Login failed";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/auth/logout`);
      if (res.status === 200) {
        setUser(null);
        showToast("success", "Logged out successfully");
      }
    } catch (err) {
      console.error(err);
      let errorMessage = "Logout failed";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create the context value with proper type
  const value: AuthContextType = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook with proper type checking
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};