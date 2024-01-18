import Image from 'next/image'
import { Icon } from '@/components/icon'
import { type StoredFile } from '@/types'
import { AspectRatio } from '@/components/ui/aspect-ratio'
interface StoreBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[]
}

export function StoreBanner({ images }: StoreBannerProps) {
  return (
    <>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={`storeBanner-${image.id}`} className="max-h-[300px]">
            <AspectRatio
              ratio={21 / 9}
              asChild
              className="relative max-h-[300px]"
            >
              <span
                id="store-banner"
                className="relative flex shrink-0 justify-center overflow-hidden"
              >
                <Image
                  width={2400}
                  height={300}
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
  )
}
