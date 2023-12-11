import { ErrorCard } from "@/components/cards/error-card";

export default function PageNotFound() {
  return (
    <main className="grid px-6 lg:px-8 h-[calc(100vh-200px)] mx-auto">
      <ErrorCard
        title="Page not found"
        description="The Page you are looking for does not exist"
        retryLink="/docs"
        retryLinkText="Go back"
      />
    </main>
  );
}
