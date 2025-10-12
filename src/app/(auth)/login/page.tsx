"use client";
// import GoogleLogin from "@/components/GoogleLogin";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../landing.css";
import { useAuth } from "@/providers/AuthProvider";

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
    <section className="px-4  py-40">
      <div className="max-w-lg mx-auto bg-primary-dark rounded-lg shadow-lg p-4">
        {/* title */}
        <h1 className="text-xl text-black font-bold mb-2">Welcome Back</h1>

        {/* small description */}
        <p className="text-black mb-4 font-medium text-sm">
          Login on Job Quest
        </p>

        {/* register form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <p className="text-xs text-black/60 font-semibold">Email</p>
            <input
              type="email"
              name="email"
              className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">Password</p>
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
              Login
            </button>
          </div>
        </form>

        <p className="my-2 text-center text-xs text-black/70 font-semibold">
          Register as a Candidate? Please{" "}
          <Link
            href="/signup/candidate"
            className="text-blue-700 hover:underline"
          >
            Signup Candidate
          </Link>
        </p>

        <p className="my-2 text-center text-xs text-black/70 font-semibold">
          Register as an Employer? Please{" "}
          <Link
            href="/signup/employer"
            className="text-blue-700 hover:underline"
          >
            Signup Employer
          </Link>
        </p>

        {/* divider */}
        {/* <div className="flex items-center gap-2 my-6">
          <div className="flex-1 border-t-2 border-black/60"></div>
          <span className="text-black text-sm font-medium">OR</span>
          <div className="flex-1 border-t-2 border-black/60"></div>
        </div> */}

        {/* google login */}
        {/* <GoogleLogin from="login" /> */}
      </div>
    </section>
  );
};

export default LoginPage;