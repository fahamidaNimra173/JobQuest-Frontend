"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  PlusSquare,
  User,
} from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();

  const links: SidebarLink[] = [
    { name: "Dashboard", href: "/employer", icon: <Briefcase size={20} /> },
    { name: "My Jobs", href: "/employer/my-jobs", icon: <ClipboardList size={20} /> },
    { name: "Post New Job", href: "/employer/jobs/new", icon: <PlusSquare size={20} /> },
    { name: "Profile", href: "/employer/profile", icon: <User size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Employer Panel
      </div>

      <nav className="flex flex-col mt-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive
                  ? "bg-primary-dark dark:bg-primary-medium border-r-4 border-white text-white"
                  : "hover:bg-primary-dark dark:hover:bg-primary-medium text-white"
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
