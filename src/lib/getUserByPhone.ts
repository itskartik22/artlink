"use server";
import { prisma } from "./db";
import bcryptjs from "bcryptjs";


export async function getUserByPhone(phone: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { phone } });

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
      phone: user.phone,
      // email: user.email,
      image: user.image,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
