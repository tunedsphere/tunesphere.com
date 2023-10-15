import { currentUser } from "@clerk/nextjs"
import { IndexUserDropdownMenu } from "@/components/index-user-dropdown-menu"

export default async function IndexLoginNavbar() {
  const user = await currentUser()

  return (
    <>
      <IndexUserDropdownMenu user={user} />
    </>
  )
}
