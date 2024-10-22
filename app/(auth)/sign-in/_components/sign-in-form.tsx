"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// ui
import LabelInput from "@/components/label-input"
import { Button } from "@/components/ui/button"
// components
import { Loader } from "@/components/loader"
// utils
import { toast } from "sonner"
// appwrite
import { Account } from "appwrite"
import { client } from "@/lib/appwrite"


const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmiting(true);

        try {
            const account = new Account(client)
            await account.createEmailPasswordSession(email, password)
            toast.success("登录成功");
            router.push("/today") // Redirect to the main page after successful login
        } catch (err) {
            toast.error("登录失败，请检查您的邮箱和密码");
        } finally {
            setIsSubmiting(false)
        }
    }

    return (
        <form className="w-full flex flex-col gap-y-4" onSubmit={handleSignIn}>
            <LabelInput
                label="邮箱"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <LabelInput
                label="密码"
                type="password"
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Link
                href="/auth/reset-pwd"
                className="self-end text-sm text-muted-foreground/80 hover:text-muted-foreground"
            >
                忘记密码?
            </Link>
            <Button type="submit" className="mt-4" disabled={isSubmiting}>
                {isSubmiting ? 
                    <Loader size="sm" color="white" />
                    : "登录"
                }
            </Button>
        </form>
    )
}

export default SignInForm
