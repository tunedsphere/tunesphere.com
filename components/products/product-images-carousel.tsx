'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { StoredFile } from '@/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

interface ProductImagesCarouselProps {
  images: StoredFile[]
}

export function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div
      aria-label="Product image carousel"
      className="grid w-full grid-cols-12 justify-between gap-2 md:w-1/2"
    >
      <div className="col-span-2 col-start-1 ">
        {/* Preview all images of the carousel Here */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer p-1 ${index === currentImageIndex ? 'border-1 ' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.url}
              alt={`Product Image ${index + 1}`}
              className="aspect-square"
              width={120}
              height={120}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
      <div className="col-span-10 col-start-3 px-8">
        <Carousel className="">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="aspect-square"
                    width={600}
                    height={600}
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
