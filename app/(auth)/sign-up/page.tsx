import Link from "next/link"
// components
import SignUpForm from "./_components/sign-up-form"


const SignInPage: React.FC = () => {
  return (
    <div className="max-w-[320px] w-full flex flex-col items-center gap-y-8">
      <h1 className="text-2xl font-bold">
        注册猫猫星球
      </h1>
      <SignUpForm />
      <GotoSignUp />
    </div>
  )
}

export default SignInPage


const GotoSignUp = () => {
  return (
    <div className="text-sm flex items-center gap-x-2">
      <p>已经有账号了?</p>
      <Link 
        href="/sign-in"
        className="underline"
      >
        去登录
      </Link>
    </div>
  )
}