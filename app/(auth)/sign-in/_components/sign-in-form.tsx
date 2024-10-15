// ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"


const SignInForm = () => {
    return (
        // TODO: replace original form with Form component
        <form className="w-full flex flex-col gap-y-4">
            <Input type="text" placeholder="username" />
            <Input type="text" placeholder="password" />
            <Button>Sign in</Button>
        </form>
    )
}

export default SignInForm