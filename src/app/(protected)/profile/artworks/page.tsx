import UploadImage from "@/components/upload/UploadImage";

const page = () => {
  return (
    <div className="relative w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">My Artworks</h2>
        <UploadImage />
      </div>
    </div>
  );
};

export default page;
