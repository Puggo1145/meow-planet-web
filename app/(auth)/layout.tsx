// componets
import AuthHeader from "./_components/auth-header"
// types
import type { PropsWithChildren } from "react"

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <AuthHeader />
      <main className="flex-1 h-full flex items-center justify-center">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout