import Image from "next/image";
import { Icons } from "./icons";
import { type StoredFile } from "@/types";

interface StoreBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
}

export function StoreBanner({ images, className }: StoreBannerProps) {
  return (
    <>
      {images.map((image) => (
        <div className="overflow-hidden"
              key={image.id}>
          <Image
          width={2400}
          height={400}
          src={image.url} // Use `image.url` to access the URL property
          alt={image.name}
          className="top-0 left-0 w-full h-full object-cover max-h-[400px]"
          priority
          />
        </div>
      ))}
    </>
  );
}