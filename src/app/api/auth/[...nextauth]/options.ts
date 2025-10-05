import GoogleProvider from "next-auth/providers/google";
import type { Profile, NextAuthOptions } from "next-auth";
import axios from "axios";

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

      try {
        const res = await axios.post(
          "https://job-portal-backend-xshy.onrender.com/auth/signup",
          {
            firstName: given_name,
            lastName: family_name,
            email,
            provider: "Google",
          }
        );

        localStorage.setItem('authToken', JSON.stringify(res.data.token))
      } catch (error) {
        console.log("error in options.ts", error);
      }

      return true;
    },
  },
};