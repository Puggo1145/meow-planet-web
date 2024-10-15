"use client"

// ui
import LabelInput from "@/components/ui/label-input"
import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"


const SignInForm = () => {
    return (
        // TODO: replace original form with Form component
        <form className="w-full flex flex-col gap-y-4">
            <LabelInput
                label="Username"
                type="text" 
                placeholder="username" 
            />
            <LabelInput
                label="Password"
                type="password" 
                placeholder="password" 
            />
            <Button>Sign in</Button>
        </form>
    )
}

export default SignInForm