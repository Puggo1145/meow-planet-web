import { LeftContainer } from "@/components/containers/main-page-containers"
import Avatar from "./_components/left-col/avatar"
import Navs from "./_components/left-col/navs"
// types
import type { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="max-w-[1440px] w-full h-screen mx-auto flex">
      <LeftContainer>
        <Avatar />
        <Navs />
      </LeftContainer>
      {children}
    </div>
  )
}

export default MainLayout