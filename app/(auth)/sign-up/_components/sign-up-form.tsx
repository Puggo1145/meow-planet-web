"use client"

// ui
import LabelInput from "@/components/label-input"
import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"


const SignUpForm = () => {
    return (
        // TODO: replace original form with Form component
        <form className="w-full flex flex-col gap-y-4">
            <LabelInput
                label="username (public)"
                type="text"
                placeholder="how would you like to be called?"
            />
            <LabelInput
                label="Email"
                type="text"
                placeholder="example@email.com"
            />
            <LabelInput
                label="Password"
                type="password"
                placeholder="set a password"
            />
            <LabelInput
                label="Verify password"
                type="password"
                placeholder="8+ characters"
            />
            <Button className="mt-4">
                Sign up
            </Button>
        </form>
    )
}

export default SignUpForm;