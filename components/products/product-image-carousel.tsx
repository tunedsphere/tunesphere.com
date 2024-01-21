'use client'

import * as React from 'react'
import Image from 'next/image'
import { type StoredFile } from '@/types'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import useEmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from 'embla-carousel-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'
import { delayProductImageCarousel } from '@/lib/delays'

interface ProductImageCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[]
  options?: EmblaOptionsType
}

export async function ProductImageCarousel({
  images,
  options,
  ...props
}: ProductImageCarouselProps) {
  await new Promise((resolve) => setTimeout(resolve, delayProductImageCarousel))

  return (
    <>
      <ProductCarousel images={images} options={options} {...props} />
    </>
  )
}

interface ProductCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[]
  options?: EmblaOptionsType
}

export function ProductCarousel({
  images,
  options,
  ...props
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        scrollNext()
      }
    },
    [scrollNext, scrollPrev],
  )

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  if (images.length === 0) {
    return (
      <div
        aria-label="Product Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="flex aspect-square h-full w-full flex-1 items-center justify-center bg-secondary"
      >
        <Icon
          name="placeholder"
          className="h-9 w-9 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div
      aria-label="Product image carousel"
      className={cn('grid w-full grid-cols-12 gap-2 md:w-1/2')}
      {...props}
    >
      <div className="col-span-2 col-start-1 grid grid-flow-row">
        {images.length > 1 ? (
          <div className="">
            <Button
              variant="outline"
              size="icon"
              className="mr-0.5 aspect-square h-7 w-7 rounded-full sm:mr-2 sm:h-8 sm:w-8"
              disabled={prevBtnDisabled}
              onClick={scrollPrev}
            >
              <Icon
                name="chevron-left"
                className="h-3 w-3 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Previous slide</span>
            </Button>
            {images.map((image, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className={cn(
                  'group relative aspect-square  h-20 w-20 rounded-none shadow-sm hover:bg-transparent focus-visible:ring-foreground',
                  i === selectedIndex && 'ring-1 ring-foreground',
                )}
                onClick={() => scrollTo(i)}
                onKeyDown={handleKeyDown}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="aspect-square"
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <span className="sr-only">
                  Slide {i + 1} of {images.length}
                </span>
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="ml-0.5 aspect-square h-7 w-7 rounded-full sm:ml-2 sm:h-8 sm:w-8"
              disabled={nextBtnDisabled}
              onClick={scrollNext}
            >
              <Icon
                name="chevron-right"
                className="h-3 w-3 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        ) : null}
      </div>
      <div
        ref={emblaRef}
        className="col-span-10 col-start-3 overflow-hidden px-8 "
      >
        <div
          className="-ml-4 flex touch-pan-y"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {images.map((image, index) => (
            <div
              className="flex-full relative max-h-[400px] min-w-0 justify-center rounded-lg pl-4"
              key={index}
            >
              <AspectRatio ratio={1}>
                <Image
                  aria-label={`Slide ${index + 1} of ${images.length}`}
                  role="group"
                  key={index}
                  aria-roledescription="slide"
                  src={image.url}
                  alt={image.name}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="mx-auto object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`

function ImageCarouselSkeleton() {
  return <div className={`h-20 bg-card ${shimmer}`} />
}

export function ProductImageSkeleton() {
  return (
    <section
      aria-label="Product image carousel"
      className="grid w-full grid-cols-12 gap-2 md:w-1/2"
      id="featured-stores"
      aria-labelledby="featured-stores-heading"
    >
      <div className="col-span-2 col-start-1 grid h-[80%] grid-flow-row">
        <ImageCarouselSkeleton />
        <ImageCarouselSkeleton />
        <ImageCarouselSkeleton />
        <ImageCarouselSkeleton />
        <ImageCarouselSkeleton />
      </div>
      <div className="col-span-10 col-start-3">
        <div
          className={`flex-full relative h-full  max-h-[400px] w-full min-w-0 justify-center rounded-lg bg-card pl-4 ${shimmer}`}
        />
      </div>
    </section>
  )
}
