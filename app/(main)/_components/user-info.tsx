// import Image from "next/image"
// icons
import { UserRoundIcon, ChevronsUpDownIcon } from "lucide-react"

const UserInfo = () => {
  return (
    <div className="flex items-center justify-between p-4 py-6 cursor-pointer hover:bg-secondary rounded-2xl">
      {/* <Image src={""} alt="user" /> */}
      <div className="flex items-center gap-x-3">
        <div className="size-8 rounded-full overflow-hidden flex items-center justify-center bg-primary">
          <UserRoundIcon className="text-white" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold leading-none">mock 用户名</p>
          <p className="text-xs text-muted-foreground leading-none">mock info</p>
        </div>
      </div>
      <ChevronsUpDownIcon
        size={16}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default UserInfo