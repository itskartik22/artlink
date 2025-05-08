import React from "react";
import ArtCard from "@/components/art/artCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const artData = [
  {
    title: "Sketch",
    imageURL:
      "https://instagram.fpat2-4.fna.fbcdn.net/v/t51.29350-15/449335499_876186174321684_4453971110098583231_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fpat2-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=-QN3a953A6YQ7kNvgHmHHF1&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzQwMTA3MDg5NTE0ODQ3ODc2MQ%3D%3D.2-ccb7-5&oh=00_AYA9Q1ADSNfhv0A0jwJXisazm664LzaKCvLQG_ugZL3TKg&oe=668ADAB4&_nc_sid=8f1549",
    ratio: "portrait",
    artist: "Kuber",
    price: 699,
    description:
      "A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
  },
  {
    title: "Mystic Forest",
    imageURL:
      "https://cdna.artstation.com/p/assets/images/images/066/381/460/large/jeeva-artist-f4mno7qaeaaznwi.jpg?1692767040",
    ratio: "portrait",
    artist: "Artist",
    price: 849,
    description:
      "An enchanting depiction of a forest bathed in mystical light, evoking a sense of wonder.",
  },
  {
    title: "Modern Abstract",
    imageURL: "/img/logo.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 689,
    description:
      "A striking abstract piece with bold colors and dynamic shapes, perfect for contemporary spaces.",
  },
  {
    title: "Vintage Portrait",
    imageURL: "https://kalakarstudio.in/wp-content/uploads/2022/08/final2.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 769,
    description:
      "A vintage-style portrait that captures the essence of classical beauty and elegance.",
  },
  {
    title: "Cityscape",
    imageURL: "/img/artEye.png",
    ratio: "landscape",
    artist: "Artist",
    price: 715,
    description:
      "A detailed cityscape illustration that showcases the bustling energy of urban life.",
  },
  {
    title: "Taylor-Swift Sketch",
    imageURL:
      "https://instagram.fpat2-4.fna.fbcdn.net/v/t51.29350-15/277406972_932479847430780_5713732080138351171_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fpat2-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=O9z_a41PweAQ7kNvgG1lYdm&edm=AFg4Q8wBAAAA&ccb=7-5&ig_cache_key=MjgwMzMxNzI0MDIyNzcwODMyNA%3D%3D.2-ccb7-5&oh=00_AYAK6nB6fOpOheyTbIGUN4G-xcXimJ7aA8DA8hhlxt21CA&oe=668B4CB0&_nc_sid=0b30b7",
    ratio: "square",
    artist: "Ashutosh",
    price: 949,
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse.",
  },
  {
    title: "Floral Delight",
    imageURL: "https://img6.arthub.ai/64bd3aa9-b195.webp",
    ratio: "square",
    artist: "Artist",
    price: 669,
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
    description:
      "A serene illustration of a mountain retreat, capturing the tranquility and beauty of nature.",
  },
  {
    title: "Digital Dream",
    imageURL:
      "https://instagram.fpat2-3.fna.fbcdn.net/v/t51.29350-15/348258009_527959269369503_4043111816852907375_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE2OTIuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fpat2-3.fna.fbcdn.net&_nc_cat=111&_nc_ohc=OWkCWF1ZUX0Q7kNvgEgiqwn&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzEwODA4MTUzMDI4NjQwNjM4Mw%3D%3D.2-ccb7-5&oh=00_AYD9lrubp2a3vyyhqc_onxjuU_FxRdN7q4sPzOLItm7gvQ&oe=668AFE03&_nc_sid=8f1549",
    ratio: "portrait",
    artist: "Ashutosh",
    price: 976,
    description:
      "A digital artwork that blends futuristic elements with a dreamlike atmosphere.",
  },
  {
    title: "Golden Horizons",
    imageURL: "/img/artYellow.png",
    ratio: "landscape",
    artist: "Artist",
    price: 636,
    description:
      "A captivating landscape painting with golden hues, evoking a sense of warmth and tranquility.",
  },
  {
    title: "Acrylic Painting - Demon Slayer",
    imageURL:
      "https://instagram.fpat2-1.fna.fbcdn.net/v/t51.29350-15/304853628_1652786531781686_4907103564604972154_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fpat2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=uUd8oOZ0_2MQ7kNvgGKpFrr&edm=AFg4Q8wBAAAA&ccb=7-5&ig_cache_key=MjkxOTc4NTUxOTUyNjE2ODQ4MA%3D%3D.2-ccb7-5&oh=00_AYC1qcbRnOOC_EN8dmy8XQNKjRTlehqQYfO2V9D7jEoSNQ&oe=668B4DC6&_nc_sid=0b30b7",
    ratio: "landscape",
    artist: "Ashutosh",
    price: 761,
    description:
      "An intricate sketch of an urban scene, capturing the hustle and bustle of city life.",
  },
  {
    title: "Abstract Vision",
    imageURL: "/img/artEye.png",
    ratio: "landscape",
    artist: "Artist",
    price: 704,
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
    description:
      "A dreamy landscape painting that transports viewers to a serene and otherworldly place.",
  },
  {
    title: "Modern Portrait",
    imageURL: "/img/login.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 938,
    description:
      "A modern portrait with a minimalist approach, highlighting the subject's unique features.",
  },
  {
    title: "Line Art",
    imageURL:
      "https://scontent.cdninstagram.com/v/t51.29350-15/309469355_154275657071363_1576016343352287926_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=9fBeH86z4DAQ7kNvgGdYs3H&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MjkzNzA3MDEzMjk1NDcyMTQ1Mw%3D%3D.2-ccb7-5&oh=00_AYB6Z5Uk_1Fu-huBjbk7nUdF7Q6Ygqaqy2pAE1j0HUmRsw&oe=668B6CB4&_nc_sid=10d13b",
    ratio: "square",
    artist: "Ashutosh",
    price: 888,
    description:
      "A vibrant artwork bursting with color and energy, perfect for adding a pop of excitement to any space.",
  },
  {
    title: "Taylor-Swift Sketch",
    imageURL:
      "https://scontent.cdninstagram.com/v/t51.29350-15/409726386_182689278203203_5438135329010955896_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=SvaBXStxsG0Q7kNvgGfy6J3&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzI1NjYxMDYzNzc5NzQ5NjM2MQ%3D%3D.2-ccb7-5&oh=00_AYB8TLu9NCfhTDx6kuSls6PQlf14oPYeN0ZiuuJRrrNNeA&oe=668AEC41&_nc_sid=10d13b",
    ratio: "portrait",
    artist: "Ashutosh",
    price: 913,
    description:
      "A stunning sketch of Taylor Swift, capturing her likeness with intricate details and finesse. A graceful portrait capturing the elegance and poise of its subject with exquisite detail.",
  },
  {
    title: "Peaceful Moment",
    imageURL:
      "https://instagram.fpat2-2.fna.fbcdn.net/v/t51.29350-15/286127326_1021046591879026_8628488992768740112_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fpat2-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=OlX35_gmLLEQ7kNvgGQwkh6&edm=AFg4Q8wBAAAA&ccb=7-5&ig_cache_key=Mjg1Mzk4MjEyMjQ0NDk2OTQ4OA%3D%3D.2-ccb7-5&oh=00_AYBoFmvcoAhtPsXzDUKuvk28hVQrFvPJL8sYdnDod1eV6g&oe=668B507A&_nc_sid=0b30b7",
    ratio: "square",
    artist: "Ashutosh",
    price: 792,
    description:
      "A serene scene capturing a peaceful moment in time, inviting viewers to pause and reflect.",
  },
  {
    title: "Bold Statement",
    imageURL: "/img/register.jpeg",
    ratio: "square",
    artist: "Artist",
    price: 825,
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
        {artData.map((art, index) => (
          // eslint-disable-next-line
          <Dialog key={index}>
            <DialogTrigger className="mb-4">
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
                    <span className="hidden max-md:flex">Rs. {art.price}</span>
                  </DialogTitle>
                  <p className="text-gray-100 text-sm font-thin">
                    {art.description}
                  </p>
                  <p>Artist: {art.artist}</p>
                  <p className="max-md:hidden font-extrabold">
                    Rs. {art.price}
                  </p>
                  <Button className="w-full bg-white  text-gray-900 hover:text-white hover:shadow-inner hover:shadow-white">
                    Add to Cart
                  </Button>
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
