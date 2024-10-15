// ui
import { Separator } from "@/components/ui/separator"
// componets
import AuthHeader from "./_components/auth-header"
import ContinueWithGoogleBtn from "./_components/continueWithGoogle"
// types
import type { PropsWithChildren } from "react"


const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <AuthHeader />
      <main className="flex-1 h-full flex flex-col items-center justify-center">
        {children}
        <Separator className="mt-8 max-w-[320px] w-full" />
        <ContinueWithGoogleBtn />
      </main>
    </div>
  )
}

export default AuthLayout