import GoogleProvider from "next-auth/providers/google";
import type { Profile, NextAuthOptions } from "next-auth";
import axios from "axios";
import { cookies } from "next/headers";


interface UserProfile {
  email: string;
  name?: string;
  // add more fields if needed
}
export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      const { email } = profile as UserProfile;

      // ✅ Await cookies() properly
      const cookieStore = await cookies();
      const role = cookieStore.get("auth_role")?.value;

      const firstName = profile?.name?.split(" ")[0];
      const lastName = profile?.name?.split(" ")[1];

      try {
        const res = await axios.post(
          `https://job-portal-backend-xshy.onrender.com/api/${role === "candidate" ? "candidates" : "employers"
          }`,
          {
            firstName,
            lastName,
            email,
            authProvider: "Google",
            role,
          }
        );

        console.log("Signup success:", res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {

          console.error(
            "Error in options.ts:",
            error.response?.data || error.message
          );
        } else if (error instanceof Error) {

          console.error("Error in options.ts:", error.message);
        } else {

          console.error("Error in options.ts:", error);
        }
      }


      // ✅ Remove cookie on server side
      cookieStore.delete("auth_role");

      return true;
    },
  },
};
