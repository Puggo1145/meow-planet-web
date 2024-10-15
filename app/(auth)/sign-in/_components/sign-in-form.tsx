"use client"

import Link from "next/link"
// ui
import LabelInput from "@/components/label-input"
import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"


const SignInForm = () => {
    return (
        // TODO: replace original form with Form component
        <form className="w-full flex flex-col gap-y-4">
            <LabelInput
                label="Email"
                type="text"
                placeholder="example@email.com"
            />
            <LabelInput
                label="Password"
                type="password"
                placeholder="8+ characters"
            />
            <Link 
                href="/auth/reset-pwd"
                className="self-end text-sm text-muted-foreground/80 hover:text-muted-foreground"
            >
                forget password?
            </Link>
            <Button className="mt-4">
                Sign in
            </Button>
        </form>
    )
}

export default SignInForm