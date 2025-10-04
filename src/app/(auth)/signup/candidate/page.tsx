"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CandidateSignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <section className="px-4 py-10">
      <div className="max-w-lg mx-auto bg-blue-100 rounded-lg shadow-lg p-4">
        {/* title */}
        <h1 className="text-3xl text-black font-bold mb-2">
          Create an Candidate Account
        </h1>
        {/* small description */}
        <p className="text-black mb-4 font-medium">
          Join our team to get job opportunities
        </p>

        {/* register form */}
        <form className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold">Name</p>
            <input
              type="text"
              className="border focus:border-blue-200 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Email</p>
            <input
              type="email"
              className="border focus:border-blue-200 border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Password</p>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                className="border focus:border-blue-200 border-black w-full mt-1 rounded text-black text-xs p-2"
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

          <div>
            <p className="text-xs text-gray-500 font-semibold">
              Confirm Password
            </p>
            <div className="relative">
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                className="border focus:border-blue-200 border-black w-full mt-1 rounded text-black text-xs p-2"
                placeholder="Repeat The Password"
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

        {/* divider */}
        <div className="flex gap-1 items-center text-black text-sm my-6">
          <div className="h-0.5 flex-1 bg-black/60 rounded-full"></div>
          OR
          <div className="h-0.5 flex-1 bg-black/60 rounded-full"></div>
        </div>

        <GoogleLogin />
      </div>
    </section>
  );
};

export default CandidateSignUp;
