"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Artwork {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export function ArtworkVerification() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch("/api/admin/artworks");
      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      toast.error("Failed to fetch artworks");
    }
  };

  const handleVerification = async (artworkId: string, status: string, reason?: string) => {
    try {
      const response = await fetch(`/api/admin/artworks/${artworkId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, rejectionReason: reason }),
      });

      if (response.ok) {
        toast.success(`Artwork ${status} successfully`);
        fetchArtworks();
        setSelectedArtwork(null);
        setRejectionReason("");
      } else {
        toast.error(`Failed to ${status} artwork`);
      }
    } catch (error) {
      console.error("Error updating artwork status:", error);
      toast.error("Failed to update artwork status");
    }
  };

  const filteredArtworks = artworks.filter((artwork) => {
    return (
      artwork.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artwork</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtworks.map((artwork) => (
              <TableRow key={artwork.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {artwork.images[0] && (
                      <Image
                        src={artwork.images[0]}
                        alt={artwork.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    )}
                    <span>{artwork.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{artwork.user?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {artwork.user?.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>${artwork.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      artwork.status === "approved"
                        ? "default"
                        : artwork.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {artwork.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedArtwork(artwork)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Artwork Details</DialogTitle>
                        <DialogDescription>
                          Review the artwork and take appropriate action
                        </DialogDescription>
                      </DialogHeader>
                      {selectedArtwork && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">Artwork Information</h3>
                              <p>Name: {selectedArtwork.name}</p>
                              <p>Price: ${selectedArtwork.price}</p>
                              <p>Status: {selectedArtwork.status}</p>
                              <p>Description: {selectedArtwork.description}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-semibold">Artist Information</h3>
                              <p>Name: {selectedArtwork.user?.name}</p>
                              <p>Email: {selectedArtwork.user?.email}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedArtwork.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt={`${selectedArtwork.name} - ${index + 1}`}
                                width={200}
                                height={200}
                                className="rounded-md object-cover"
                              />
                            ))}
                          </div>
                          {selectedArtwork.status === "pending" && (
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Rejection reason (if rejecting)"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleVerification(
                                      selectedArtwork.id,
                                      "rejected",
                                      rejectionReason
                                    )
                                  }
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleVerification(selectedArtwork.id, "approved")
                                  }
                                >
                                  Approve
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 