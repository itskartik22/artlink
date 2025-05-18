import { prisma } from "./db";
// import User, { UserDocument } from "./models/User";

export async function getUserById(userId: string) {
  try {
      const user = await prisma.user.findUnique({ where: { id: userId }});
      if (!user) {
          return null;
      }

      return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
          profileSetup: user.profileSetup,
      };
  } catch (error) {
      console.error(error);
      return null;

  }
}