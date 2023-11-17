
import { Shell } from "@/components/shells/shell";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
interface BecomeASellerProps {

}

export default async function BecomeASellerPage({ }: BecomeASellerProps) {
 
  return (
    <>
    <Shell variant="full" className="w-full">
           <div className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/bggenre/aurora.jpg')`, // No need for "/public/"
        width: '100%',
        height: '100%',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        paddingBottom: '44%',
      }}
    >
        <div className="text-center mb-10 absolute top-1/2">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Ready to give it a try and create a cosmic shopping experience?
          </h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Become a seller and let people dive into a world of vibrant and mesmerizing artwork.
          </p>
          <Button
            className="mt-6 px-8 py-2 rounded-full shadow-md"
            type="button"
            variant="default"
          >
            Start Selling
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <Shell variant="shop" className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Why Choose TunedSphere?</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Immerse yourself in a world of creativity and imagination.
          </p>
        </div>
        <div className="flex justify-around w-3/4 mt-10">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Unique Artworks</h3>
            <p className="mt-4 text-lg">
              Discover one-of-a-kind psychedelic art pieces.
            </p>
            <Button
              className="mt-6 px-8 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md"
              type="button"
              variant="default"
            >
              Explore Art
            </Button>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">Affordable Prices</h3>
            <p className="mt-4 text-lg">Experience art without breaking the bank.</p>
            <Button
              className="mt-6 px-8 py-2 text-white bg-green-500 hover-bg-green-600 rounded-full shadow-md"
              type="button"
              variant="default"
            >
              View Pricing
            </Button>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">Community of Artists</h3>
            <p className="mt-4 text-lg">Connect with talented artists and creators.</p>
            <Button
              className="mt-6 px-8 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-full shadow-md"
              type="button"
              variant="default"
            >
              Join Community
            </Button>
          </div>
        </div>
        <div className="w-full mt-10 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h2 className="text-4xl font-bol mb-4">Start Selling Your Psychedelic Art</h2>
          <Button
            className="px-8 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-md"
            type="button"
            variant="default"
          >
            Sell Your Art
          </Button>
        </div>
      </Shell>

      {/* Art Showcase Section */}
      <div className="w-full h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400">
        <div className="flex flex-col justify-center items-center h-full text-white space-y-10">
          <h1 className="text-6xl font-extrabold tracking-wide">
            Embark on a Psychedelic Journey
          </h1>
          <p className="text-2xl font-semibold">
            Experience mind-bending art like never before.
          </p>
          <div className="flex space-x-5">
            <Button className="border-white text-white hover:bg-pink-500 hover:text-black" variant="outline">
              Explore Artworks
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200" variant="secondary">
              Contact Us
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {/* Update images and descriptions for psychedelic art features */}
            <div className="flex flex-col items-center space-y-2">
              <img
                alt="Psychedelic Artwork 1"
                className="rounded-full"
                height="200"
                src="/psychedelic-artwork-1.jpg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <p className="mt-4 text-lg font-medium">Vibrant Colors</p>
              <p className="text-sm font-light">
                Explore art with an explosion of vibrant and surreal colors.
              </p>
              <Link className="underline text-white" href="#">
                Read More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <img
                alt="Psychedelic Artwork 2"
                className="rounded-full"
                height="200"
                src="/psychedelic-artwork-2.jpg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <p className="mt-4 text-lg font-medium">Abstract Expressions</p>
              <p className="text-sm font-light">
                Dive into the abstract world of artistic expressions.
              </p>
              <Link className="underline text-white" href="#">
                Read More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <img
                alt="Psychedelic Artwork 3"
                className="rounded-full"
                height="200"
                src="/psychedelic-artwork-3.jpg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <p className="mt-4 text-lg font-medium">Mind-Bending Designs</p>
              <p className="text-sm font-light">
                Discover designs that challenge your perception of reality.
              </p>
              <Link className="underline text-white" href="#">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
      </Shell>
    </>
  )
}
