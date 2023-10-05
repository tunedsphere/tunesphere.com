import Image from "next/image";
import { Icons } from "./icons";
import { type StoredFile } from "@/types";

interface StoreBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
}

export function StoreBanner({ images }: StoreBannerProps) {
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="max-w-screen">
          <Image
            src={image.url} // Use `image.url` to access the URL property
            alt={image.name} // Use `image.name` to access the name property
            key={index}
            width={800}
            height={400}
            className="min-w-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </>
  );
}