"use server"

import { prisma } from "@/lib/db";

export async function getUser(userId: string | null) {
  if (!userId) {
    return { error: "User ID is required." };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return { error: "User not found." };
    }
    return {
      user
    };
  } catch (error) {
    console.error(error);
    return { error: "Error fetching user." };
  }
}

export async function updateUser(userId: string, data: any) {

  console.log("updateUser", userId, data);
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    if (!user) {
      return { error: "User not found." };
    }
    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Error updating user." };
  }
}

export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return { error: "User not found." };
    }
    return user;
  } catch (error) {
    console.error(error);
    return { error: "Error deleting user." };
  }
}

// get username by id
export async function getUsernameById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true
    }
  });
  return { username: user?.username || "" };
}
