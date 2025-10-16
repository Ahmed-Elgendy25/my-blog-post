import Image from "next/image";
function Banner({ banner }: { banner: string }) {
  return (
    <div className="col-span-12 relative  w-auto h-[50rem]   ">
      <Image
        src={banner}
        alt="Mr.Robot"
        fill={true}
        objectFit="cover"
        priority={true}
        className="mx-auto rounded-lg"
        unoptimized={true}
      />
    </div>
  );
}

export default Banner;
