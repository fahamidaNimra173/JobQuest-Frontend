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
        console.log("Initializing auth...");
        const res = await axiosInstance.get(`/auth/check`);
        console.log("User check response:", res);
        if (res.status === 200 && res.data.success && res.data.user) {
          console.log("User authenticated:", res.data.user);
          setUser(res.data.user);
        } else {
          console.log("User not authenticated or invalid response");
          setUser(null);
        }
      } catch (err: any) {
        console.log("User check error:", err);
        // If it's a 401 or 403 error, explicitly set user to null
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log("Authentication error - setting user to null");
          setUser(null);
        } else {
          setUser(null);
        }
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
      console.log("Starting registration process...");
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

      console.log("Registration payload:", payload);
      const res = await axiosInstance.post("/auth/signup", payload);
      console.log("Signup response:", res);

      if (res.status === 201) {
        console.log("Registration successful, setting user data");
        setUser(res.data.user);
        
        // With HTTP-only cookies, we don't need to manually store the token
        // The cookie is automatically handled by the browser and axios withCredentials
        
        console.log("Redirecting to dashboard");
        // Small delay to ensure cookies are set before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
        
        showToast("success", "You registered successfully");
      } else {
        showToast("error", res.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.log("Signup error:", error);
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 400) {
          errorMessage = "Invalid registration data";
        } else if (error.response?.status === 409) {
          errorMessage = "Email already in use";
        } else if (error.response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
        console.log("Axios error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
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
      console.log("Starting login process...");
      console.log("Login credentials:", { email });
      
      const res = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", res);

      if (res.status === 200) {
        console.log("Login successful, setting user data");
        setUser(res.data.user);
        
        // With HTTP-only cookies, we don't need to manually store the token
        // The cookie is automatically handled by the browser and axios withCredentials
        
        console.log("Redirecting to dashboard");
        // Small delay to ensure cookies are set before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
        
        showToast("success", "Logged in successfully");
      } else {
        showToast("error", res.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Login failed";
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 400) {
          errorMessage = "Invalid credentials";
        } else if (err.response?.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (err.response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
        console.log("Axios error details:", {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        });
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
        
        // Small delay to ensure cookies are removed before redirecting
        setTimeout(() => {
          router.push('/login');
        }, 100);
        
        showToast("success", "Logged out successfully");
      }
    } catch (err) {
      console.error("Logout error:", err);
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