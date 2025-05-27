"use server";
import { LoginSchema } from "@/lib/definitions";
import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";



export async function login(formData: z.infer<typeof LoginSchema>) {
  try {
    const validateData = await LoginSchema.safeParse(formData);
    if (!validateData.success) {
      return { error: "Invalid fields." };
    }
    const { email, password } = validateData.data;
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT
      redirect: false,
    });
    // revalidatePath("/");
    return { success: "Login successfully." };
  } catch (error) {
      return { error: "Something went wrong!" + error };
    // console.error(error);
    // if (error instanceof AuthError) {
    //   switch (error) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid Credential!" };
    //     default:
    //       return { error: "Something went wrong!" };
    //   }
    // }
  }
}
export async function otpLogin(values: { email: string; otp: string }) {
  const { email, otp } = values;
  if (!email || !otp) {
    return { error: "Something went wrong!." };
  }

  console.log("phone", email, otp);
  try {
    await signIn("credentials", {
      email,
      otp,
      // redirectTo: DEFAULT_LOGIN_REDIRECT
      redirect: false,
    });
    // revalidatePath("/");
    return { success: "Otp verified. Wait page will be redirect." };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) { 
      switch (error.cause) {
        case "CredentialsSignin":
          return { error: "Invalid Credential!" };
        default:
          return { error: error.message.split(".")[0] };
      }
    }
  }
}
