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

type ProductData = {
  id: string;
  name: string;
  description: string;
  artistId: string;
  price: number;
  images: string[];
  stock: number;
  dimensions: object;
  medium: string;
  category: string;
  style: string;
};

const productData: ProductData[] = [
  {
    id: "1",
    name: "Sketch",
    description:
      "A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
    artistId: "artist-placeholder",
    price: 699,
    images: [
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 5,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: "2",
    name: "Mystic Forest",
    description:
      "An enchanting depiction of a forest bathed in mystical light, evoking a sense of wonder.",
    artistId: "artist-placeholder",
    price: 849,
    images: [
      "https://cdna.artstation.com/p/assets/images/images/066/381/460/large/jeeva-artist-f4mno7qaeaaznwi.jpg?1692767040",
    ],
    stock: 3,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: "3",
    name: "Modern Abstract",
    description:
      "A striking abstract piece with bold colors and dynamic shapes, perfect for contemporary spaces.",
    artistId: "artist-placeholder",
    price: 689,
    images: ["/img/logo.jpeg"],
    stock: 8,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: "4",
    name: "Vintage Portrait",
    description:
      "A vintage-style portrait that captures the essence of classical beauty and elegance.",
    artistId: "artist-placeholder",
    price: 769,
    images: [
      "https://media.istockphoto.com/id/478287701/photo/decorated-adobe-mud-wall.jpg?s=2048x2048&w=is&k=20&c=8ZjpfoBzkvslhhwJIZ4BRusAecJp1ifKgcYzS_AB1eI=",
    ],
    stock: 2,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: "5",
    name: "Cityscape",
    description:
      "A detailed cityscape illustration that showcases the bustling energy of urban life.",
    artistId: "artist-placeholder",
    price: 715,
    images: ["/img/artEye.png"],
    stock: 4,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Taylor-Swift Sketch",
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse.",
    artistId: "artist-placeholder",
    price: 949,
    images: [
      "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Floral Delight",
    description:
      "A beautiful floral painting that brings the vibrant colors and delicate beauty of flowers to life.",
    artistId: "artist-placeholder",
    price: 669,
    images: ["https://img6.arthub.ai/64bd3aa9-b195.webp"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Iron Man Minion",
    description:
      "A playful and creative sketch merging Iron Man and Minion, perfect for fans of both characters.",
    artistId: "artist-placeholder",
    price: 844,
    images: [
      "https://e1.pxfuel.com/desktop-wallpaper/570/172/desktop-wallpaper-iron-man-worksheet-minnion-iron-man-sketch.jpg",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Abstract Geometry",
    description:
      "A modern abstract piece featuring geometric shapes and a harmonious blend of colors.",
    artistId: "artist-placeholder",
    price: 901,
    images: [
      "https://m.media-amazon.com/images/I/71C8m0K7LsL._AC_UF1000,1000_QL80_.jpg",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Mountain Retreat",
    description:
      "A serene illustration of a mountain retreat, capturing the tranquility and beauty of nature.",
    artistId: "artist-placeholder",
    price: 623,
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/007/446/043/small_2x/camping-in-nature-mountain-landscape-sketch-style-illustrations-vector.jpg",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Digital Dream",
    description:
      "A digital artwork that blends futuristic elements with a dreamlike atmosphere.",
    artistId: "artist-placeholder",
    price: 976,
    images: [
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Golden Horizons",
    description:
      "A captivating landscape painting with golden hues, evoking a sense of warmth and tranquility.",
    artistId: "artist-placeholder",
    price: 636,
    images: ["/img/artYellow.png"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Acrylic Painting - Demon Slayer",
    description:
      "An intricate sketch of an urban scene, capturing the hustle and bustle of city life.",
    artistId: "artist-placeholder",
    price: 761,
    images: [
      "https://media.istockphoto.com/id/478287701/photo/decorated-adobe-mud-wall.jpg?s=2048x2048&w=is&k=20&c=8ZjpfoBzkvslhhwJIZ4BRusAecJp1ifKgcYzS_AB1eI=",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Abstract Vision",
    description:
      "A thought-provoking abstract piece that invites viewers to interpret its layers of meaning.",
    artistId: "artist-placeholder",
    price: 704,
    images: ["/img/artEye.png"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Dreamscape",
    description:
      "A dreamy landscape painting that transports viewers to a serene and otherworldly place.",
    artistId: "artist-placeholder",
    price: 897,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kfwSbLRp5QWzeIwP3chD72mAwbhfZ9wUTw&s",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Modern Portrait",
    description:
      "A modern portrait with a minimalist approach, highlighting the subject's unique features.",
    artistId: "artist-placeholder",
    price: 938,
    images: ["/img/login.jpeg"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Line Art",
    description:
      "A vibrant artwork bursting with color and energy, perfect for adding a pop of excitement to any space.",
    artistId: "artist-placeholder",
    price: 888,
    images: ["/img/login.jpeg"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Taylor-Swift Sketch",
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse. A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
    artistId: "artist-placeholder",
    price: 913,
    images: [
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Peaceful Moment",
    description:
      "A serene scene capturing a peaceful moment in time, inviting viewers to pause and reflect.",
    artistId: "artist-placeholder",
    price: 792,
    images: ["/img/login.jpeg"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Bold Statement",
    description:
      "A bold and dynamic piece that makes a powerful statement with its striking design and colors.",
    artistId: "artist-placeholder",
    price: 825,
    images: ["/img/register.jpeg"],
    stock: 0,
    dimensions: {},
    medium: "",
    category: "",
    style: "",
  },
];


const Explore = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center font-extrabold w-full p-2 bg-gray-900 text-white">
        Explore Artworks
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 items-center mx-8 max-sm:mx-4 mt-6">
        {productData.map((product, index) => (
          <Dialog key={index}>
            <DialogTrigger className="mb-4 w-full">
              <ArtCard
                title={product.name}
                imageURL={product.images[0]}
                artistId={product.artistId}
                likes={Math.floor(Math.random() * 10000)}
              />
            </DialogTrigger>
            <DialogContent className="flex min-w-[60%] max-xl:min-w-[80%] max-md:min-w-[50%] justify-center rounded-lg max-md:w-3/5 bg-black bg-opacity-50 border-black shadow-inner shadow-gray-600">
              <DialogDescription className="max-md:pt-2 w-full flex flex-row max-md:flex-col gap-4 justify-between">
                <div className="md:min-w-[50%] max-sm:max-h-[50%]">
                  <Image
                    src={product.images[0]}
                    width={400}
                    height={400}
                    objectFit="contain"
                    alt={product.name}
                    className="rounded-lg object-contain md:w-[100%]"
                  />
                </div>
                <div className="flex lg:max-w-[50%] md:flex-grow flex-col child  p-2 text-white gap-2">
                  <DialogTitle className="flex flex-col gap-4 max-md:flex-row justify-between">
                    <h1>{product.name} </h1>
                    <span className="hidden max-md:flex">₹{product.price}</span>
                  </DialogTitle>
                  <p className="text-gray-100 text-sm font-thin">
                    {product.description}
                  </p>
                  <p>Artist: {product.artistId}</p>
                  <p className="max-md:hidden font-extrabold">₹{product.price}</p>
                  <AddToCart
                    productId={product.id}
                    stock={product.stock}
                    price={product.price}
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

export default Explore;
