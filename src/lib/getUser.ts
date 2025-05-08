import { auth } from "@/auth";

export async function getUser() {
  try {
    const session = await auth();
    return session?.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
