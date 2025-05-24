"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CommissionForm from "@/components/forms/CommissionForm";
import { useRouter } from "next/navigation";
import { LuPencil, LuImage, LuMonitor, LuClock, LuDollarSign } from "react-icons/lu";
import Image from "next/image";

// Temporary mock data for artists
const mockArtists = {
  sketch: [
    {
      id: "1",
      name: "John Doe",
      image: "/placeholder.jpg",
      available: true,
      rateType: "per_hour",
      rate: 50,
      tags: ["Portrait", "Character Design"],
      completedWorks: 45,
    },
    // Add more sketch artists...
  ],
  painting: [
    {
      id: "2",
      name: "Jane Smith",
      image: "/placeholder.jpg",
      available: true,
      rateType: "per_work",
      rate: 500,
      tags: ["Oil Painting", "Landscape"],
      completedWorks: 32,
    },
    // Add more painting artists...
  ],
  digitalArt: [
    {
      id: "3",
      name: "Mike Johnson",
      image: "/placeholder.jpg",
      available: false,
      rateType: "per_hour",
      rate: 75,
      tags: ["Illustration", "Concept Art"],
      completedWorks: 60,
    },
    // Add more digital artists...
  ],
};

interface ArtistCardProps {
  artist: typeof mockArtists.sketch[0];
  onCommission: () => void;
}

function ArtistCard({ artist, onCommission }: ArtistCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-lg">{artist.name}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant={artist.available ? "default" : "secondary"}>
                {artist.available ? "Available" : "Busy"}
              </Badge>
              <Badge variant="outline">
                {artist.completedWorks} works
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {artist.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          {artist.rateType === "per_hour" ? (
            <>
              <LuClock className="h-4 w-4" />
              <span>₹{artist.rate}/hour</span>
            </>
          ) : (
            <>
              <LuDollarSign className="h-4 w-4" />
              <span>From ₹{artist.rate}</span>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onCommission}>
          Commission Artist
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CommissionsPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Commission Artwork</h1>
            <p className="text-xl text-gray-300 mb-6">
              Bring your vision to life with our talented artists. From concept to creation, we'll help you create the perfect piece.
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <LuPencil className="mr-2 h-4 w-4" />
                Sketch Artists
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <LuImage className="mr-2 h-4 w-4" />
                Painters
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <LuMonitor className="mr-2 h-4 w-4" />
                Digital Artists
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-16">
        {/* Sketch Artists Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Sketch Artists</h2>
              <p className="text-muted-foreground">Traditional sketching and drawing specialists</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockArtists.sketch.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onCommission={() => setOpen(true)}
              />
            ))}
          </div>
        </section>

        {/* Painters Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Painters</h2>
              <p className="text-muted-foreground">Masters of traditional painting mediums</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockArtists.painting.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onCommission={() => setOpen(true)}
              />
            ))}
          </div>
        </section>

        {/* Digital Artists Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Digital Artists</h2>
              <p className="text-muted-foreground">Creative digital art specialists</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockArtists.digitalArt.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onCommission={() => setOpen(true)}
              />
            ))}
          </div>
        </section>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
          <CommissionForm
            onSuccess={() => {
              setOpen(false);
              router.refresh();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 