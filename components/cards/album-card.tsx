import { slugify } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import { Card, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Icon } from '../icon'

interface AlbumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  title: string
  artist: string
  selectedAlbum?: string
  onClick?: () => void
  key?: string
}

export function AlbumCard({
  image,
  title,
  artist,
  selectedAlbum,
  onClick,
  key,
  ...props
}: AlbumCardProps) {
  return (
    <Card
      variant="album"
      key={key}
      className={cn(
        'mx-auto h-full w-full items-center align-middle',
        selectedAlbum,
      )}
      {...props}
    >
      <div className="group relative">
        <AspectRatio ratio={1}>
          <Image
            onClick={onClick}
            src={image}
            alt={title}
            fill
            className="cursor-pointer object-cover"
            key={`${title}_image`}
            loading="lazy"
          ></Image>
          <Button
            variant="link"
            className="absolute bottom-2 left-2 opacity-0 transition-opacity duration-300 hover:bg-none group-hover:opacity-100"
          >
            <Icon
              name="play-circle"
              className="h-8 w-8 rounded-full bg-muted text-primary hover:text-primary/80"
            />
          </Button>
        </AspectRatio>
      </div>
      <div className="mt-1 grid grid-flow-row">
        <CardTitle className="7xl:text-3xl 8xl:text-6xl cursor-default break-words text-sm font-medium text-texthigh sm:text-base">
          {title}
        </CardTitle>
        <Link href={`${slugify(artist)}`}>
          <p className="7xl:text-3xl 8xl:text-5xl cursor-default break-all text-sm text-textlow">
            {artist}
          </p>
        </Link>
      </div>
    </Card>
  )
}
