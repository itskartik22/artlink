import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="h-[1080px] w-full">
        <div>
          <Image src={"/img/home/cat1.svg"} alt="cat" width={1000} height={1000} className="bg-blend-soft-light" />
        </div>
      </div>
    </main>
  );
}
