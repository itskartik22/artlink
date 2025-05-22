"use client";
import ArtistProfile from "@/components/profile/ArtistProfile";
// import { LogoutButton } from "@/components/_auth/logout-button";
// import { useSessionContext } from "@/context/SessionContext";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import ProfileComp from "@/components/profile/ProfileComp";
import { useCurrentUser } from "@/hooks/useCurrentUser";


export default function Profile() {

  const user = useCurrentUser();

  // const router = useRouter();

  // useEffect(() => {
 
  // });
  // console.log(user);
  const userRole = user?.role || ""; // Replace with actual user role logic

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
      {userRole === "Artist" ? <ArtistProfile /> : <ProfileComp />}
    </div>
  );
}
