import { ErrorCard } from "@/components/cards/error-card"

export default function PageNotFound() {
  return (
    <main className="grid px-6 lg:px-8 h-[calc(100vh-200px)]">
        <ErrorCard
          title="Doc not found"
          description="The doc you are looking for does not exist"
          retryLink="/"
          retryLinkText="Go back"
        />
    </main>
  )
}
