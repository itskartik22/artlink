"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut();
    return {
      success: "Logged out successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }
}
