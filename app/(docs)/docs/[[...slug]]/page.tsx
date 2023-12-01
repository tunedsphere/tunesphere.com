import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import "@/styles/mdx.css"
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { siteConfig } from "@/configs/site"
import { absoluteUrl } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Mdx } from "@/components/mdx/mdx-components"


import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { DocsPager } from "@/components/pagers/docs-pager"
import { Shell } from "@/components/shells/shell"
import { DashboardTableOfContents } from "@/components/toc"
import { getTableOfContents } from "@/lib/toc"
interface DocsPageProps {
  params: {
    slug: string[]
    
  }
}
// eslint-disable-next-line @typescript-eslint/require-await
async function getDocFromParams(params: DocsPageProps["params"]) {
  const slug = params.slug?.length ? params.slug.join("/") : "";
  console.log("Current Slug:", slug);
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  
  if (!doc) {
    return null; // Return early if doc is not found
  }
  
  return doc;
}
export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)
  if (!doc) {
    return {};
  }
  // Ensure doc.title is defined before accessing it
  const title = doc.title ?? "Default Title";
  const url = env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("title", title) // Use the title variable here
  ogUrl.searchParams.set("type", siteConfig.name)
  ogUrl.searchParams.set("mode", "light")
  return {
    title,
    description: doc.description,
    openGraph: {
      title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title, // Use the title variable here
        },
      ],
    },
  }
}
// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<DocsPageProps["params"][]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}
export default async function PagePage({ params }: DocsPageProps) {
  const doc = await getDocFromParams(params)
  if (!doc) {
    notFound()
    return null // Return early if doc is not found
  }
  // Remove the /pages prefix from the slug
  const formattedDoc = {
    ...doc,
    slug: doc.slug.replace(/^\/docs/, "/docs"),
  }
  const formattedDocs = allDocs.map((doc) => ({
    ...doc,
    slug: doc.slug.replace(/^\/docs/, "/docs"),
  }))



  const toc = await getTableOfContents(doc.body.raw)
  return (
    <Shell as="article" variant="markdown">
    <div className="right-gradient fixed z-10"> </div>
      <div className="mx-auto w-full min-w-0">
        <PageHeader className="pb-4 gap-8">
          <PageHeaderHeading>{doc.title}</PageHeaderHeading>
          <PageHeaderDescription>{doc.description}</PageHeaderDescription>
        </PageHeader>
        <Separator className="my-8" />
        <Mdx code={doc.body.code} />
        <DocsPager
          currentItem={formattedDoc}
          allItems={formattedDocs}
          className="my-4 md:my-6"
        />
      </div>
      <div id="mdx-table-of-content" className="fixed z-20 top-[106px] right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
            <DashboardTableOfContents toc={toc} />
          </div>

    </Shell>
  )
}