// ui
import { Separator } from "@/components/ui/separator"
// componets
import AuthHeader from "./_components/auth-header"
// import AuthBtns from "./_components/auth-btns"
// types
import type { PropsWithChildren } from "react"


const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <AuthHeader />
      <main className="flex-1 pt-[120px] h-full overflow-y-scroll flex flex-col items-center">
        {children}
        <Separator className="mt-8 max-w-[320px] w-full" />
        {/* <AuthBtns /> */}
      </main>
    </div>
  )
}

export default AuthLayout