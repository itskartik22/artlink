"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const WishlistComponent = () => {
  const user = useCurrentUser();
  console.log(user, "user");
  return (
    <div
      className={`px-5 py-4 gap-8 h-full min-h-96 w-full flex-col rounded-lg shadow-md border-2`}
    >
      <div className="flex flex-col items-center justify-center h-96">
        {user ? (
          <p className="text-center text-pretty text-indigo-600"> 
            <span className="font-bold text-red-600">{user?.name} &apos;s</span>{" "}
            wishlist is empty.
          </p>
        ) : (
          <p>Please log in to view your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
