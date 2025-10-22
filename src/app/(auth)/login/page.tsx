"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import loginImage from "../../../../public/signup-resgister.webp";

const LoginPage = () => {
  const { login } = useAuth();
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-primary-lightest transition-colors duration-300">
      {/* Left Section - Image / Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <Image
          src={loginImage}
          alt="Job Portal Illustration"
          width={420}
          height={420}
          className="object-contain"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-6 px-4 min-h-screen bg-white mt-12 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 border border-primary-light">
          <h1 className="text-3xl font-semibold text-center mb-4 text-primary-dark">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Login to Job Quest
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-primary-light rounded-lg bg-transparent focus:outline-none focus:border-primary-dark placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                {isShowPassword ? (
                  <FaEyeSlash
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
                    size={18}
                  />
                ) : (
                  <FaEye
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
                    size={18}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-medium transition duration-200 font-medium"
            >
              Login
            </button>
          </form>

          {/* Register Links */}
          <div className="mt-6 space-y-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Register as a Candidate?{" "}
              <Link
                href="/signup/candidate"
                className="text-primary-dark hover:underline font-medium"
              >
                Signup Candidate
              </Link>
            </p>
            <p>
              Register as an Employer?{" "}
              <Link
                href="/signup/employer"
                className="text-primary-dark hover:underline font-medium"
              >
                Signup Employer
              </Link>
            </p>
          </div>

          {/* Divider + Google Login (optional placeholder) */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-primary-light py-2 rounded-lg hover:bg-primary-light transition duration-200"
          >
            <svg
              aria-label="Google logo"
              width="22"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
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
            <span className="text-gray-700 dark:text-gray-200">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// "use client";
// // import GoogleLogin from "@/components/GoogleLogin";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "../../landing.css";
// import { useAuth } from "@/providers/AuthProvider";

// const LoginPage = () => {
//   const { login } = useAuth();
//   const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;

//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
//     const password = (form.elements.namedItem("password") as HTMLInputElement)
//       .value;

//     login(email, password);
//   };

//   return (
//     <section className="px-4  py-40">
//       <div className="max-w-lg mx-auto bg-primary-dark rounded-lg shadow-lg p-4">
//         {/* title */}
//         <h1 className="text-xl text-black font-bold mb-2">Welcome Back</h1>

//         {/* small description */}
//         <p className="text-black mb-4 font-medium text-sm">
//           Login on Job Quest
//         </p>

//         {/* register form */}
//         <form onSubmit={handleLogin} className="space-y-3">
//           <div>
//             <p className="text-xs text-black/60 font-semibold">Email</p>
//             <input
//               type="email"
//               name="email"
//               className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Password</p>
//             <div className="relative">
//               <input
//                 type={isShowPassword ? "text" : "password"}
//                 className="border bg-white/40 w-full mt-1 rounded text-black text-xs p-2"
//                 name="password"
//                 placeholder="Enter Your Password"
//                 required
//               />

//               {isShowPassword ? (
//                 <FaEyeSlash
//                   onClick={() => setIsShowPassword(!isShowPassword)}
//                   className="absolute top-3 right-3 cursor-pointer z-10 text-black"
//                   size={17}
//                 />
//               ) : (
//                 <FaEye
//                   onClick={() => setIsShowPassword(!isShowPassword)}
//                   className="absolute top-3 right-3 cursor-pointer z-10 text-black"
//                   size={17}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full rounded px-4 py-2 text-white bg-blue-600 text-sm cursor-pointer"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         <p className="my-2 text-center text-xs text-black/70 font-semibold">
//           Register as a Candidate? Please{" "}
//           <Link
//             href="/signup/candidate"
//             className="text-blue-700 hover:underline"
//           >
//             Signup Candidate
//           </Link>
//         </p>

//         <p className="my-2 text-center text-xs text-black/70 font-semibold">
//           Register as an Employer? Please{" "}
//           <Link
//             href="/signup/employer"
//             className="text-blue-700 hover:underline"
//           >
//             Signup Employer
//           </Link>
//         </p>

//         {/* divider */}
//         {/* <div className="flex items-center gap-2 my-6">
//           <div className="flex-1 border-t-2 border-black/60"></div>
//           <span className="text-black text-sm font-medium">OR</span>
//           <div className="flex-1 border-t-2 border-black/60"></div>
//         </div> */}

//         {/* google login */}
//         {/* <GoogleLogin from="login" /> */}
//       </div>
//     </section>
//   );
// };

// export default LoginPage;
