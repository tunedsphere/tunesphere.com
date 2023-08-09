import { Shell } from "@components/shells/shell"

import { ErrorCard } from "@/components/error-card"

export default function PageNotFound() {
  return (
    <Shell>
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  )
}
