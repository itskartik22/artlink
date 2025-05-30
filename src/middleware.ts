import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return;
});

// // Optionally, don't invoke Middleware on some paths

// import NextAuth from "next-auth"
// import authConfig from "./auth.config";

// export const { auth: middleware } = NextAuth(authConfig)

// export const config = {
//   matcher: ["/profile"],
// };

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).)", "/", "/profile", "/settings", "/(api|trpc)(.)"],
};