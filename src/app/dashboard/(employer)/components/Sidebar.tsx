"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  PlusSquare,
  User,
  Users,
} from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();

  const links: SidebarLink[] = [
    { name: "Dashboard", href: "/dashboard", icon: <Briefcase size={20} /> },
    { name: "My Jobs", href: "/dashboard/my-jobs", icon: <ClipboardList size={20} /> },
    { name: "Post New Job", href: "/dashboard/post-job", icon: <PlusSquare size={20} /> },
    //{ name: "Applicants", href: "/dashboard/applicants", icon: <Users size={20} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/dashboard" className="text-2xl font-bold text-primary-dark dark:text-primary-medium transition-colors duration-200">
          JobQuest
        </Link>
      </div>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                ? 'bg-primary-dark dark:bg-primary-medium text-gray-600 dark:text-gray-300 border-r-4 border-white'
                : 'text-gray-600 hover:bg-primary-dark hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
