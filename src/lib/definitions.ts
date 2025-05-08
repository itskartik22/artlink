import { date, z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  // country: z.string().min(2, { message: "Please enter a valid country." }),

  // phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }),
});

export const ProfileSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must be at most 160 characters.",
  }),
  location: z.string().max(30, {
    message: "Location must be at most 30 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL." }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter a valid date." }),
  
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;