"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Heart,
  Lock,
  LogOut,
  Menu,
  X,
  Briefcase,
  BarChart3,
  Users,
  MessageSquare,
  ClipboardList,
  LucideIcon,
  Loader,
  FileText,
  CreditCard,
} from "lucide-react";
import clsx from "clsx";
// import { useToast } from "@/components/ui/Toast";
// import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

// Define navigation based on user role
type UserRole = "admin" | "candidate" | "employer";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const getNavigationByRole = (role: UserRole): NavigationItem[] => {
  switch (role) {
    case "admin":
      return [
        { name: "Dashboard", href: "/dashboard", icon: Briefcase },
        { name: "Statistics", href: "/dashboard/statistics", icon: BarChart3 },
        { name: "Job Posts", href: "/dashboard/job-posts", icon: Briefcase },
        // {
        //   name: "Job Applies",
        //   href: "/dashboard/job-applies",
        //   icon: ClipboardList,
        // },
        { name: "Manage Users", href: "/dashboard/manage-users", icon: Users },
        {
          name: "Manage Reviews",
          href: "/dashboard/manage-reviews",
          icon: MessageSquare,
        },
        {
          name: "Manage Community Posts",
          href: "/dashboard/manage-community-posts",
          icon: MessageSquare,
        },
        { name: "My Profile", href: "/dashboard/admin-profile", icon: User },
        {
          name: "Subcription Plans",
          href: "/dashboard/subcription-plans",
          icon: CreditCard,
        },
        {
          name: "Change Password",
          href: "/dashboard/change-password",
          icon: Lock,
        },
      ];

    case "employer":
      return [
        { name: "Dashboard", href: "/dashboard", icon: Briefcase },
        { name: "Post Jobs", href: "/dashboard/post-job", icon: Briefcase },
        { name: "My Jobs", href: "/dashboard/my-jobs", icon: ClipboardList },
        { name: "My Profile", href: "/dashboard/employer-profile", icon: User },
        {
          name: "Change Password",
          href: "/dashboard/change-password",
          icon: Lock,
        },
      ];

    case "candidate":
    default:
      return [
        { name: "Dashboard", href: "/dashboard", icon: Briefcase },
        {
          name: "My Profile",
          href: "/dashboard/candidate-profile",
          icon: User,
        },
        {
          name: "Jobs Applied",
          href: "/dashboard/jobs-applied",
          icon: Briefcase,
        },
        { name: "Saved Jobs", href: "/dashboard/saved-jobs", icon: Heart },
        { name: 'My Resume', href: '/dashboard/resume', icon: FileText },
        {
          name: "Change Password",
          href: "/dashboard/change-password",
          icon: Lock,
        },
      ];
  }
};

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [userRole, setUserRole] = useState<UserRole>("Candidate"); // For demo purposes
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  // const { showToast } = useToast();

  // Demo function to switch roles - in real app this would come from auth context
  // const switchRole = () => {
  //   const roles: UserRole[] = ["Candidate", "Employer", "Admin"];
  //   const currentIndex = roles.indexOf(userRole);
  //   const nextRole = roles[(currentIndex + 1) % roles.length];
  //   setUserRole(nextRole);
  //   showToast("info", "Role Changed", `Switched to ${nextRole} view`);
  // };

  const handleLogout = () => {
    logout();
  };

  if (loading) return;

  const navigation = getNavigationByRole(user?.role);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-68 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-all duration-200 ease-in-out lg:translate-x-0 overflow-y-auto hide-scrollbar",
          {
            "translate-x-0": isMobileMenuOpen,
            "-translate-x-full": !isMobileMenuOpen,
          }
        )}
      >
        {/* Added overflow-y-auto to make sidebar scrollable */}
        <div className="flex flex-col min-h-screen">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex justify-center w-full">
              <Image
                src="/logo1.png"
                height={80}
                width={120}
                alt="job quest logo"
              />
            </Link>
            {/* Theme toggle in sidebar for mobile */}
            {/* <div className="lg:hidden">
              <ThemeToggle className="" showTooltip={false} />
            </div> */}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    {
                      "bg-primary-dark dark:bg-primary-medium text-white border-r-4 border-white":
                        isActive,
                    },
                    !isActive &&
                      "text-gray-600 hover:bg-primary-dark hover:text-white",
                    !isActive &&
                      "dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info Section */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {/* User Photo */}
              <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                {user?.profile || <User className="w-6 h-6 text-white" />}
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {`${user?.firstName} ${user?.lastName}`}
                </p>
                <p className="text-xs capitalize text-primary-dark dark:text-primary-medium font-medium">
                  {user?.role}
                </p>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 truncate"
                  title={user?.email}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Demo Role Switcher - Remove in production */}
            {/* <button
              onClick={switchRole}
              className="w-full mt-2 px-3 py-2 text-xs bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
            >
              Switch Role (Demo)
            </button> */}
          </div>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
