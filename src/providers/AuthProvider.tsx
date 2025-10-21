"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/components/ui/Toast";
import axios from "axios";

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
interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  provider: string;
  companyName?: string;
}


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
        const res = await axiosInstance.get(`/api/auth/check-user`);
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
      const payload: RegisterPayload = {
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        provider: "email",
      };

      if (companyName) {
        payload.companyName = companyName;
      }
      let res;
      if (role === 'employer') {
        res = await axiosInstance.post("/api/employers", payload);
      } else if (role === 'candidate') {
        res = await axiosInstance.post("/api/candidates", payload);
      } else {
        throw new Error("Invalid role provided");
      }
      console.log('response candidate signup: ', res.data);

      if (res.status === 201 && res?.data) {
        setUser(res.data);
        router.push("/dashboard/profile");
        showToast("success", "You registered successfully");
      } else {
        showToast("error", res.data?.message || "Registration failed");
      }

    } catch (error) {
      console.log(error);
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 400) {
          errorMessage = "Invalid registration data";
        } else if (error.response?.status === 409) {
          errorMessage = "Email already in use";
        } else if (error.response?.status && error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
        console.log("Axios error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
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
      const res = await axiosInstance.post(`/api/auth/login`, { email, password });
      console.log(res.data);
      // assuming backend returns { user: {...}, token: '...' }
      setUser(res.data.user);
      //localStorage.setItem("token", res.data.token); // optional

      router.push("/dashboard");
      showToast("success", "Logged in successfully");
    } catch (err) {
      console.error(err);
      let errorMessage = "Login failed";
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 400) {
          errorMessage = "Invalid credentials";
        } else if (err.response?.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (err.response?.status && err.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
        console.log("Axios error details:", {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers,
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
          router.push("/login");
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Custom hook with proper type checking
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};