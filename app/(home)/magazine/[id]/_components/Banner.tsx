import Image from "next/image";

function Banner({ banner }: { banner: string }) {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={banner}
          alt="Article Banner"
          width={1200}
          height={675}
          className="w-full h-auto object-contain"
          unoptimized={true}
          priority={true}
        />
      </div>
    </div>
  );
}

export default Banner;
