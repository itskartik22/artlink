"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuX } from "react-icons/lu";
import S3UploadImage from "@/components/upload/S3UploadImage";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  width: z.coerce.number().min(0, "Width must be a positive number").optional(),
  height: z.coerce.number().min(0, "Height must be a positive number").optional(),
  depth: z.coerce.number().min(0, "Depth must be a positive number").optional(),
  medium: z.string().min(1, "Medium is required"),
  category: z.string().min(1, "Category is required"),
  style: z.string().min(1, "Style is required"),
});

const categories = [
  "Painting",
  "Sculpture",
  "Digital Art",
  "Photography",
  "Drawing",
  "Mixed Media",
  "Other",
];

const mediums = [
  "Oil",
  "Acrylic",
  "Watercolor",
  "Digital",
  "Pencil",
  "Charcoal",
  "Clay",
  "Bronze",
  "Mixed Media",
  "Other",
];

const styles = [
  "Abstract",
  "Realistic",
  "Impressionist",
  "Modern",
  "Contemporary",
  "Traditional",
  "Pop Art",
  "Other",
];

interface ProductFormProps {
  onSuccess?: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 1,
      medium: "",
      category: "",
      style: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (imageUrls.length < 1) {
        toast.error("Please upload at least one image");
        return;
      }

      if (imageUrls.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      const dimensions = {
        width: values.width || null,
        height: values.height || null,
        depth: values.depth || null,
      };

      console.log("imageUrls", imageUrls);
      console.log("dimensions", dimensions);
      console.log("values", values);
      

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          images: imageUrls,
          dimensions,
          medium: values.medium,
          category: values.category,
          style: values.style,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully");
      onSuccess?.();
      form.reset();
      setImageUrls([]);
    } catch (error) {
      toast.error("Something went wrong" + error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Add New Artwork</h1>
        <p className="text-gray-500">Fill in the details of your artwork</p>
      </div>

      <div className="space-y-4 mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Images (Upload up to 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeImage(index)}
              >
                <LuX className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {imageUrls.length < 5 && (
            <S3UploadImage
              onUpload={(url) => setImageUrls((prev) => [...prev, url])}
              className="aspect-square"
            >
              <div className="flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer aspect-square hover:border-gray-400 transition-colors">
                <span className="text-gray-600">+ Add Image</span>
              </div>
            </S3UploadImage>
          )}
        </div>
        {imageUrls.length === 0 && (
          <p className="text-sm text-red-500">At least one image is required</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter artwork name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your artwork"
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medium</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medium" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mediums.map((medium) => (
                        <SelectItem key={medium} value={medium}>
                          {medium}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {styles.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depth (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mb-4" disabled={loading}>
            {loading ? "Creating..." : "Create Artwork"}
          </Button>
        </form>
      </Form>
    </div>
  );
} 