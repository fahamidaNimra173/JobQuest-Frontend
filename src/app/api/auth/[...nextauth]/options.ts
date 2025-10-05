import GoogleProvider from "next-auth/providers/google";
import type { Profile, NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
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

        localStorage.setItem('user', JSON.stringify(res.data.user))
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
};