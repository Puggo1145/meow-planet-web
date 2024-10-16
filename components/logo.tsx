import Image from "next/image"
// assets
import icons from "@/constants/icons"

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
    <div className="flex items-center justify-center gap-x-2">
      <Image
        src={variant === 'default' ? icons.logo : icons.logoWhite}
        alt="logo"
        width={40}
        height={40}
        className={className}
      />
      {withName && <h1 className="text-lg font-bold text-primary">Meow Planet</h1>}
    </div>
  )
}

export default Logo