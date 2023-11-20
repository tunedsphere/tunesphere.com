import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/layouts/docs-sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {

  return (
   <> <div>
        <div className="max-w-8xl mx-auto">
      <aside id="docs-sidebar" className="fixed hidden lg:block bottom-0 top-[106px] right-auto w-[18rem] pb-10 h-screen grow-0 overflow-y-auto border-r border-muted ">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>

     
        <div className="flex flex-row items-stretch gap-12 lg:pt-[2rem]">
        <main className="lg:pl-[20rem] lg:max-w-7xl max-w-3xl mx-auto">
      
      {children}
      </main>
      </div>
    </div>
    </div>
    </>
  )
}
// <div class="z-20 hidden lg:block fixed bottom-0 right-auto w-[18rem] pl-4 pr-6 pb-10 overflow-y-auto stable-scrollbar-gutter top-[4rem]" id="sidebar"><div class="relative lg:text-sm lg:leading-6"><div class="sticky top-0 -ml-4 h-8"></div><ul><li><a class="group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-semibold text-primary dark:text-primary-light" href="/docs"><div class="mr-4 rounded-md p-1 group-hover:bg-primary bg-primary"><svg class="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-white" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/duotone/book-open.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg></div>Documentation</a></li><li><a href="https://demo.react.email/preview/vercel-invite-user" target="_blank" rel="noreferrer" class="group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"><div class="mr-4 rounded-md p-1 group-hover:bg-primary zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40"><svg class="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/duotone/arrow-pointer.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg></div>Examples</a></li><li><a href="https://react.email/discord" target="_blank" rel="noreferrer" class="group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"><div class="mr-4 rounded-md p-1 group-hover:bg-primary zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40"><svg class="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/brands/discord.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg></div>Discord</a></li><li><a href="https://github.com/resendlabs/react-email" target="_blank" rel="noreferrer" class="group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"><div class="mr-4 rounded-md p-1 group-hover:bg-primary zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40"><svg class="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/brands/github.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg></div>GitHub</a></li><div class="mt-12 lg:mt-8"><h5 class="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">Overview</h5><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/introduction"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/hand-wave.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Introduction</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light bg-primary/10 text-primary font-semibold dark:text-primary-light dark:bg-primary-light/10" style="padding-left:1rem" href="/docs/contributing"><svg class="mr-3 h-4 w-4 bg-primary dark:bg-primary-light" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/code-pull-request.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Contributing</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/changelog"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/list-check.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Changelog</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/roadmap"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/map.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Roadmap</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/cli"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/square-terminal.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>CLI</div></div></a></li></div><div class="mt-12 lg:mt-8"><h5 class="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">Getting Started</h5><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/getting-started/automatic-setup"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/download.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Automatic Setup</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/getting-started/manual-setup"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/hammer.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Manual Setup</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/getting-started/migrating-to-react-email"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/paper-plane.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Migrating to React Email</div></div></a></li></div><div class="mt-12 lg:mt-8"><h5 class="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">Components</h5><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/html"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/file-code.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>HTML</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/head"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/head-side.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Head</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/button"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/b.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Button</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/column"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/columns-3.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Column</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/row"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/table-rows.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Row</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/container"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/grid.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Container</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/font"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/book-font.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Font</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/heading"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/h1.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Heading</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/hr"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/horizontal-rule.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Hr</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/image"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/image.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Image</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/link"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/link.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Link</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/markdown"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/file-code.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Markdown</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/preview"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/input-text.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Preview</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/section"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/rectangles-mixed.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Section</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/tailwind"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/wind.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Tailwind</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/components/text"><svg class="mr-3 h-4 w-4 bg-gray-400 dark:bg-gray-500" style="-webkit-mask-image:url(https://mintlify.b-cdn.net/v6.4.0/regular/text-size.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center"></svg><div class="flex-1 flex items-center space-x-2.5"><div>Text</div></div></a></li></div><div class="mt-12 lg:mt-8"><h5 class="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">Utilities</h5><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/utilities/render"><div class="flex-1 flex items-center space-x-2.5"><div>Render</div></div></a></li></div><div class="mt-12 lg:mt-8"><h5 class="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">Integrations</h5><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/overview"><div class="flex-1 flex items-center space-x-2.5"><div>Overview</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/resend"><div class="flex-1 flex items-center space-x-2.5"><div>Resend</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/nodemailer"><div class="flex-1 flex items-center space-x-2.5"><div>Nodemailer</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/sendgrid"><div class="flex-1 flex items-center space-x-2.5"><div>SendGrid</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/postmark"><div class="flex-1 flex items-center space-x-2.5"><div>Postmark</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/aws-ses"><div class="flex-1 flex items-center space-x-2.5"><div>AWS SES</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/mailersend"><div class="flex-1 flex items-center space-x-2.5"><div>MailerSend</div></div></a></li><li><a class="group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" style="padding-left:1rem" href="/docs/integrations/plunk"><div class="flex-1 flex items-center space-x-2.5"><div>Plunk</div></div></a></li></div></ul></div></div>