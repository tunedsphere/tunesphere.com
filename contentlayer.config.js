import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      if (doc._id.startsWith('docs/index.mdx')) {
        console.log("Generated Slug for index.mdx:", '/docs');
        return '/docs';
      }
      const slug = `/${doc._raw.flattenedPath}`;
      console.log("Generated Slug:", slug);
      return slug;
    },
  },

  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      const flattenedPath = doc._raw.flattenedPath;
      
      // Add a condition for the index.mdx file
      if (flattenedPath.startsWith("docs/index.mdx")) {
        return "/docs";
      }

      // For other files, extract the slug as usual
      const slugAsParams = flattenedPath.split("/").slice(1).join("/");
      console.log("Generated SlugAsParams:", slugAsParams);
      return slugAsParams;
    },
  },

  readingTime: {
    type: "number",
    resolve: (doc) => {
      const content = doc.body.raw
      const wordsPerMinute = 200
      const numberOfWords = content.split(/\s/g).length
      const minutes = numberOfWords / wordsPerMinute
      return Math.ceil(minutes)
    },
  },
}
export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    global_id: {
      type: 'string',
      description: 'Random ID to uniquely identify this doc, even after it moves',
      required: true,
    },
    title: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: false,
    },
    published: {
      type: "boolean",
      default: true,
    },
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: (doc) => {
        if (doc._startsWith('docs/index.mdx')) return '/docs'
        return urlFromFilePath(doc)
      },
    },
    
  },
  
  computedFields,
  
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    twitter: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}))



export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author, Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") return

            node.raw = codeEl.children?.[0].value
          }
        })
      },
      [
        rehypePrettyCode,
        {
          theme: { dark: "one-dark-pro", light: "github-light" },

          /**
           * @param {{ children: string | any[]; }} node
           */
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          /**
           * @param {{ properties: { className: string[]; }; }} node
           */
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          /**
           * @param {{ properties: { className: string[]; }; }} node
           */
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) return

            for (const child of node.children) {
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw
              }
            }
          }
        })
      },
    ],
  },
})


