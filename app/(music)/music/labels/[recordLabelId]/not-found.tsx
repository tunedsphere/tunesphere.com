import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function RecordLabelNotFound() {
  return (
    <Shell variant="centered">
      <ErrorCard
        title="Label not found"
        description="The Label your looking for, is or may be not accessible right now or hasn't been added yet"
        retryLink="/music/labels"
        retryLinkText="Go back searching labels"
      />
    </Shell>
  )
}
