"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmployerSignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  // Regular expression for strong password
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const company_name = (
      form.elements.namedItem("company_name") as HTMLInputElement
    ).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm_password = (
      form.elements.namedItem("confirm_password") as HTMLInputElement
    ).value;

    const isValid = passwordPattern.test(password);

    if (!isValid) {
      return setIsPasswordValid(false);
    }

    setIsPasswordValid(true);

    if (password !== confirm_password) {
      return setIsPasswordMatch(false);
    }

    setIsPasswordMatch(true);

    // create user in db
    const res = await axios.post(
      "https://job-portal-backend-xshy.onrender.com/users",
      { name, company_name, email, password, role: "employer" }
    );
    console.log(res.data);
  };

  return (
    <section className="px-4 py-10">
      <div className="max-w-lg mx-auto bg-blue-200 rounded-lg shadow-lg p-4">
        {/* title */}
        <h1 className="text-xl text-black font-bold mb-2">
          Create an Employer Account
        </h1>

        {/* small description */}
        <p className="text-black mb-4 font-medium text-sm">
          Join our team to post job openings and hire talents
        </p>

        {/* register form */}
        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold">Name</p>
            <input
              type="text"
              name="name"
              className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Company Name</p>
            <input
              type="text"
              name="company_name"
              className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Company Name"
              required
            />
          </div>

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
                className={`border bg-white/40 w-full mt-1 rounded text-black text-xs p-2 ${
                  !isPasswordValid ? "border-red-500" : "border-black"
                }`}
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

              {!isPasswordValid && (
                <p className="text-red-500 text-xs mt-1">
                  Must be at least 8 characters and include:
                  <br />• One number
                  <br />• One lowercase letter
                  <br />• One uppercase letter
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">
              Confirm Password
            </p>
            <div className="relative">
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                className="border bg-white/40 border-black w-full mt-1 rounded text-black text-xs p-2"
                placeholder="Enter The Password Again"
                name="confirm_password"
                required
              />

              {isShowConfirmPassword ? (
                <FaEyeSlash
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer z-10 text-black"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer z-10 text-black"
                  size={17}
                />
              )}

              {!isPasswordMatch && (
                <p className="text-red-500 text-xs mt-1">
                  Password doesn&apos;t match
                </p>
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
          Already Have an Account? Please{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Login
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

export default EmployerSignUp;