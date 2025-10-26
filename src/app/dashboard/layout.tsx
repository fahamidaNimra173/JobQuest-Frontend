import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import "../dashboard.css";
import PrivateRoutes from "@/routes/PrivateRoutes";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoutes>
      <div className="min-h-screen dashboard-layout bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
            <div className="max-w-[1500px] min-h-screen mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              {children}
            </div>
          </main>
        </div>
      </div>
    </PrivateRoutes>
  );
}