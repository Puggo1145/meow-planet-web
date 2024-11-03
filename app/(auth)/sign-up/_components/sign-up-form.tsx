"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// ui
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// store
import { useUserStore } from "@/store/use-user"
// utils
import { toast } from "sonner"
// appwrite
import { ID } from "appwrite"
import { account } from "@/lib/appwrite"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "用户名至少需要2个字符。",
    }),
    email: z.string().email({
        message: "请输入有效的邮箱地址。",
    }),
    password: z.string().min(8, {
        message: "密码至少需要8个字符。",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
        message: "密码必须包含大小写字母。",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
})

const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            await account.create(
                ID.unique(),
                values.email,
                values.password,
                values.username
            )
            await account.createEmailPasswordSession(values.email, values.password)
            useUserStore.getState().initialize()

            toast.success("注册成功，欢迎加入猫猫星球！")
            router.push("/today")
        } catch {
            toast.error("注册失败，请稍后重试");
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>用户名 (公开显示)</FormLabel>
                            <FormControl>
                                <Input placeholder="为自己取一个喜欢的名字吧！" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                <Input type="password" placeholder="密码不少于 8 位且包含大小写字母" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>确认密码</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="请再次输入密码" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    {isSubmitting ? <Loader color="white" size="sm" /> : "注册"}
                </Button>
            </form>
        </Form>
    )
}

export default SignUpForm
