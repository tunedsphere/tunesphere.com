import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "./page-header"
export function StartYourJourney () {

    return (
        <>
<section id="ready-to-start" aria-labelledby="ready-to-start-label" className="text-center mt-8 py-8">
  <PageHeader variant="shop">
  <PageHeaderHeading variant="shop" className="">Ready to Start Your Journey?</PageHeaderHeading>
  <PageHeaderDescription className="text-xl">
    Create Your Psychedelics Store Today and Explore New Horizons!
  </PageHeaderDescription>
  <PageHeaderHeading variant="shop" className="text-2xl font-semibold mb-4 ">How to Get Started:</PageHeaderHeading>
  </PageHeader>
</section>

<section id="how-to-get-started" aria-labelledby="how-to-get-started-label" className="text-center my-8 justify-content max-w-7xl mx-auto grid sm:grid-cols-3 py-8">
<div className="p-4">
      <PageHeaderHeading variant="shop" className="text-lg font-semibold py-2">
        **Step 1: Sign Up for an Account**
      </PageHeaderHeading>
      <PageHeaderDescription className="text-base">
        Begin your journey by signing up for an account. It's quick, easy, and completely free. Join our community of like-minded individuals who are dedicated to promoting safe and responsible psychedelic use.
      </PageHeaderDescription>
      </div>
        <div className="p-4">
      <PageHeaderHeading variant="shop" className="text-lg font-semibold py-2">
        **Step 2: Set Up Your Store**
      </PageHeaderHeading>
      <PageHeaderDescription className="text-base">
        Once you're logged in, it's time to customize your store. Choose a unique name, add a captivating logo, and craft a compelling store description. Personalize your storefront to reflect your vision and values, creating an inviting space for customers to explore the world of psychedelics.
      </PageHeaderDescription>
      </div>
        <div className="p-4">
      <PageHeaderHeading variant="shop" className="text-lg font-semibold py-2">
        **Step 3: Start Selling Your Products**
      </PageHeaderHeading>
      <PageHeaderDescription className="text-base">
        With your store set up, you're now ready to introduce your products to the world. Share your knowledge and passion for psychedelics through thoughtful descriptions and engaging content. Build trust with your customers by providing accurate information and ensuring the highest quality products.
      </PageHeaderDescription>
     </div>
    </section>
</>
 )
} 