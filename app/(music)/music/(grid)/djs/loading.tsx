import { Icon } from '@/components/icon'
export default function DjsLoading() {
  return (
    <div
      id="djs-loading-grid"
      className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll  pb-12 pl-4 pr-8 pt-2 @container sm:pl-12"
    >
      <div className="mx-auto flex h-full w-full items-center justify-center">
        <Icon name="spinner" className=" h-20 w-20 animate-spin text-primary" />
      </div>
    </div>
  )
}
