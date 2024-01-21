interface MainLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function MainLayout({ children, modal }: MainLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
