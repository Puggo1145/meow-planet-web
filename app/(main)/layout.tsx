import { LeftContainer } from "@/components/containers/main-page-containers"
import UserInfo from "./_components/user-info"
import Navs from "./_components/navs"
// types
import type { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="max-w-[1440px] w-full h-screen mx-auto flex">
      <LeftContainer>
        <UserInfo />
        <Navs />
      </LeftContainer>
      {children}
    </div>
  )
}

export default MainLayout