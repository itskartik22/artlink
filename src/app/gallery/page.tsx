import React from "react";
import ArtCard from "@/components/art/artCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddToCart from "@/components/cart/AddToCart";

const artData = [
  {
    id: "1",
    title: "Sketch",
    imageURL:
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ratio: "portrait",
    artist: "Kuber",
    price: 699,
    stock: 5,
    description:
      "A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
  },
  {
    id: "2",
    title: "Mystic Forest",
    imageURL:
      "https://cdna.artstation.com/p/assets/images/images/066/381/460/large/jeeva-artist-f4mno7qaeaaznwi.jpg?1692767040",
    ratio: "portrait",
    artist: "Artist",
    price: 849,
    stock: 3,
    description:
      "An enchanting depiction of a forest bathed in mystical light, evoking a sense of wonder.",
  },
  {
    id: "3",
    title: "Modern Abstract",
    imageURL: "/img/logo.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 689,
    stock: 8,
    description:
      "A striking abstract piece with bold colors and dynamic shapes, perfect for contemporary spaces.",
  },
  {
    id: "4",
    title: "Vintage Portrait",
    imageURL:
      "https://media.istockphoto.com/id/478287701/photo/decorated-adobe-mud-wall.jpg?s=2048x2048&w=is&k=20&c=8ZjpfoBzkvslhhwJIZ4BRusAecJp1ifKgcYzS_AB1eI=",
    ratio: "square",
    artist: "Artist",
    price: 769,
    stock: 2,
    description:
      "A vintage-style portrait that captures the essence of classical beauty and elegance.",
  },
  {
    id: "5",
    title: "Cityscape",
    imageURL: "/img/artEye.png",
    ratio: "landscape",
    artist: "Artist",
    price: 715,
    stock: 4,
    description:
      "A detailed cityscape illustration that showcases the bustling energy of urban life.",
  },
  {
    title: "Taylor-Swift Sketch",
    imageURL:
      "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ratio: "square",
    artist: "Ashutosh",
    price: 949,
    stock: 0,
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse.",
  },
  {
    title: "Floral Delight",
    imageURL: "https://img6.arthub.ai/64bd3aa9-b195.webp",
    ratio: "square",
    artist: "Artist",
    price: 669,
    stock: 0,
    description:
      "A beautiful floral painting that brings the vibrant colors and delicate beauty of flowers to life.",
  },
  {
    title: "Iron Man Minion",
    imageURL:
      "https://e1.pxfuel.com/desktop-wallpaper/570/172/desktop-wallpaper-iron-man-worksheet-minnion-iron-man-sketch.jpg",
    ratio: "portrait",
    artist: "Artist",
    price: 844,
    stock: 0,
    description:
      "A playful and creative sketch merging Iron Man and Minion, perfect for fans of both characters.",
  },
  {
    title: "Abstract Geometry",
    imageURL:
      "https://m.media-amazon.com/images/I/71C8m0K7LsL._AC_UF1000,1000_QL80_.jpg",
    ratio: "portrait",
    artist: "Artist",
    price: 901,
    stock: 0,
    description:
      "A modern abstract piece featuring geometric shapes and a harmonious blend of colors.",
  },
  {
    title: "Mountain Retreat",
    imageURL:
      "https://static.vecteezy.com/system/resources/thumbnails/007/446/043/small_2x/camping-in-nature-mountain-landscape-sketch-style-illustrations-vector.jpg",
    ratio: "landscape",
    artist: "Artist",
    price: 623,
    stock: 0,
    description:
      "A serene illustration of a mountain retreat, capturing the tranquility and beauty of nature.",
  },
  {
    title: "Digital Dream",
    imageURL:
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ratio: "portrait",
    artist: "Ashutosh",
    price: 976,
    stock: 0,
    description:
      "A digital artwork that blends futuristic elements with a dreamlike atmosphere.",
  },
  {
    title: "Golden Horizons",
    imageURL: "/img/artYellow.png",
    ratio: "landscape",
    artist: "Artist",
    price: 636,
    stock: 0,
    description:
      "A captivating landscape painting with golden hues, evoking a sense of warmth and tranquility.",
  },
  {
    title: "Acrylic Painting - Demon Slayer",
    imageURL:
      "https://media.istockphoto.com/id/478287701/photo/decorated-adobe-mud-wall.jpg?s=2048x2048&w=is&k=20&c=8ZjpfoBzkvslhhwJIZ4BRusAecJp1ifKgcYzS_AB1eI=",
    ratio: "landscape",
    artist: "Ashutosh",
    price: 761,
    stock: 0,
    description:
      "An intricate sketch of an urban scene, capturing the hustle and bustle of city life.",
  },
  {
    title: "Abstract Vision",
    imageURL: "/img/artEye.png",
    ratio: "landscape",
    artist: "Artist",
    price: 704,
    stock: 0,
    description:
      "A thought-provoking abstract piece that invites viewers to interpret its layers of meaning.",
  },
  {
    title: "Dreamscape",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kfwSbLRp5QWzeIwP3chD72mAwbhfZ9wUTw&s",
    ratio: "portrait",
    artist: "Artist",
    price: 897,
    stock: 0,
    description:
      "A dreamy landscape painting that transports viewers to a serene and otherworldly place.",
  },
  {
    title: "Modern Portrait",
    imageURL: "/img/login.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 938,
    stock: 0,
    description:
      "A modern portrait with a minimalist approach, highlighting the subject's unique features.",
  },
  {
    title: "Line Art",
    imageURL: "/img/login.jpeg",
    ratio: "square",
    artist: "Ashutosh",
    price: 888,
    stock: 0,
    description:
      "A vibrant artwork bursting with color and energy, perfect for adding a pop of excitement to any space.",
  },
  {
    title: "Taylor-Swift Sketch",
    imageURL:
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ratio: "portrait",
    artist: "Ashutosh",
    price: 913,
    stock: 0,
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse. A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
  },
  {
    title: "Peaceful Moment",
    imageURL: "/img/login.jpeg",
    ratio: "square",
    artist: "Ashutosh",
    price: 792,
    stock: 0,
    description:
      "A serene scene capturing a peaceful moment in time, inviting viewers to pause and reflect.",
  },
  {
    title: "Bold Statement",
    imageURL: "/img/register.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 825,
    stock: 0,
    description:
      "A bold and dynamic piece that makes a powerful statement with its striking design and colors.",
  },
];

