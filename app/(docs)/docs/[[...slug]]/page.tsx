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
import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/layouts/docs-sidebar-nav"
import SiteFooter from "@/components/layouts/site-footer"
import { getTableOfContents } from "@/lib/toc"
import { DashboardTableOfContents } from "@/components/toc"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { DocsPager } from "@/components/pagers/docs-pager"
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
    <>
     <div className="sticky shrink-0 hidden lg:block top-[106px] h-[calc(100vh-130px)] w-[19rem]  border-r border-muted ">
      <div 
      id="docs-sidebar"
      className="h-full pb-10 pl-8 pr-6 overflow-y-scroll">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100">

        </div>
      </div>

    <div className="relative w-full grow p-6">
    <div className="right-gradient fixed z-10"></div>

      <div className="mx-auto w-full min-w-0 max-w-full p-4 mb-4 md:mb-8 md:px-8 lg-mx-0 lg-max-w-full lg-px-16">
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
    </div>


      <div id="mdx-table-of-content" className="sticky z-20 top-[106px] w-60 shrink-0 py-10 overflow-y-auto hidden xl:block p-8 pr-16">
        <DashboardTableOfContents toc={toc} />
      </div>
      </>
  )
}