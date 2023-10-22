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
          <span
          id="store-icon"
          key={index} className="relative shrink-0 flex justify-center w-20 h-20 overflow-hidden rounded-full border-border/30 border">
            <Image
              id="store-icon-image"
              width={80}
              height={80}
              src={image.url} // Use `image.url` to access the URL property
              alt={image.name}
              className="aspect-square h-full w-full object-cover"
              priority
              quality={100}
            />
          </span>
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