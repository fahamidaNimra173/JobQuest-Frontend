"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import { BsFillSendFill } from "react-icons/bs";
import { HiOfficeBuilding, HiUsers, HiTrendingUp } from "react-icons/hi";
import HexaImage from "../../../../../public/—Pngtree—simple white hexagon paper projection_4070498.png";
import ProtectLoginRoutes from "@/routes/ProtectLoginRoutes";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const EmployerSignUp = () => {
  const { register, GoogleSignUp, setRoleForGoogleSignUp } = useAuth();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>("");
  const isNumberValid = isPhoneValid(phone);

  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const companyName = (
      form.elements.namedItem("companyName") as HTMLInputElement
    ).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm_password = (
      form.elements.namedItem("confirm_password") as HTMLInputElement
    ).value;

    const isPasswordValid = passwordPattern.test(password);

    if (!isPasswordValid) return setIsPasswordValid(false);
    setIsPasswordValid(true);

    if (password !== confirm_password) return setIsPasswordMatch(false);
    setIsPasswordMatch(true);

    register(
      firstName,
      lastName,
      phone,
      email,
      password,
      "employer",
      companyName
    );
  };

  return (
    <ProtectLoginRoutes>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#615bb8] via-[#7169d4] to-[#8279ff] mt-12">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 right-10 w-96 lg:w-[500px] lg:h-[500px] h-96 bg-[#8279ff] rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#877ff9] rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Pentagon background - opposite side */}
        <div className="absolute opacity-90 -bottom-32 -left-50 h-[900px] w-[900px]">
          <Image
            src={HexaImage}
            alt="Hexagon paper background"
            fill
            className="object-cover -rotate-12 animate-spin-slow"
            style={{ animationDuration: "60s" }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left side - Signup Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 py-6 order-2 lg:order-1">
            <div className="w-full lg:mx-10">
              {/* Glass morphism container */}
              <div className="relative backdrop-blur-2xl bg-white/60 border-1 border-[#403b8e] rounded-3xl shadow-white shadow-2xl sm:p-8 p-3 lg:p-10">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <h1 className="text-4xl flex items-center justify-center gap-3 font-bold font-sans text-center mb-2 text-[#554fa4]">
                    <BsFillSendFill className="h-16 text-[#554fa4] w-12" />{" "}
                    JobQuest
                  </h1>
                  <p className="text-center text-[#554fa4] mb-6 font-bold font-mono text-sm">
                    Employer Registration Portal
                  </p>

                  {/* Signup Form */}
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* First Name & Last Name - Side by side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          required
                          className="w-full px-3 py-2.5 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          required
                          className="w-full px-3 py-2.5 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium text-sm"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        placeholder="Enter your company name"
                        required
                        className="w-full px-3 py-2.5 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2.5 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                        Phone Number
                      </label>
                      <PhoneInput
                        defaultCountry="bd"
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputStyle={{
                          width: "100%",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          color: "#7670d6",
                          border: "1px solid #7670d6",
                          borderRadius: "12px",
                          padding: "0.625rem 1rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                        required
                      />
                      {!isNumberValid && phone && (
                        <p className="text-red-600 text-xs mt-1 font-semibold">
                          Please enter a valid phone number.
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          required
                          className={`w-full px-3 py-2.5 border rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:bg-white/75 transition-all duration-300 font-medium text-sm ${
                            isPasswordValid
                              ? "border-[#7670d6] focus:border-[#5f59b4]"
                              : "border-red-500"
                          }`}
                        />
                        {isShowPassword ? (
                          <FaEyeSlash
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-3 right-3 cursor-pointer text-text-black hover:text-black transition-colors"
                            size={17}
                          />
                        ) : (
                          <FaEye
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-3 right-3 cursor-pointer text-black hover:text-black transition-colors"
                            size={17}
                          />
                        )}
                      </div>
                      {!isPasswordValid && (
                        <p className="text-red-600 text-xs mt-1 font-semibold">
                          Password must have at least 8 characters including:
                          <br />• One number, one lowercase, and one uppercase
                          letter.
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-semibold text-[#554fa4] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={isShowConfirmPassword ? "text" : "password"}
                          name="confirm_password"
                          placeholder="Re-enter your password"
                          required
                          className="w-full px-3 py-2.5 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6]/60 focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium text-sm"
                        />
                        {isShowConfirmPassword ? (
                          <FaEyeSlash
                            onClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            className="absolute top-3 right-3 cursor-pointer text-black hover:text-black transition-colors"
                            size={17}
                          />
                        ) : (
                          <FaEye
                            onClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            className="absolute top-3 right-3 cursor-pointer text-black hover:text-black transition-colors"
                            size={17}
                          />
                        )}
                      </div>
                      {!isPasswordMatch && (
                        <p className="text-red-600 text-xs mt-1 font-semibold">
                          Passwords do not match.
                        </p>
                      )}
                    </div>

                    {/* Register Button */}
                    <button
                      type="submit"
                      disabled={!isNumberValid}
                      className="w-full bg-yellow-400 text-[#8a82ff] py-3 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                    >
                      Create Account
                    </button>
                  </form>

                  {/* Already have account */}
                  <p className="mt-4 text-center text-sm text-[#7670d6] font-medium">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#5248ea] hover:underline font-bold"
                    >
                      Login
                    </Link>
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 border-t border-white/90"></div>
                    <span className="text-xs text-[#5248ea] font-medium">
                      OR
                    </span>
                    <div className="flex-1 border-t border-white/90"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setRoleForGoogleSignUp("employer"); GoogleSignUp(); }}
                    className="w-full font-semibold flex items-center justify-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 text-[#554fa4] hover:scale-105 transform text-sm"
                  >
                    <svg
                      aria-label="Google logo"
                      width="18"
                      height="18"
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

          {/* Right side - Feature Cards */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative order-1 lg:order-2">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-8xl font-sans font-bold text-white mb-4">
                Hire Top <span className="text-yellow-400">Talent</span>
              </h1>
              <p className="text-white/80 text-xl font-medium">
                Join leading companies finding exceptional candidates
              </p>
            </div>

            {/* Feature Card 1 */}
            <div
              className="absolute top-[15%] left-[10%] transform hover:scale-110 transition-all duration-500 hover:rotate-2 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl w-72">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-400 p-3 rounded-xl">
                    <HiOfficeBuilding className="text-[#554fa4] w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg">Post Jobs</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Create detailed job listings and reach thousands of qualified
                  candidates actively seeking opportunities.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div
              className="absolute top-[45%] right-[8%] transform hover:scale-110 transition-all duration-500 hover:-rotate-2 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl w-72">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-400 p-3 rounded-xl">
                    <HiUsers className="text-[#554fa4] w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    Manage Applicants
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Streamline your hiring process with powerful tools to review,
                  filter, and connect with top talent.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div
              className="absolute bottom-[12%] left-[15%] transform hover:scale-110 transition-all duration-500 hover:rotate-1 animate-float"
              style={{ animationDelay: "4s" }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl w-72">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-400 p-3 rounded-xl">
                    <HiTrendingUp className="text-[#554fa4] w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    Grow Your Team
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Build your dream team with access to diverse talent pools and
                  advanced matching algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>

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
              transform: rotate(-12deg);
            }
            to {
              transform: rotate(348deg);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }
        `}</style>
      </div>
    </ProtectLoginRoutes>
  );
};

export default EmployerSignUp;