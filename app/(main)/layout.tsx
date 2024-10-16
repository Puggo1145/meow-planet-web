import { LeftContainer } from "@/components/containers/main-page-containers"
import Logo from "@/components/logo"
import UserInfo from "./_components/user-info"
import Navs from "./_components/navs"
// types
import type { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="max-w-[1440px] w-full h-screen mx-auto flex">
      <LeftContainer>
        <UserInfo />
        <section className="flex-1 flex flex-col justify-between">
          <Navs />
          <Logo withName />
        </section>
      </LeftContainer>
      {children}
    </div>
  )
}

export default MainLayout