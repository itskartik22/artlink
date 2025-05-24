"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuPaintbrush, LuImage, LuPalette, LuUserCheck } from "react-icons/lu";
import { Footer } from "@/components/shared/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artist: {
    name: string;
  };
}

const features = [
  {
    icon: LuPaintbrush,
    title: "Custom Artwork",
    description: "Get personalized artwork created just for you by talented artists",
  },
  {
    icon: LuImage,
    title: "Digital & Traditional",
    description: "Choose from a wide range of digital and traditional art styles",
  },
  {
    icon: LuPalette,
    title: "Various Mediums",
    description: "Explore artwork in different mediums - from oils to watercolors",
  },
  {
    icon: LuUserCheck,
    title: "Verified Artists",
    description: "Work with verified and skilled artists from around the world",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products/featured");
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Unique Artworks
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with talented artists and find the perfect piece for your space
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{product.price}</span>
                    <span className="text-sm text-gray-500">by {product.artist.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Work Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Custom Artwork</h2>
              <p className="text-gray-600 mb-8">
                Looking for something unique? Commission our talented artists to create
                custom artwork tailored to your vision. From portraits to landscapes,
                bring your ideas to life.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button className="mt-8" size="lg" asChild>
                <Link href="/commission">Start Commission</Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/img/commission-art.jpg"
                alt="Commission artwork"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artist Showcase Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Artist Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Are you an artist? Join our community to showcase your work, connect with art
            lovers, and earn from your passion.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">Join as Artist</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Paintings", image: "/img/category-paintings.jpg" },
              { name: "Digital Art", image: "/img/category-digital.jpg" },
              { name: "Sculptures", image: "/img/category-sculptures.jpg" },
              { name: "Photography", image: "/img/category-photography.jpg" },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
