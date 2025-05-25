import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FcLike } from "react-icons/fc";
import { getUsernameById } from "@/actions/userAction";

interface ArtCardProps {
  title: string;
  imageURL: string;
  artistId: string;
  ratio?: string;
  likes: {
    id: string;
    userId: string;
    productId: string;
  }[];
}

const ArtCard = ({ title, imageURL, ratio, artistId, likes }: ArtCardProps) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[3/2]",
  };
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const fetchUsername = async () => {
      const result = await getUsernameById(artistId);
      setUsername(result.username);
    };
    fetchUsername();
  }, [artistId]);

  return (
    <div
      className={`relative 
       cursor-pointer overflow-hidden hover:scale-105 hover:shadow-md hover:rounded-xl transition-transform duration-300 ease-in-out
       `}
    >
      <Image
        src={imageURL}
        alt={title}
        width={400}
        height={ratio === "square" ? 400 : ratio === "portrait" ? 500 : 300}
        className={`rounded-xl cursor-pointer relative z-0 w-full border-2 `}
      />
      <div className="flex gap-4 justify-between p-1">
        <p className="text-gray-800">@{username}</p>

        <Badge
          className="flex gap-1 justify-center items-center shadow-inner"
          variant="outline"
        >
          {likes.length}
          <FcLike />
        </Badge>
      </div>
    </div>
  );
};

export default ArtCard;
