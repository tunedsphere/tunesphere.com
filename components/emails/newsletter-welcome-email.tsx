import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface NewsletterWelcomeEmailProps {
  firstName?: string
  fromEmail: string
  token: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""

// For previewing we need to put images in the .react-email/public folder
// In production we need to put images in the root public folder
const newsletterImages = [
  {
    src: `${baseUrl}/images/newsletter/the-tuned-sphere.webp`,
    alt: "The TunedSphere",
    credit: "AUMANOID",
    creditUrl:
      "",
    description: "We'll keep you tuned on the journey through the enigmatic and ever-evolving TunedSphere Platform with news, events, and more. Stay up to date with the latest trends. Thanks for Tuning In!"
  },
]

export default function NewsletterWelcomeEmail({
  firstName = "there",
  fromEmail,
  token,
}: NewsletterWelcomeEmailProps) {
  const previewText = `Hi ${firstName}, welcome to TunedSphere!`

  return (
    <Html>
      <Head>
        <title>TunedSphere Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                TunedSphere
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to TunedSphere!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                {`We're`} so glad {`you're`} here. {`We're`} excited to share
                our passion for Art & Music with you.
              </Text>
              <Text className="m-0 text-center text-base">
                {`We'll`} be sending you a newsletter every month.
              </Text>
            </Section>
            <Section className="mt-6">
              {newsletterImages.map((item) => (
                <Row key={item.alt} className="mt-10">
                  <Img
                    src={item.src}
                    alt={item.alt}
                    height={424}
                    width={800}
                    className="aspect-video w-full object-cover"
                  />
                  <Text className="mb-0 mt-2 text-center text-zinc-400">
                    Photo by{" "}
                    <Link
                      href={item.creditUrl}
                      className="text-blue-500 underline"
                    >
                      {item.credit}
                    </Link>
                  </Text>
                  <Text className="mb-0 mt-4 text-center text-base">
                    {item.description}
                  </Text>
                </Row>
              ))}
            </Section>
            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {`We're`} looking forward to seeing you around! If you have any
                questions, please {`don't`} hesitate to reach out to us at{" "}
                <Link
                  href={`mailto:${fromEmail}`}
                  className="text-blue-500 underline"
                >
                  {fromEmail}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">
                @ TunedSphere {new Date().getFullYear()}
              </Text>
              <Text className="m-0">
                If you no longer want to receive these emails, you can{" "}
                <Link
                  href={`${baseUrl}/email-preferences?token=${token}`}
                  className="text-blue-500 underline"
                >
                  Unsubscribe here
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
