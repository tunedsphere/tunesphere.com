import { currentUser } from "@clerk/nextjs"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"

export default async function LoginNavbar() {
  const user = await currentUser()

  return (
    <>
      <UserDropdownMenu user={user} />
    </>
  )
}
