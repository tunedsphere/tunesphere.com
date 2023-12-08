import Image from "next/image";
import { Icon } from "@/components/icon";
import { type StoredFile } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
interface StoreBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
}

export function StoreBanner({ images }: StoreBannerProps) {
  return (
    <>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={`storeBanner-${image.id}`} className="max-h-[500px]">
            <AspectRatio
              ratio={21 / 9}
              asChild
              className="max-h-[500px] relative"
            >
              <span
                id="store-banner"
                className="overflow-hidden relative shrink-0 flex justify-center"
              >
                <Image
                  width={2400}
                  height={400}
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
            </AspectRatio>
          </div>
        ))
      ) : (
        <div
          aria-label="Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex h-full w-full items-center justify-center bg-secondary"
        >
          <Icon
            name="placeholder"
            className="h-9 w-9 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
