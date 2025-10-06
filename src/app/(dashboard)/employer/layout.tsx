import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

interface EmployerLayoutProps {
  children: ReactNode;
}

export default function EmployerLayout({ children }: EmployerLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#111827]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
