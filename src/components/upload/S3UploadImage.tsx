"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuUpload } from "react-icons/lu";
import { toast } from "sonner";

interface S3UploadImageProps {
  onUpload: (url: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function S3UploadImage({ onUpload, children, className }: S3UploadImageProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/s3", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to upload image");
      }

      const { url } = await response.json();
      onUpload(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="s3-image-upload"
        disabled={uploading}
      />
      <label htmlFor="s3-image-upload">
        {children || (
          <Button disabled={uploading} type="button">
            <LuUpload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        )}
      </label>
    </div>
  );
} 