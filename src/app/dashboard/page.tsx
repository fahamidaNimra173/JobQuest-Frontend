"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CandidateDashboard from "@/components/dashboard/CandidateDashboard";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
//import { User } from "lucide-react";

const Dashboard = () => {
  const { loading, user } = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  console.log('user from dashboard', user)

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
