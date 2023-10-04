import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import "@/styles/mdx.css"

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
import { MdxPager } from "@/components/pagers/mdx-pager"
import { Shell } from "@/components/shells/shell"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    null
  }

  return doc
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("title", doc.title)
  ogUrl.searchParams.set("type", siteConfig.name)
  ogUrl.searchParams.set("mode", "light")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<DocPageProps["params"][]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params)

  if (!doc) {
    notFound()
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

  return (
    <Shell as="article" variant="markdown">
      <div className="mx-auto w-full min-w-0">
      <PageHeader>
        <PageHeaderHeading>{doc.title}</PageHeaderHeading>
        <PageHeaderDescription>{doc.description}</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-4" />
      <Mdx code={doc.body.code} />
      <MdxPager
        currentItem={formattedDoc}
        allItems={formattedDocs}
        className="my-4 md:my-6"
      />
      </div>
    </Shell>
  )
}
