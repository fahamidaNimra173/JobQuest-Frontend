import GoogleProvider from "next-auth/providers/google";
import type { Profile, NextAuthOptions } from "next-auth";
import axios from "axios";
import Cookies from "js-cookie";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      const { email, given_name, family_name } = profile as any;

      // 1. Read the role from the cookie
      const role = Cookies.get("auth_role");

      try {
        const res = await axios.post(
          "https://job-portal-backend-xshy.onrender.com/auth/signup",
          {
            firstName: given_name,
            lastName: family_name,
            email,
            provider: "Google",
            role,
          }
        );

        localStorage.setItem("authToken", JSON.stringify(res.data.token));

        // 3. Clean up the cookie after use
        if (role) {
          Cookies.remove("auth_role");
        }
      } catch (error) {
        console.log("error in options.ts", error);
      }

      return true;
    },
  },
};