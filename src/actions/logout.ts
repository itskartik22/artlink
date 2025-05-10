"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut({
      // redirectTo: "/login"
      redirect: false,
    });
    return {
      success: "Logged out successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}
