"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useAuth } from "@/providers/AuthProvider";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const EmployerSignUp = () => {
  const { register } = useAuth();
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
      form.elements.namedItem("company_name") as HTMLInputElement
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
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Create an Employer Account
        </h1>

        <p className="text-gray-600 mb-6 text-sm text-center">
          Post job openings and hire top talents
        </p>

        {/* register form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              className="w-full mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your company name"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Phone</label>
            <PhoneInput
              defaultCountry="bd"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{
                width: "100%",
                backgroundColor: "#f9fafb",
                color: "#1f2937",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "14px",
              }}
              required
            />
            {!isNumberValid && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                Invalid phone number
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                className={`w-full mt-1 rounded-md border bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  !isPasswordValid ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                required
              />
              {isShowPassword ? (
                <FaEyeSlash
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-600"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-600"
                  size={17}
                />
              )}
            </div>
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                Password must include:
                <br />• 8+ characters<br />• 1 uppercase<br />• 1 lowercase<br />•
                1 number
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                name="confirm_password"
                className="w-full mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 text-sm p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Confirm your password"
                required
              />
              {isShowConfirmPassword ? (
                <FaEyeSlash
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer text-gray-600"
                  size={17}
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-3 right-3 cursor-pointer text-gray-600"
                  size={17}
                />
              )}
            </div>
            {!isPasswordMatch && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                Passwords don’t match
              </p>
            )}
          </div>

          <button
            disabled={!isNumberValid}
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-600"
          >
            Register
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 font-medium mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-700 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EmployerSignUp;




// "use client";
// // import GoogleLogin from "@/components/GoogleLogin";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import { PhoneNumberUtil } from "google-libphonenumber";
// import { useAuth } from "@/providers/AuthProvider";

// const phoneUtil = PhoneNumberUtil.getInstance();

// const isPhoneValid = (phone: string) => {
//   try {
//     return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//   } catch (error) {
//     return false;
//   }
// };

// const EmployerSignUp = () => {
//   const {register} = useAuth()
//   const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
//   const [isShowConfirmPassword, setIsShowConfirmPassword] =
//     useState<boolean>(false);
//   const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
//   const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
//   const [phone, setPhone] = useState<string>("");
//   const isNumberValid = isPhoneValid(phone);

//   // Regular expression for strong password
//   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;

//     const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
//       .value;
//     const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
//       .value;
//     const companyName = (
//       form.elements.namedItem("company_name") as HTMLInputElement
//     ).value;
//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
//     const password = (form.elements.namedItem("password") as HTMLInputElement)
//       .value;
//     const confirm_password = (
//       form.elements.namedItem("confirm_password") as HTMLInputElement
//     ).value;

//     const isPasswordValid = passwordPattern.test(password);

//     if (!isPasswordValid) {
//       return setIsPasswordValid(false);
//     }

//     setIsPasswordValid(true);

//     if (password !== confirm_password) {
//       return setIsPasswordMatch(false);
//     }

//     setIsPasswordMatch(true);

//     register(firstName, lastName, phone, email, password, 'employer', companyName)
//   };

//   return (
//     <section className="px-4 pb-10 pt-30">
//       <div className="max-w-lg mx-auto bg-primary-dark rounded-lg shadow-lg p-4">
//         {/* title */}
//         <h1 className="text-xl text-black font-bold mb-2">
//           Create an Employer Account
//         </h1>

//         {/* small description */}
//         <p className="text-black mb-4 font-medium text-sm">
//           Join our team to post job openings and hire talents
//         </p>

//         {/* register form */}
//         <form onSubmit={handleRegister} className="space-y-3">
//           <div>
//             <p className="text-xs text-black/60 font-semibold">First Name</p>
//             <input
//               type="text"
//               name="firstName"
//               className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
//               placeholder="Enter Your First Name"
//               required
//             />
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Last Name</p>
//             <input
//               type="text"
//               name="lastName"
//               className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
//               placeholder="Enter Your Last Name"
//               required
//             />
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Company Name</p>
//             <input
//               type="text"
//               name="company_name"
//               className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
//               placeholder="Enter Your Company Name"
//               required
//             />
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Email</p>
//             <input
//               type="email"
//               name="email"
//               className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Phone</p>
//             <PhoneInput
//               defaultCountry="bd"
//               value={phone}
//               onChange={(phone) => setPhone(phone)}
//                inputStyle={{
//                 width: "100%",
//                 backgroundColor: "transparent",
//                 color: "black",
//                 border: "1px solid black",
//               }}
//               required
//             />

//             {!isNumberValid && (
//               <p className="text-red-600 font-semibold text-xs mt-1">
//                 Phone is not valid
//               </p>
//             )}
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">Password</p>
//             <div className="relative">
//               <input
//                 type={isShowPassword ? "text" : "password"}
//                 className={`border w-full mt-1 rounded text-black text-xs p-2 ${
//                   !isPasswordValid ? "border-red-500" : "border-black"
//                 }`}
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

//               {!isPasswordValid && (
//                 <p className="text-red-600 font-semibold text-xs mt-1">
//                   Must be at least 8 characters and include:
//                   <br />• One number
//                   <br />• One lowercase letter
//                   <br />• One uppercase letter
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <p className="text-xs text-black/60 font-semibold">
//               Confirm Password
//             </p>
//             <div className="relative">
//               <input
//                 type={isShowConfirmPassword ? "text" : "password"}
//                 className="border   border-black w-full mt-1 rounded text-black text-xs p-2"
//                 placeholder="Enter The Password Again"
//                 name="confirm_password"
//                 required
//               />

//               {isShowConfirmPassword ? (
//                 <FaEyeSlash
//                   onClick={() =>
//                     setIsShowConfirmPassword(!isShowConfirmPassword)
//                   }
//                   className="absolute top-3 right-3 cursor-pointer z-10 text-black"
//                   size={17}
//                 />
//               ) : (
//                 <FaEye
//                   onClick={() =>
//                     setIsShowConfirmPassword(!isShowConfirmPassword)
//                   }
//                   className="absolute top-3 right-3 cursor-pointer z-10 text-black"
//                   size={17}
//                 />
//               )}

//               {!isPasswordMatch && (
//                 <p className="text-red-600 font-semibold text-xs mt-1">
//                   Password doesn&apos;t match
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               disabled={!isNumberValid}
//               type="submit"
//               className="w-full rounded px-4 py-2 text-white bg-blue-600 text-sm cursor-pointer disabled:bg-gray-300 disabled:text-black/60"
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         <p className="my-2 text-center text-xs text-black/70 font-semibold">
//           Already Have an Account? Please{" "}
//           <Link href="/login" className="text-blue-700 hover:underline">
//             Login
//           </Link>
//         </p>

//         {/* divider */}
//         {/* <div className="flex items-center gap-2 my-6">
//           <div className="flex-1 border-t-2 border-black/60"></div>
//           <span className="text-black text-sm font-medium">OR</span>
//           <div className="flex-1 border-t-2 border-black/60"></div>
//         </div> */}

//         {/* google login */}
//         {/* <GoogleLogin role="employer" from="signup" /> */}
//       </div>
//     </section>
//   );
// };

// export default EmployerSignUp;
