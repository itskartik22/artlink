// import { JWT } from "next-auth/jwt"
import { type DefaultSession } from "next-auth"
import { UserRole } from "./lib/models/User"


// declare module "next-auth/jwt" {
  /** Returned by the jwt callback and getToken, when using JWT sessions */
  // interface JWT {
  //   /** OpenID ID Token */
  //   id: string
  //   role: UserRole | null
  //   profileSetup: boolean

  // }
// }

declare module "next-auth" {
  /**
   * Returned by auth, useSession, getSession and received as a prop on the SessionProvider React Context
   */
  // interface User {
  //   /** The user's postal address. */
  //   role: string
  // }
  
  interface Session {
    user: {
      /** The user's postal address. */
      role: UserRole | null
      profileSetup: boolean
      id: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}