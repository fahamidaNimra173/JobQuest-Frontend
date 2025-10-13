"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import CandidateDashboard from "@/components/dashboard/CandidateDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/providers/AuthProvider";

const Dashboard = () => {
  const { loading, user } = useAuth();
  const router = useRouter();

  if (user?.role === "admin") {
    return <AdminDashboard />;
  } else if (user?.role === "candidate") {
    return <CandidateDashboard />;
  } else if (user?.role === "employer") {
    return <EmployerDashboard />;
  } else {
    return router.push("/forbidden");
  }
};

export default Dashboard;