const Gallery = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center font-extrabold w-full p-2 bg-gray-900 text-white">
        Art Gallery
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 items-center mx-8 max-sm:mx-4 mt-6">
        {artData.map((art) => (
          <Dialog key={art.id}>
            <DialogTrigger className="mb-4 w-full">
              <ArtCard
                title={art.title}
                imageURL={art.imageURL}
                ratio={art.ratio}
                artist={art.artist}
                likes={Math.floor(Math.random() * 10000)}
              />
            </DialogTrigger>
            <DialogContent className="flex min-w-[60%] max-xl:min-w-[80%] max-md:min-w-[50%] justify-center rounded-lg max-md:w-3/5 bg-black bg-opacity-50 border-black shadow-inner shadow-gray-600">
              <DialogDescription className="max-md:pt-2 w-full flex flex-row max-md:flex-col gap-4 justify-between">
                <div className="md:min-w-[50%] max-sm:max-h-[50%]">
                  <Image
                    src={art.imageURL}
                    width={400}
                    height={400}
                    objectFit="contain"
                    alt={art.title}
                    className="rounded-lg object-contain md:w-[100%]"
                  />
                </div>
                <div className="flex lg:max-w-[50%] md:flex-grow flex-col child  p-2 text-white gap-2">
                  <DialogTitle className="flex flex-col gap-4 max-md:flex-row justify-between">
                    <h1>{art.title} </h1>
                    <span className="hidden max-md:flex">₹{art.price}</span>
                  </DialogTitle>
                  <p className="text-gray-100 text-sm font-thin">
                    {art.description}
                  </p>
                  <p>Artist: {art.artist}</p>
                  <p className="max-md:hidden font-extrabold">
                    ₹{art.price}
                  </p>
                  <AddToCart 
                    productId={art.id}
                    stock={art.stock}
                    price={art.price}
                  />
                  <div className="flex gap-2">
                    <Button className="w-1/2 bg-white  text-gray-900 hover:text-white hover:shadow-inner hover:shadow-white">
                      Wishlist
                    </Button>
                    <Button className="w-1/2 bg-white  text-gray-900 hover:text-white hover:shadow-inner hover:shadow-white">
                      Like
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
