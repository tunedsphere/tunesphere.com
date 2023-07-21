import { ErrorCard } from "@/components/error-card"


export default function PageNotFound() {
  return (
    <main className="grid min-h-full h-screen bg-white px-6 lg:px-8">
    <section className="section-max-width">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
        </section>
</main>
  )
}
