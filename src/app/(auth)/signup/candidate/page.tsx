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
import HexaImage from '../../../../../public/—Pngtree—simple white hexagon paper projection_4070498.png'
import ProtectLoginRoutes from "@/routes/ProtectLoginRoutes";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const CandidateSignUp = () => {
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
    const role = 'candidate';
    register(firstName, lastName, phone, email, password, role);
  };

  return (
    <ProtectLoginRoutes>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#615bb8] via-[#7169d4] to-[#8279ff] mt-12">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 w-96 lg:w-[500px] lg:h-[500px] h-96 bg-[#8279ff] rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#877ff9] rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Pentagon background */}
        <div className="absolute opacity-90 -bottom-32 -right-50 h-[900px] w-[900px]">
          <Image
            src={HexaImage}
            alt="Hexagon paper background"
            fill
            className="object-cover rotate-12 animate-spin-slow"
            style={{ animationDuration: '60s' }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen">

          {/* Left side - Floating Quotes */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
            {/* Main Title */}
            <h1 className="text-9xl font-sans font-bold text-center mb-2 text-white ">
              Begin Your <span className="text-yellow-400">Success</span>
            </h1>

            {/* Quote 1 - Top Left */}
            <div
              className="absolute top-[10%] left-[15%] transform hover:scale-110 transition-all duration-500 hover:rotate-3 animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Every expert was once a beginner. Take the first step today and unlock endless possibilities.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">— Career Growth</div>
              </div>
            </div>

            {/* Quote 2 - Top Right */}
            <div
              className="absolute top-[25%] right-[8%] transform hover:scale-110 transition-all duration-500 hover:-rotate-2 animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Building your profile is building your future. Start crafting the career story you want to tell.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">— Professional Journey</div>
              </div>
            </div>

            {/* Quote 3 - Bottom Left */}
            <div
              className="absolute bottom-[25%] left-[8%] transform hover:scale-110 transition-all duration-500 hover:rotate-2 animate-float"
              style={{ animationDelay: '3s' }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Join thousands of candidates who found their dream roles. Your next opportunity awaits you here.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">— Community Success</div>
              </div>
            </div>

            {/* Quote 4 - Bottom Right */}
            <div
              className="absolute bottom-[10%] right-[20%] transform hover:scale-110 transition-all duration-500 hover:-rotate-3 animate-float"
              style={{ animationDelay: '4.5s' }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="text-white/90 text-sm italic leading-relaxed">
                  Your talent deserves recognition. Register now and connect with employers looking for someone like you.
                </div>
                <div className="text-white/70 text-xs mt-3 font-medium">— Opportunity Awaits</div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 py-6">
            <div className="w-full max-w-lg">
              {/* Glass morphism container */}
              <div className="relative backdrop-blur-2xl bg-white/60 border-1 border-[#403b8e] rounded-3xl shadow-white shadow-2xl sm:p-8 p-3 lg:p-10">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <h1 className="text-4xl flex items-center justify-center gap-3 font-bold font-sans text-center mb-2 text-[#554fa4]">
                    <BsFillSendFill className="h-16 text-[#554fa4] w-12" /> JobQuest
                  </h1>
                  <p className="text-center text-[#554fa4] mb-8 font-bold font-mono">
                    Create your candidate account
                  </p>

                  {/* Signup Form */}
                  <form onSubmit={handleRegister} className="space-y-5">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        required
                        className="w-full px-4 py-3 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                        className="w-full px-4 py-3 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
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

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
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
                          padding: "0.75rem 1rem",
                          fontSize: "0.95rem",
                          fontWeight: "500"
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
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          required
                          className={`w-full px-4 py-3 border rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:bg-white/75 transition-all duration-300 font-medium ${isPasswordValid
                              ? "border-[#7670d6] focus:border-[#5f59b4]"
                              : "border-red-500"
                            }`}
                        />
                        {isShowPassword ? (
                          <FaEyeSlash
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-4 right-4 cursor-pointer text-black hover:text-black/70 transition-colors"
                            size={18}
                          />
                        ) : (
                          <FaEye
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute top-4 right-4 cursor-pointer text-black hover:text-black/70 transition-colors"
                            size={18}
                          />
                        )}
                      </div>
                      {!isPasswordValid && (
                        <p className="text-red-600 text-xs mt-1 font-semibold">
                          Password must have at least 8 characters including:
                          <br />• One number, one lowercase, and one uppercase letter.
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-[#554fa4] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={isShowConfirmPassword ? "text" : "password"}
                          name="confirm_password"
                          placeholder="Re-enter your password"
                          required
                          className="w-full px-4 py-3 border border-[#7670d6] rounded-xl bg-white/70 backdrop-blur-sm text-[#7670d6] placeholder:text-[#7670d6] focus:outline-none focus:border-[#5f59b4] focus:bg-white/75 transition-all duration-300 font-medium"
                        />
                        {isShowConfirmPassword ? (
                          <FaEyeSlash
                            onClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            className="absolute top-4 right-4 cursor-pointer text-black hover:text-white transition-colors"
                            size={18}
                          />
                        ) : (
                          <FaEye
                            onClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            className="absolute top-4 right-4 cursor-pointer text-black hover:text-white transition-colors"
                            size={18}
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
                      className="w-full bg-yellow-400 text-[#8a82ff] py-3 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Register
                    </button>
                  </form>

                  {/* Already have account */}
                  <p className="mt-5 text-center text-sm text-[#7670d6] font-medium">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#5248ea] hover:underline font-bold"
                    >
                      Login
                    </Link>
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 border-t border-white/90"></div>
                    <span className="text-sm text-[#5248ea] font-medium">OR</span>
                    <div className="flex-1 border-t border-white/90"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setRoleForGoogleSignUp('candidate'); GoogleSignUp(); }}
                    className="w-full font-semibold flex items-center justify-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm py-3 rounded-xl hover:bg-white/20 transition-all duration-300 text-[#554fa4] hover:scale-105 transform"
                  >
                    <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes float {
          0%, 100% {
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
      </div>
    </ProtectLoginRoutes>
  );
};

export default CandidateSignUp;



// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import { PhoneNumberUtil } from "google-libphonenumber";
// import { useAuth } from "@/providers/AuthProvider";
// import Image from "next/image";
// import singnupImage from '../../../../../public/signup-resgister.webp'

// const phoneUtil = PhoneNumberUtil.getInstance();

// const isPhoneValid = (phone: string) => {
//   try {
//     return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//   } catch (error) {
//     return false;
//   }
// };

// const CandidateSignUp = () => {
//   const { register } = useAuth();
//   const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
//   const [isShowConfirmPassword, setIsShowConfirmPassword] =
//     useState<boolean>(false);
//   const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
//   const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
//   const [phone, setPhone] = useState<string>("");

//   const isNumberValid = isPhoneValid(phone);
//   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;
//     const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
//       .value;
//     const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
//       .value;
//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
//     const password = (form.elements.namedItem("password") as HTMLInputElement)
//       .value;
//     const confirm_password = (
//       form.elements.namedItem("confirm_password") as HTMLInputElement
//     ).value;

//     const isPasswordValid = passwordPattern.test(password);
//     if (!isPasswordValid) return setIsPasswordValid(false);
//     setIsPasswordValid(true);

//     if (password !== confirm_password) return setIsPasswordMatch(false);
//     setIsPasswordMatch(true);
//     const role = 'candidate';
//     register(firstName, lastName, phone, email, password, role);
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-primary-lightest transition-colors duration-300">
//       {/* Left side illustration */}
//       <div className="hidden md:flex md:w-1/2 items-center justify-center">
//         <Image
//           src={singnupImage}
//           alt="Candidate Signup Illustration"
//           width={450}
//           height={450}
//           className="object-contain"
//         />
//       </div>

//       {/* Right side form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center py-6 px-4 min-h-screen bg-white mt-12 dark:bg-gray-800">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full p-8">
//           <h1 className="text-3xl font-semibold text-center mb-4 text-primary-dark">
//             Create a Candidate Account
//           </h1>
//           <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
//             Join Job Quest to explore new opportunities
//           </p>

//           <form onSubmit={handleRegister} className="space-y-5">
//             {/* First Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="Enter your first name"
//                 required
//                 className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
//               />
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Enter your last name"
//                 required
//                 className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 required
//                 className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Phone Number
//               </label>
//               <PhoneInput
//                 defaultCountry="bd"
//                 value={phone}
//                 onChange={(phone) => setPhone(phone)}
//                 inputStyle={{
//                   width: "100%",
//                   backgroundColor: "transparent",
//                   color: "inherit",
//                   border: "1px solid var(--primary-light)",
//                   borderRadius: "8px",
//                   padding: "0.5rem",
//                 }}
//                 required
//               />
//               {!isNumberValid && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Please enter a valid phone number.
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={isShowPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter your password"
//                   required
//                   className={`w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none ${isPasswordValid
//                     ? "border-primary-light focus:border-primary-dark"
//                     : "border-red-500"
//                     } placeholder:text-gray-500 dark:placeholder:text-gray-400`}
//                 />
//                 {isShowPassword ? (
//                   <FaEyeSlash
//                     onClick={() => setIsShowPassword(!isShowPassword)}
//                     className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
//                     size={18}
//                   />
//                 ) : (
//                   <FaEye
//                     onClick={() => setIsShowPassword(!isShowPassword)}
//                     className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
//                     size={18}
//                   />
//                 )}
//               </div>
//               {!isPasswordValid && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Password must have at least 8 characters including:
//                   <br />• One number, one lowercase, and one uppercase letter.
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={isShowConfirmPassword ? "text" : "password"}
//                   name="confirm_password"
//                   placeholder="Re-enter your password"
//                   required
//                   className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
//                 />
//                 {isShowConfirmPassword ? (
//                   <FaEyeSlash
//                     onClick={() =>
//                       setIsShowConfirmPassword(!isShowConfirmPassword)
//                     }
//                     className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
//                     size={18}
//                   />
//                 ) : (
//                   <FaEye
//                     onClick={() =>
//                       setIsShowConfirmPassword(!isShowConfirmPassword)
//                     }
//                     className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
//                     size={18}
//                   />
//                 )}
//               </div>
//               {!isPasswordMatch && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Passwords do not match.
//                 </p>
//               )}
//             </div>

//             {/* Register Button */}
//             <button
//               type="submit"
//               disabled={!isNumberValid}
//               className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-medium transition duration-200 font-medium disabled:bg-gray-300 disabled:text-gray-600"
//             >
//               Register
//             </button>
//           </form>

//           {/* Already have account */}
//           <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-primary-dark hover:underline font-medium"
//             >
//               Login
//             </Link>
//           </p>

//           {/* Divider + Google Signup */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
//             <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
//           </div>

//           <button
//             type="button"
//             className="w-full flex items-center justify-center gap-3 border border-primary-light py-2 rounded-lg hover:bg-primary-light transition duration-200"
//           >
//             <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
//             <span className="text-gray-700 dark:text-gray-200">
//               Continue with Google
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateSignUp;




