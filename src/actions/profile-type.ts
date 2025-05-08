"use server";
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { UserType } from "@prisma/client";

export const setProfileType = async (type: UserType) => {
  try {
    const user = await currentUser();
    if (!user || !user?.email) {
      return { error: "Authorization Required!" };
    }

    const existingUser = await getUserByEmail(user.email);

    if (!existingUser) {
      return { error: "User not exist!" };
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        userType: type,
      },
    });
    return { success: "Profile Type set successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
