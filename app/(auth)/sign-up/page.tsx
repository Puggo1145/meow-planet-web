import Link from "next/link"
// components
import SignUpForm from "./_components/sign-up-form"


const SignInPage: React.FC = () => {
  return (
    <div className="max-w-[320px] w-full flex flex-col items-center gap-y-8">
      <h1 className="text-2xl font-bold">
        Sign up to Meow Planet
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
      <p>Already have an account?</p>
      <Link 
        href="/sign-in"
        className="underline"
      >
        Sign in
      </Link>
    </div>
  )
}