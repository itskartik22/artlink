import { User } from "next-auth";
import { UserRole } from "./lib/models/User";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    image: string;
    role: UserRole | null;
    emailVerified: boolean;
}

export interface ExtendedUser extends User{
    role: UserRole | null;
    profileSetup: boolean;
}