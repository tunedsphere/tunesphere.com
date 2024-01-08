import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

export function WhatIsTunedSphere() {
  return (
    <section
      id="shop-page-whatistunedsphere"
      aria-labelledby="shop-page-whatistunedsphere"
      className="items-center py-12"
    >
      <PageHeader
        id="shop-page-whatistunedsphere-header"
        aria-labelledby="shop-page-whatistunedsphere-header-heading"
        className="px-4"
      >
        <PageHeaderHeading
          size="lg"
          className="px-4 py-6 text-center tracking-tighter"
        >
          What is TunedSphere?
        </PageHeaderHeading>
        <PageHeaderDescription
          size="lg"
          className="mx-auto text-center text-textlow"
        >
          Elevate your Shopping & Creativness
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center pt-6">
        <div className="w-full p-4 md:w-1/3 ">
          <PageHeaderHeading size="sm" className="pb-4">
            TunedSphere
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            TunedSphere is your first destination for an immersive journey into
            the world of psychedelic art. We are happy to introduce an
            E-Commerce shop, and hope every One will find a wide array of
            captivating, mind-expanding artwork that transcends boundaries and
            invites you to explore the depths of creativity and consciousness.
            Here's what sets us apart:
          </PageHeaderDescription>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <PageHeaderHeading size="sm" className="pb-4">
            Curate the Extraordinary
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            At TunedSphere, we don't just sell art; we curate experiences. Our
            platform is a haven for independent creators and visionary artists
            who pour their hearts and souls into crafting psychedelic
            masterpieces. When you explore our collection, you're not just
            buying art; you're connecting with the minds behind it. From
            mesmerizing paintings to mind-bending digital creations, our
            carefully selected pieces transport you to alternate realities.
          </PageHeaderDescription>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <PageHeaderHeading size="sm" className="pb-4">
            A Cosmic Shopping Experience
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            We're not your typical e-commerce shop. Like Etsy, we believe in the
            power of community. TunedSphere brings together artists,
            enthusiasts, and collectors in a cosmic marketplace where creativity
            knows no bounds. There's no TunedSphere warehouse; instead, you'll
            find a universe of one-of-a-kind creations that resonate with the
            psychedelic realm.
          </PageHeaderDescription>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <PageHeaderHeading size="sm" className="pb-4">
            Privacy and Trust
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            Your trust is paramount to us. Just as the universe holds its
            secrets, we value your privacy above all else. Our dedicated team
            ensures that your personal information is treated with the utmost
            care and respect. And if you ever need assistance or have questions
            about your order, we're always here to provide stellar support. Your
            journey with TunedSphere is guided by the stars.
          </PageHeaderDescription>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <PageHeaderHeading size="sm" className="pb-4">
            A Positive Impact
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            TunedSphere is more than just an e-commerce platform; it's a
            movement. We're committed to making a positive impact on the
            psychedelic art community, small businesses, and the planet. With
            every purchase, you support independent artists and contribute to
            the flourishing of creative expression. Together, we're expanding
            minds and fostering positive change.
          </PageHeaderDescription>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <PageHeaderHeading size="sm" className="pb-4">
            Welcome to TunedSphere
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-textlow">
            So, whether you're a seasoned psychonaut or a curious explorer,
            TunedSphere invites you to discover, connect, and elevate your
            psychedelic art experience. Join us on this cosmic journey, and let
            the vibrations of creativity and consciousness guide you through a
            universe of artistry like no other. Welcome to TunedSphere, where
            the art of the mind takes center stage.
          </PageHeaderDescription>
        </div>
      </div>
    </section>
  )
}
