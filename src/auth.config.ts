import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./lib/getUserByEmail";
import { getUserByPhone } from "./lib/getUserByPhone";
import { getUserByPhoneAndOtp } from "./lib/getUserByPhoneAndOtp";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        phone: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        // otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const { phone, password, otp } = credentials as { phone: string; password: string, otp: string };
        //   if (phone && otp) {
        //     const user = await getUserByPhoneAndOtp(phone, otp);
        //     if (user) {
        //       return user;
        //     } else {
        //       return null;
        //     }
        //   }
          const user = await getUserByEmail(phone, password);
          console.log("user", user);
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;



// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import { getUserByPhone } from "./lib/getUserByPhone";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Credentials({
//       // name: "Credentials",
//       id: "credentials",
//       name: "Mobile OTP",
//       credentials: {
//         phone: { label: "Phone Number", type: "text" },
//         otp: { label: "OTP", type: "text" },
//       },
//       authorize: async (credentials) => {
//         try {
//           const { phone, otp } = credentials as { phone: string; otp: string };

//           if (!phone || !otp) {
//             throw new Error("Phone and OTP are required");
//           }
          
//           const user = await getUserByPhone(phone, otp);

//           if (user) {
//             return user;
//           }
//           return null;
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   trustHost: true,
//   secret: process.env.NEXTAUTH_SECRET,
// } satisfies NextAuthConfig;