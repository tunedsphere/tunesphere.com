import { Icons } from "@/components/icons"
export default function DjsLoading() {
  return (
    <div
    id="djs-loading-grid"
    className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-8 @container sm:pl-12">
  <div className="h-full w-full mx-auto flex items-center justify-center">
  <Icons.spinner className=" h-20 w-20 animate-spin text-primary" />
</div>
      </div>
  )
}
