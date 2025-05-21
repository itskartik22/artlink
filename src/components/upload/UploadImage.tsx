"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";

const UploadImage = () => {
  return (
    <CldUploadWidget
      uploadPreset="artitem"
      onSuccess={({ event, info }) => {
        console.log("event", event);
        console.log("info", info);
      }}
    >
      {({ open }) => {
        return <Button className="w-fit" onClick={() => open()}>Upload an artwork</Button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
