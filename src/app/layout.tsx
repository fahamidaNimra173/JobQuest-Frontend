import type { Metadata } from "next";
import {
  Major_Mono_Display,
  Sedan_SC,
  Junge,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import "./landing.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Provider from "../app/Provider/QueryProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutClientWrapper from "./component/shared/LayoutClientWrapper";
import { AuthProvider } from "@/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const sen = Sedan_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

const junge = Junge({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobQuest - Find Your Dream Job",
  description:
    "Discover thousands of job opportunities with JobQuest. Manage all your job search activities from one dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('jobquest-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <ToastProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthProvider>
          <body
            className={`${junge.variable} ${majorMono.variable} ${sen.variable} ${geistMono.variable} ${geistSans.variable} antialiased scroll-smooth`}
            suppressHydrationWarning={true}
          >
            <ThemeProvider
              defaultTheme="system"
              enableSystem={true}
              disableTransitionOnChange={false}
              storageKey="jobquest-theme"
            >
              <Script
                src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.1/dist/dotlottie-wc.js"
                strategy="beforeInteractive"
                type="module"
              />
              <Provider>
                <LayoutClientWrapper>
                  <div className="landing-layout min-h-screen">{children}</div>
                </LayoutClientWrapper>
              </Provider>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </body>
        </AuthProvider>
        </GoogleOAuthProvider>
      </ToastProvider>
    </html>
  );
}