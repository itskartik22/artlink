"use client";
import ArtistProfile from "@/components/profile/ArtistProfile";
// import { LogoutButton } from "@/components/_auth/logout-button";
// import { useSessionContext } from "@/context/SessionContext";
// import { useCurrentUser } from "@/hooks/current-user";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import ProfileComp from "@/components/profile/ProfileComp";


export default function Profile() {
  //   const user = useCurrentUser();
  // const user = useCurrentUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session.isAuthenticated) {
  //     router.push("/login");
  //   }
  //   if (session.user && !session.user.userType) {
  //     router.push("/user/profile-type");
  //   }
  // });
  // console.log(user);
  const userRole = "artist"; // Replace with actual user role logic

  return (
    <div className="w-full">
      {}
      {/* <h1>Profile</h1>
      <p className="flex">
        Name: {JSON.stringify(session.user?.name)}{" "}
        <span className="flex">
          image: {JSON.stringify(session.user?.image)}
        </span>
      </p>
      <p className="flex">email: {JSON.stringify(session.user?.email)}</p>
      <p className="flex">userType: {JSON.stringify(session.user?.userType)}</p>
      <LogoutButton /> */}
      {userRole === "artist" ? <ArtistProfile /> : <ProfileComp />}
    </div>
  );
}
