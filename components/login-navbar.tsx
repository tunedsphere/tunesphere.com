import { currentUser } from "@clerk/nextjs"
import { UserDropdownMenu } from "@components/user-dropdown-menu"

interface LoginNavbarProps {}

export default async function LoginNavbar({}: LoginNavbarProps) {
  const user = await currentUser()

  return (
    <>
      <UserDropdownMenu user={user} />
    </>
  )
}
