"use client";
import React, { useEffect, useState } from "react";
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
import { getAllProducts } from "@/actions/productAction";
import LikeButton from "@/components/like/LikeButton";
import WishlistButton from "@/components/wishlist/WishlistButton";

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
  likes: {
    id: string;
    userId: string;
    productId: string;
  }[];
};


const Explore = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { products, error } = await getAllProducts();
      console.log("products", products);
      console.log("error", error);
      if (products) {
        setProducts(products as unknown as ProductData[]);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center font-extrabold w-full p-2 bg-gray-900 text-white">
        Explore Artworks
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 items-center mx-8 max-sm:mx-4 mt-6">
        {products.map((product, index) => (
          <Dialog key={index}>
            <DialogTrigger className="mb-4 w-full">
              <ArtCard
                title={product.name}
                imageURL={product.images[0]}
                artistId={product.artistId}
                likes={product.likes}
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
                  <div className="flex items-center justify-between gap-2">
                    <AddToCart
                      productId={product.id}
                      stock={product.stock}
                      price={product.price}
                    />
                    <LikeButton className="absolute right-9" productId={product.id} />
                  </div>
                  <div className="flex gap-2">
                    <WishlistButton productId={product.id} className="w-full" />
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
