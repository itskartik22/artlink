"use server";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const setProfileType = async (type: UserRole) => {
  try {
    const user = await currentUser();
    if (!user || !user?.email) {
      return { error: "Authorization Required!" };
    }

    await prisma.user
      .update({
        where: { id: user.id },
        data: { role: type },
      })

    return { success: "Profile Type set successfully" };
  } catch (error) {
    return { error: "Something went wrong!" + error };
  }
};
