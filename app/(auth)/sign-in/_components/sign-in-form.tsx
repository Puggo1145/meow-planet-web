"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
// ui
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// components
import { Loader } from "@/components/loader"
// utils
import { toast } from "sonner"
// appwrite
import { account } from "@/lib/appwrite"
// store
import { useUserStore } from '@/store/use-user'


const formSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  password: z.string().min(8, { message: "密码至少需要8个字符" }),
})

const SignInForm = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)

        try {
            await account.createEmailPasswordSession(values.email, values.password)
            
            // 获取并存储用户信息
            await useUserStore.getState().initialize()
            
            toast.success("登录成功")
            router.replace("/today")
        } catch {
            toast.error("用户名或密码错误");
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>邮箱</FormLabel>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="8+ characters" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    href="/auth/reset-pwd"
                    className="self-end text-sm text-muted-foreground/80 hover:text-muted-foreground"
                >
                    忘记密码?
                </Link>
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    {isSubmitting ? 
                        <Loader size="sm" color="white" />
                        : "登录"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default SignInForm
