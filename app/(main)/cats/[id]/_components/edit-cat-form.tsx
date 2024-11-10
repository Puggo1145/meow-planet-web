"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TagInput } from "@/components/tag-input"
// components
import { Loader } from "@/components/loader"
// utils
import { toast } from "sonner"
// services
import { getCatById, updateCat } from "@/services/cats"
// types
import type { CatDocument } from "@/types/cats"

const formSchema = z.object({
    name: z.string()
        .min(1, { message: "猫咪名字不能为空" })
        .max(16, { message: "猫咪名字不能超过16个字符" }),
    gender: z.enum(["male", "female", "unknown"], {
        required_error: "请选择猫咪性别",
    }),
    age: z.number().refine(age => age === undefined || age >= 0, {
        message: "年龄不能小于0",
    }),
    character: z.string().max(512, { message: "性格特点不能超过512个字符" }).optional(),
    notice: z.string().max(512, { message: "注意事项不能超过512个字符" }).optional(),
    disease: z.array(z.string()).default([]),
    sterilization: z.boolean().optional(),
    description: z.string().max(1024, { message: "描述不能超过1024个字符" }).optional(),
})

interface EditCatFormProps {
    catId: string
}

export const EditCatForm = ({ catId }: EditCatFormProps) => {
    const [cat, setCat] = useState<CatDocument | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const cat = await getCatById(catId)
                setCat(cat)
                // 设置表单默认值
                form.reset({
                    name: cat.name,
                    gender: cat.gender,
                    age: cat.age,
                    character: cat.character,
                    notice: cat.notice,
                    disease: cat.disease,
                    sterilization: cat.sterilization,
                    description: cat.description,
                })
            } catch (error) {
                toast.error(`获取猫咪信息失败: ${(error as Error).message}`)
            }
        }
        fetchCat()
    }, [catId, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await updateCat(catId, values)
            toast.success("更新成功！")
            router.replace(`/cats/${catId}`)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    if (!cat) return null

    return (
        <ScrollArea className="h-full px-4">
            <div className="max-w-3xl mx-auto pb-16">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* 基本信息 */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">基本信息</h2>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>名字*</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>性别*</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="选择性别" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">男猫猫</SelectItem>
                                                    <SelectItem value="female">女猫猫</SelectItem>
                                                    <SelectItem value="unknown">未知</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>年龄*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>描述</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* 性格特点 */}
                        <FormField
                            control={form.control}
                            name="character"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>性格特点</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 撸猫注意事项 */}
                        <FormField
                            control={form.control}
                            name="notice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>撸猫注意事项</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 病症标签 */}
                        <FormField
                            control={form.control}
                            name="disease"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>病症</FormLabel>
                                    <FormControl>
                                        <TagInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="输入病症后按回车添加"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 是否绝育 */}
                        <FormField
                            control={form.control}
                            name="sterilization"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-x-2">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="!mt-0">已绝育</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 提交按钮 */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader size="sm" color="white" />
                            ) : (
                                "保存修改"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </ScrollArea>
    )
} 