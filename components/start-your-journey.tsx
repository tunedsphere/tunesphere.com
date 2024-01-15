import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from './page-header'
export function StartYourJourney() {
  return (
    <>
      <section
        id="ready-to-start"
        aria-labelledby="ready-to-start-label"
        className="mt-8 bg-primary/10 px-2 py-16 text-center"
      >
        <PageHeader variant="shop">
          <PageHeaderHeading variant="shop" className="">
            Ready to Start Your Journey?
          </PageHeaderHeading>
          <PageHeaderDescription className="text-xl">
            Create Your Store Today and Explore New Horizons!
          </PageHeaderDescription>
        </PageHeader>
        <PageHeader variant="shop">
          <PageHeaderHeading
            variant="shop"
            className="mb-4 mt-16 text-2xl font-semibold"
          >
            How to Get Started:
          </PageHeaderHeading>
        </PageHeader>
        <div
          id="how-to-get-started"
          aria-labelledby="how-to-get-started-label"
          className="justify-content mx-auto grid max-w-7xl py-8 text-center sm:grid-cols-3"
        >
          <div className="p-4">
            <PageHeaderHeading
              variant="shop"
              className="py-2 text-lg font-semibold"
            >
              **Step 1: Sign Up for an Account**
            </PageHeaderHeading>
            <PageHeaderDescription className="text-base">
              Begin your journey by signing up for an account. It's quick, easy,
              and completely free. Join our community of like-minded individuals
              who are dedicated to promoting safe and responsible psychedelic
              use.
            </PageHeaderDescription>
          </div>
          <div className="p-4">
            <PageHeaderHeading
              variant="shop"
              className="py-2 text-lg font-semibold"
            >
              **Step 2: Set Up Your Store**
            </PageHeaderHeading>
            <PageHeaderDescription className="text-base">
              Once you're logged in, it's time to customize your store. Choose a
              unique name, add a captivating logo, and craft a compelling store
              description. Personalize your storefront to reflect your vision
              and values, creating an inviting space for customers to explore
              the world of psychedelics.
            </PageHeaderDescription>
          </div>
          <div className="p-4">
            <PageHeaderHeading
              variant="shop"
              className="py-2 text-lg font-semibold"
            >
              **Step 3: Start Selling Your Products**
            </PageHeaderHeading>
            <PageHeaderDescription className="text-base">
              With your store set up, you're now ready to introduce your
              products to the world. Share your knowledge and passion for
              psychedelics through thoughtful descriptions and engaging content.
              Build trust with your customers by providing accurate information
              and ensuring the highest quality products.
            </PageHeaderDescription>
          </div>
        </div>
      </section>
    </>
  )
}
