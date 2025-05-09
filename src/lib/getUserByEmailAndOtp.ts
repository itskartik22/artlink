"use server";

import { prisma } from "./db";
import { InvalidOtpError, OtpExpiredError, OtpNotFoundError, UserNotFoundError } from "./authError"

export async function getUserByEmailAndOtp(email: string, otp: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UserNotFoundError("User not found!");
    }

    if (!user.otp || !user.otpExpiry) {
      throw new OtpNotFoundError("OTP not found!");
    }

    if (user.otpExpiry < new Date()) {
      throw new OtpExpiredError("OTP expired");
    }

    if (user.otp !== otp) {
      throw new InvalidOtpError("Invalid OTP!");
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        otp: null,
        otpExpiry: null,
      },
    });

    return {
      id: user.id,
      name: user.name,
    //   phone: user.phone,
      email: user.email,
      image: user.image,
    };
  } catch (error) {
    throw error;
  }
}
