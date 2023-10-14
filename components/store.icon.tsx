import Image from "next/image";
import { type StoredFile } from "@/types"
import { Icons } from "@/components/icons"
interface StoreIconProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
}

export function StoreIcon({ images }: StoreIconProps) {
  return (
    <>
      {images?.length ? (
        images.map((image, index) => (
          <div 
          id="store-icon"
          key={index} className="relative overflow-hidden w-[120px] h-[120px] w-120 h-120 rounded-md mr-4">
            <Image
              id="store-icon-image"
              width={120}
              height={120}
              src={image.url} // Use `image.url` to access the URL property
              alt={image.name}
              className=""
              priority
            />
          </div>
        ))
      ) : (
        <div
          aria-label="Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex h-full w-full items-center justify-center bg-secondary"
        >
          <Icons.placeholder
            className="h-9 w-9 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}