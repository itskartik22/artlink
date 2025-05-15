import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto py-10 px-4 ">
      {/* Header */}
      <div className="flex items-center gap-6 mb-10">
        <Image
          src="https://images.unsplash.com/photo-1612760721786-a42eb89aba02?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={128}
          height={128}
          alt="Sketch Cat"
          className="w-32 h-32 object-contain rounded-lg shadow"
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight">ARTLINK</h1>
          <p className="text-gray-600 mt-2">Lets connect the local talents.</p>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-12">
        {/* Sketch */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Sketch</h2>
            <p className="text-gray-600 mb-4">
              A subheading for this section, as long or as short as you like
            </p>
            <Button variant="default">Button</Button>
          </div>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
            alt="Sketch"
            className="w-full md:w-72 h-48 object-cover rounded-lg shadow"
          />
        </div>

        {/* Painting */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Painting</h2>
            <p className="text-gray-600 mb-4">
              Another subheading—maybe it&apos;s related to the image on the
              left, or the button below
            </p>
            <Button variant="default">Button</Button>
          </div>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Painting"
            className="w-full md:w-72 h-48 object-cover rounded-lg shadow"
          />
        </div>

        {/* Craft */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Craft</h2>
            <p className="text-gray-600 mb-4">
              A subheading for this section, as long or as short as you like
            </p>
            <Button variant="default">Button</Button>
          </div>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
            alt="Sketch"
            className="w-full md:w-72 h-48 object-cover rounded-lg shadow"
          />
        </div>
      </div>
    </section>
  );
}
