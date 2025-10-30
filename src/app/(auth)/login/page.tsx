"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import { BsFillSendFill } from "react-icons/bs";
import HexaImage from "../../../../public/—Pngtree—simple white hexagon paper projection_4070498.png";
import ProtectLoginRoutes from "@/routes/ProtectLoginRoutes";

const LoginPage = () => {
  const { login, GoogleLogin } = useAuth();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    login(email, password);
  };

  return (
    <ProtectLoginRoutes>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#615bb8] via-[#7169d4] to-[#8279ff] mt-12">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 w-96 lg:w-[500px] lg:h-[500px] h-96 bg-[#8279ff] rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#877ff9] rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Pentagon background */}
        <div className="absolute opacity-90 -bottom-32 -right-50 h-[900px] w-[900px]">
          <Image
            src={HexaImage}
            alt="Hexagon paper background"
            fill
            className="object-cover rotate-12 animate-spin-slow"
            style={{ animationDuration: "60s" }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left side - Floating Quotes */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
            {/* Quote 1 - Top Left */}
            <h1 className="text-9xl font-sans font-bold text-center mb-2 text-white ">
              Welcome <span className="text-yellow-400">Back</span>
            </h1>
            <div
              className="absolute top-[10%] left-[15%] transform hover:scale-110 transition-all duration-500 hover:rotate-3 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Success is not final, failure is not fatal: it is the courage
                  to continue that counts.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">
                  — Winston Churchill
                </div>
              </div>
            </div>

            {/* Quote 2 - Top Right */}
            <div
              className="absolute top-[25%] right-[8%] transform hover:scale-110 transition-all duration-500 hover:-rotate-2 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  The only way to do great work is to love what you do.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">
                  — Steve Jobs
                </div>
              </div>
            </div>

            {/* Quote 3 - Bottom Left */}
            <div
              className="absolute bottom-[25%] left-[8%] transform hover:scale-110 transition-all duration-500 hover:rotate-2 animate-float"
              style={{ animationDelay: "3s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Your work is going to fill a large part of your life, and the
                  only way to be truly satisfied is to do what you believe is
                  great work.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">
                  — Steve Jobs
                </div>
              </div>
            </div>

            {/* Quote 4 - Bottom Right */}
            <div
              className="absolute bottom-[10%] right-[20%] transform hover:scale-110 transition-all duration-500 hover:-rotate-3 animate-float"
              style={{ animationDelay: "4.5s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Opportunities dont happen. You create them.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">
                  — Chris Grosser
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 flex  items-center justify-center p-3">
            <div className="w-full max-w-lg">
              {/* Glass morphism container */}
              <div className="relative backdrop-blur-2xl bg-white/60 border-1  border-[#403b8e] rounded-3xl shadow-white shadow-2xl sm:p-8 p-3 lg:p-10">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <h1 className="text-4xl flex items-center justify-center gap-3 font-bold font-sans text-center mb-2 text-[#554fa4] ">
                    <BsFillSendFill className="h-16 text-[#554fa4] w-12" />{" "}
                    JobQuest
                  </h1>
                  <p className="text-center text-[#554fa4] mb-8 font-bold font-mono">
                    Login to explore career opportunities.
                  </p>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2 ">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2 ">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          required
                          className="w-full px-4 py-3 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:border-[#403b7a] focus:bg-white/75 transition-all duration-300 font-medium"
                        />
                        {isShowPassword ? (
                          <FaEyeSlash
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-4 right-4 cursor-pointer text-white/70 hover:text-white transition-colors"
                            size={18}
                          />
                        ) : (
                          <FaEye
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-4 right-4 cursor-pointer text-white/70 hover:text-white transition-colors"
                            size={18}
                          />
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-[#8a82ff] py-3 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
                    >
                      Login
                    </button>
                  </form>

                  {/* Register Links */}
                  <div className="mt-6 space-y-2 text-center text-sm text-[#7670d6] font-medium">
                    <p>
                      Register as a Candidate?{" "}
                      <Link
                        href="/signup/candidate"
                        className="text-[#5248ea] hover:underline font-bold"
                      >
                        Signup Candidate
                      </Link>
                    </p>
                    <p>
                      Register as an Employer?{" "}
                      <Link
                        href="/signup/employer"
                        className="text-[#5248ea] hover:underline font-bold"
                      >
                        Signup Employer
                      </Link>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 border-t border-white/90"></div>
                    <span className="text-sm text-[#5248ea] font-medium">
                      OR
                    </span>
                    <div className="flex-1 border-t border-white/90"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => GoogleLogin()}
                    className="w-full font-semibold flex items-center justify-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm py-3 rounded-xl hover:bg-white/20 transition-all duration-300  text-[#554fa4] hover:scale-105 transform"
                  >
                    <svg
                      aria-label="Google logo"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div >

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(2deg);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes spin-slow {
            from {
              transform: rotate(12deg);
            }
            to {
              transform: rotate(372deg);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }
        `}</style>
      </div >
    </ProtectLoginRoutes >
  );
};

export default LoginPage;

