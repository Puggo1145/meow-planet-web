import { LeftContainer } from "@/components/containers/main-page-containers"
import Logo from "@/components/logo"
import { UserPanel } from "./_components/user-panel"
import Navs from "./_components/navs"
// types
import type { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <main className="max-w-[1440px] w-full h-screen mx-auto flex">
      <LeftContainer>
        <UserPanel />
        <section className="flex-1 flex flex-col justify-between">
          <Navs />
          <Logo withName />
        </section>
      </LeftContainer>
      {children}
    </main>
  )
}

export default MainLayout