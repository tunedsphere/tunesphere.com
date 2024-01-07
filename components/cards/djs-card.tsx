import { slugify } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import { Card, CardTitle } from '../ui/card'
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
        'mx-auto h-full w-full cursor-pointer items-center align-middle',
        selectedAlbum,
      )}
      {...props}
      onClick={onClick}
    >
      <AspectRatio ratio={1}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          key={`${title}_image`}
          loading="lazy"
        ></Image>
      </AspectRatio>
      <div className="mt-1 grid grid-flow-row">
        <CardTitle className="7xl:text-3xl 8xl:text-6xl cursor-pointer break-words text-sm font-bold text-texthigh hover:text-theme sm:text-base">
          {title}
        </CardTitle>
        <Link href={`${slugify(artist)}`}>
          <p className="7xl:text-3xl 8xl:text-5xl cursor-pointer break-all text-sm text-textlow hover:text-theme">
            {artist}
          </p>
        </Link>
      </div>
    </Card>
  )
}
