import { SignupForm } from "../../../components/auth/RegisterForm";
import { Inter } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "@/auth";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function page() {
  return (
    <div className="relative w-full flex flex-col pt-10  items-center gap-2">
      <div className="flex md:w-3/4 xl:flex-row flex-col p-4 gap-6 justify-center">
        <div className="p-4 flex flex-col justify-center gap-4 flex-1">
          <h1 className="text-xl font-medium">Create a new account</h1>
          <SignupForm />
          <div className="mt-1">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline">
                Log in
              </Link>
            </p>
          </div>
          <div className="my-1 flex gap-2 items-center w-full">
            <div className="p-[0.8px] bg-slate-800/50 w-full"></div>
            <p className="text-sm text-slate-800">or</p>
            <div className="p-[0.8px] bg-slate-800/50 w-full"></div>
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              className="w-full text-black border-[1px] h-10 rounded-md items-center flex justify-center gap-1 shadow-md"
              type="submit"
            >
              <FcGoogle className="inline-block" size={20} />
              <span className="text-sm">Google</span>
            </button>
          </form>
        </div>
        <div className="h-[500px] rounded-lg max-md:hidden">
          <Image
            src="/img/register.jpeg"
            alt="Commission artwork"
            width={500}
            height={500}
            className="object-cover max-md:hidden"
          />
        </div>
      </div>
      <div className="my-10 text-sm text-center right-0 left-0">
        &copy; 2025 Artlink - All Rights Reserved
      </div>
    </div>
  );
}
