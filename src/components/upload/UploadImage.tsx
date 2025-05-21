"use client";
import { CldUploadWidget } from "next-cloudinary";

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
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
