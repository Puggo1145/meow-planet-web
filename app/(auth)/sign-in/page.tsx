import Link from "next/link"
// components
import SignInForm from "./_components/sign-in-form"
import { Button } from "@/components/ui/button"

const SignInPage: React.FC = () => {
  return (
    <div className="max-w-[320px] w-full flex flex-col items-center gap-y-4">
      <h1 className="text-2xl font-bold">
        登录猫猫星球
      </h1>
      <SignInForm />
      <GotoSignUp />
    </div>
  )
}

export default SignInPage


const GotoSignUp = () => {
  return (
    // <div className="text-sm flex items-center gap-x-2">
      // <p>还没有账号?</p>
      <Button
         asChild 
         variant="secondary" 
         className="w-full"
      >
        <Link href="/sign-up">
          注册
        </Link>
      </Button>
    // </div>
  )
}