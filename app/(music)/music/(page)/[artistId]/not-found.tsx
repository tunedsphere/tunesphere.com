import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function ArtistPageNotFound() {
  return (
    <Shell variant="centered">
      <ErrorCard
        title="Artist not found"
        description="We may have dificulties loading the Artist page"
        retryLink="/music"
        retryLinkText="Go Back to Music"
      />
    </Shell>
  )
}
