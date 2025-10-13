'use client'



import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";



// Define TypeScript type for subscription data
interface SubscriptionData {
  email: string;
  userName: string;
  subscribedAt?: string | Date;
  // createdAt?: string | Date;
  // updatedAt?: string | Date;

}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Career Advice", href: "/advice" },
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Community", href: "/community" },
  ];

  const resources = [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const handleSubs = async () => {
    try {
      const subscriptionData: SubscriptionData = {
        email: "default@example.com",
        userName: "Default User",
        subscribedAt: new Date().toISOString(),
      };

      console.log("Sending data:", subscriptionData);
      const response = await axiosInstance.post("/subscribe", subscriptionData);
      console.log("Subscribed successfully:", response.data);
      toast.success("Subscribed successfully!");
    } catch (error: unknown) {
      console.error("Subscription failed:", error);

      // Type guard for axios error
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown; status?: number } };
        console.log("Full error response:", axiosError.response);
        console.log("Error data:", axiosError.response?.data);
        console.log("Error status:", axiosError.response?.status);
      }

      toast.error("Subscription failed. Try again!");
    }
  };

  return (
    <footer className="bg-[#7670d6] text-white z-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-white/80 text-sm mb-4">
              Your trusted platform for career growth and job opportunities. Connect with top
              employers and advance your career.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to our newsletter for the latest job postings and career tips.
            </p>
            <button
              onClick={handleSubs}
              className="inline-flex items-center space-x-2 bg-white text-[#7670d6] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail size={20} />
              <span>Subscribe</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              © {currentYear} Your Company. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}













// 'use client'

// import Link from 'next/link';
// import Image from 'next/image';
// import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { name: 'About Us', href: '/about' },
//     { name: 'Career Advice', href: '/advice' },
//     { name: 'Browse Jobs', href: '/jobs' },
//     { name: 'Community', href: '/community' },
//   ];

//   const resources = [
//     { name: 'Help Center', href: '/help' },
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/terms' },
//     { name: 'Contact Us', href: '/contact' },
//   ];

//   const socialLinks = [
//     { icon: Facebook, href: '#', label: 'Facebook' },
//     { icon: Twitter, href: '#', label: 'Twitter' },
//     { icon: Linkedin, href: '#', label: 'LinkedIn' },
//     { icon: Instagram, href: '#', label: 'Instagram' },
//   ];

//   return (
//     <footer className="bg-[#7670d6] text-white z-10 mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Logo and Description */}
//           <div className="lg:col-span-1">
//             <Link href="/" className="inline-block mb-4">
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={120}
//                 height={40}
//                 className="object-contain"
//               />
//             </Link>
//             <p className="text-white/80 text-sm mb-4">
//               Your trusted platform for career growth and job opportunities. Connect with top employers and advance your career.
//             </p>
//             <div className="flex space-x-4">
//               {socialLinks.map((social) => {
//                 const Icon = social.icon;
//                 return (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     aria-label={social.label}
//                     className="text-white/80 hover:text-white transition-colors"
//                   >
//                     <Icon size={20} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-white/80 hover:text-white transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Resources</h3>
//             <ul className="space-y-2">
//               {resources.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-white/80 hover:text-white transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
//             <p className="text-white/80 text-sm mb-4">
//               Subscribe to our newsletter for the latest job postings and career tips.
//             </p>
//             <Link
//               href="/newsletter"
//               className="inline-flex items-center space-x-2 bg-white text-[#7670d6] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <Mail size={20} />
//               <span>Subscribe</span>
//             </Link>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/20 mt-8 pt-8 text-center md:text-left">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-white/80 text-sm">
//               © {currentYear} Your Company. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <Link href="/privacy" className="text-white/80 hover:text-white text-sm transition-colors">
//                 Privacy
//               </Link>
//               <Link href="/terms" className="text-white/80 hover:text-white text-sm transition-colors">
//                 Terms
//               </Link>
//               <Link href="/cookies" className="text-white/80 hover:text-white text-sm transition-colors">
//                 Cookies
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }