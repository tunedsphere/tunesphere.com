import { slugify } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface AlbumCoverCardProps {
  image: string
  title: string
  artist: string
  selectedAlbum?: string
  onClick?: () => void
  key?: string
}

export function AlbumCoverCard({
  image,
  title,
  artist,
  selectedAlbum,
  onClick,
  key,
}: AlbumCoverCardProps) {
  return (
    <div
      key={key}
      className={`relative mx-auto cursor-pointer items-center align-middle ${selectedAlbum}`}
      onClick={onClick}
    >
      <Image
        width={400}
        height={400}
        src={image}
        alt={title}
        className="aspect-square grow-0 cursor-pointer rounded-md border  "
      ></Image>
      <div className="mt-1 grid grid-flow-row">
        <h1 className="7xl:text-3xl 8xl:text-6xl cursor-pointer break-words text-sm font-bold text-texthigh hover:text-theme sm:text-base">
          {title}
        </h1>
        <Link href={`${slugify(artist)}`}>
          <p className="7xl:text-3xl 8xl:text-5xl cursor-pointer break-all text-sm text-textlow hover:text-theme">
            {artist}
          </p>
        </Link>
      </div>
    </div>
  )
}
