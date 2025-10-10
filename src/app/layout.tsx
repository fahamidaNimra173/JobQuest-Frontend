import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/providers/AuthProvider";
=======
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/theme-provider';
>>>>>>> 09a0f74469c7489d1e25af5f272102edf5d4ce33

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Job Quest",
  description: "Job Quest is a job portal.",
=======
  title: "JobQuest - Find Your Dream Job",
  description: "Discover thousands of job opportunities with JobQuest. Manage all your job search activities from one dashboard.",
>>>>>>> 09a0f74469c7489d1e25af5f272102edf5d4ce33
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <ToastContainer></ToastContainer>
        </body>
      </AuthProvider>
=======
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('jobquest-theme');
                  var root = document.documentElement;
                  if (theme === 'dark') {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  }
                } catch (e) {
                  // Fallback to light mode if localStorage is not available
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="jobquest-theme"
        >
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
>>>>>>> 09a0f74469c7489d1e25af5f272102edf5d4ce33
    </html>
  );
}