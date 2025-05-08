import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FcLike } from "react-icons/fc";

interface Props {
  title: string;
  imageURL: string;
  artist: string;
  ratio: string;
  likes: number;
}

const ArtCard = ({ title, imageURL, ratio, artist, likes }: Props) => {
  // const aspectRatioClasses = {
  //   square: "aspect-square",
  //   portrait: "aspect-[4/5]",
  //   landscape: "aspect-[3/2]",
  // };

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
        className={`rounded-xl cursor-pointer relative z-0 min-w-full border-2 `}
      />
      <div className="flex gap-4 justify-between p-1">
        <p className="text-gray-800">@{artist}</p>

        <Badge
          className="flex gap-1 justify-center items-center shadow-inner"
          variant="outline"
        >
          {likes}
          <FcLike />
        </Badge>
      </div>
    </div>
  );
};

export default ArtCard;
