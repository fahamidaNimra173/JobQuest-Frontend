"use client";
import GoogleLogin from "@/components/GoogleLogin";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
const CandidateSignUp = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>("");
  const isNumberValid = isPhoneValid(phone);

  // Regular expression for strong password
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

    if (!isPasswordValid) {
      return setIsPasswordValid(false);
    }

    setIsPasswordValid(true);

    if (password !== confirm_password) {
      return setIsPasswordMatch(false);
    }

    setIsPasswordMatch(true);

    // create user in db
    try {
      const res = await axios.post(
        "https://job-portal-backend-xshy.onrender.com/api/candidates",
        {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          password,
          role: "candidate",
          provider: "Email/Password",
        }
      );

      localStorage.setItem("authToken", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data);
      router.push("/dashboard/profile");
      toast.success("You registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="max-w-lg mx-auto bg-primary-dark rounded-lg shadow-lg p-4">
        {/* title */}
        <h1 className="text-xl text-black font-bold mb-2">
          Create a Candidate Account
        </h1>

        {/* small description */}
        <p className="text-black mb-4 font-medium text-sm">
          Join our team to get job opportunities
        </p>

        {/* register form */}
        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <p className="text-xs text-black/60 font-semibold">First Name</p>
            <input
              type="text"
              name="firstName"
              className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your First Name"
              required
            />
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">Last Name</p>
            <input
              type="text"
              name="lastName"
              className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Last Name"
              required
            />
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">Email</p>
            <input
              type="email"
              name="email"
              className="border border-black w-full mt-1 rounded text-black text-xs p-2"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">Phone</p>
            <PhoneInput
              defaultCountry="bd"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{
                width: "100%",
                backgroundColor: "var(--primary-lightest)",
                color: "var(--foreground)",
                border: "1px solid #d1d5db",
              }}
              required
            />

            {!isNumberValid && (
              <p className="text-red-600 font-semibold text-xs mt-1">
                Phone is not valid
              </p>
            )}
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">Password</p>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                className={`border   w-full mt-1 rounded text-black text-xs p-2 ${
                  !isPasswordValid ? "border-red-500" : "border-black"
                }`}
                name="password"
                placeholder="Enter Your Password"
                required
              />

              {isShowPassword ? (
                <FaEyeSlash
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer z-10 dark:text-white"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer z-10 dark:text-white"
                  size={17}
                />
              )}

              {!isPasswordValid && (
                <p className="text-red-600 font-semibold text-xs mt-1">
                  Must be at least 8 characters and include:
                  <br />• One number
                  <br />• One lowercase letter
                  <br />• One uppercase letter
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-black/60 font-semibold">
              Confirm Password
            </p>
            <div className="relative">
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                className="border   dark:bg-primary-light border-black w-full mt-1 rounded text-black text-xs p-2"
                placeholder="Enter The Password Again"
                name="confirm_password"
                required
              />

              {isShowConfirmPassword ? (
                <FaEyeSlash
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer z-10 dark:text-white"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer z-10 dark:text-white"
                  size={17}
                />
              )}

              {!isPasswordMatch && (
                <p className="text-red-600 font-semibold text-xs mt-1">
                  Password doesn&apos;t match
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              disabled={!isNumberValid}
              type="submit"
              className="w-full rounded px-4 py-2 text-white bg-blue-600 text-sm cursor-pointer disabled:bg-gray-300 disabled:text-black/60"
            >
              Register
            </button>
          </div>
        </form>

        <p className="my-2 text-center text-xs text-black/70 font-semibold">
          Already Have an Account? Please{" "}
          <Link href="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>

        {/* divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 border-t-2 border-black/60"></div>
          <span className="text-black text-sm font-medium">OR</span>
          <div className="flex-1 border-t-2 border-black/60"></div>
        </div>

        {/* google login */}
        <GoogleLogin role="candidate" from="signup" />
      </div>
    </section>
  );
};

export default CandidateSignUp;