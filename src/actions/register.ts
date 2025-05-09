"use server";
import { signIn } from "@/auth";
import { sendOTP } from "@/lib/mail";
import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/lib/definitions";
import bcrypt from "bcrypt";
import { z } from "zod";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  try {
    const validateData = await RegisterSchema.safeParse(formData);
    if (!validateData.success) {
      return { error: "Invalid fields." };
    }

    const { name, email, password } = validateData.data;
    // const existingUser = await .findOne({ email });
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser && existingUser.phoneVerified) {
      return { error: "User already exists. Please login!" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        password: hashedPassword,
        otp,
        otpExpiry,
      },
      create: {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      },
    });
    if (!user) {
      return { error: "Error creating account." };
    }

    await sendOTP(email, otp);
    return {
      success: "Otp sent on your mobile number.",
    };
  } catch (error) {
    console.error(error);
    return { error: "Error creating account." };
  }
}
