"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await axios.post(
        "https://job-portal-backend-xshy.onrender.com/users",
        { email, password }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="max-w-lg mx-auto bg-blue-200 rounded-lg shadow-lg p-4">
        {/* title */}
        <h1 className="text-xl text-black font-bold mb-2">Welcome Back</h1>

        {/* small description */}
        <p className="text-black mb-4 font-medium text-sm">
          Login on Job Quest
        </p>

        {/* register form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold">Email</p>
            <input
              type="email"
              name="email"
              className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Password</p>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                className="border bg-white/40 w-full mt-1 rounded text-black text-xs p-2"
                name="password"
                placeholder="Enter Your Password"
                required
              />

              {isShowPassword ? (
                <FaEyeSlash
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer z-10 text-black"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer z-10 text-black"
                  size={17}
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded px-4 py-2 text-white bg-blue-600 text-sm cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>

        <p className="my-2 text-center text-xs text-black">
          Register as an Candidate? Please{" "}
          <Link
            href="/signup/candidate"
            className="font-semibold text-blue-500 hover:underline"
          >
            Signup Candidate
          </Link>
        </p>

        <p className="my-2 text-center text-xs text-black">
          Register as an Employer? Please{" "}
          <Link
            href="/signup/employer"
            className="font-semibold text-blue-500 hover:underline"
          >
            Signup Employer
          </Link>
        </p>

        {/* divider */}
        <div className="flex gap-1 items-center text-black text-sm my-6">
          <div className="h-0.5 flex-1 bg-black/60 rounded-full"></div>
          OR
          <div className="h-0.5 flex-1 bg-black/60 rounded-full"></div>
        </div>

        {/* google login */}
        {/* <GoogleLogin /> */}
      </div>
    </section>
  );
};

export default LoginPage;
