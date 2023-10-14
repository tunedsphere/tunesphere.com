import { Shell } from "@/components/shells/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function MusicPage() {
  return (
    <>
      <div className="music-grid-gradient -z-10"></div>
      <Shell className="mt-40">
      <ErrorCard
        title="Coming Up Soon"
        description="The Music App you are looking for, is in work in progress"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
    </>
  )
}
