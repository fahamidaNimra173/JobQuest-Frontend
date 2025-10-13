"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function TestCookiePage() {
  const [cookieStatus, setCookieStatus] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  useEffect(() => {
    // Check if cookie exists
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    
    if (tokenCookie) {
      setCookieStatus(`Token cookie found: ${tokenCookie.substring(6, 20)}...`);
    } else {
      setCookieStatus("No token cookie found");
    }

    // Check user status
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.status === 200 && res.data.success) {
          setUserStatus(`User authenticated: ${res.data.user?.email || "Unknown"}`);
        } else {
          setUserStatus("User not authenticated");
        }
      } catch (error) {
        setUserStatus(`Error checking user: ${error}`);
      }
    };

    checkUser();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cookie Test</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Cookie Status:</h2>
        <p>{cookieStatus}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">User Status:</h2>
        <p>{userStatus}</p>
      </div>
      <div className="mt-8">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}