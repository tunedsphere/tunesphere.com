interface FestivalsLayoutProps {
  children: React.ReactNode
}

export default function FestivalsLayout({ children }: FestivalsLayoutProps) {
  return (
    <section>
      <main className="mx-auto mt-28 max-w-[1600px] px-4">{children}</main>
    </section>
  )
}
