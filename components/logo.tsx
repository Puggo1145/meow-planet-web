import Image from "next/image"
// assets
import icons from "@/constants/icons"
import { Badge } from "./ui/badge"

interface ILogoProps {
  variant?: "default" | "white"
  withName?: boolean
  className?: string
}

const Logo = ({
  variant = "default",
  withName = false,
  className,
}: ILogoProps) => {
  return (
    <div className="relative flex items-center justify-center gap-x-2">
      <Image
        src={variant === 'default' ? icons.logo : icons.logoWhite}
        alt="logo"
        width={40}
        height={40}
        className={className}
      />
      {withName && <h1 className="text-lg font-bold text-primary">猫猫星球</h1>}
      <Badge className="absolute right-0 top-0 text-xs">
        测试版
      </Badge>
    </div>
  )
}

export default Logo