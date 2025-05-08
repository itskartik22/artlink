"use server";
import { User as AuthUser } from "next-auth";
import bcryptjs from "bcryptjs";
import { prisma } from "./db";

export async function getUserByEmail(
  email: string,
  password: string
): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    if (!user.password) {
      return null;
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
