/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, memo } from "react"
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
import { Avatar, AvatarImage } from "@/components/ui/avatar"
// components
import { Loader } from "@/components/loader"
// icons
import { ImageIcon, Cat, X } from "lucide-react"
// utils
import { toast } from "sonner"
import { cn } from "@/lib/utils"
// types
import type { CreateCatData, CreateCatImageData } from "@/types/cats"
import { useImages } from "@/hooks/use-images"
import { BUCKETS_IDS } from "@/lib/appwrite"
import { createCat, createCatImages } from "@/api/cats"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "猫咪名字不能为空",
    }),
    gender: z.enum(["male", "female", "unknown"], {
        required_error: "请选择猫咪性别",
    }),
    age: z.number().refine(age => age === undefined || age > 0, {
        message: "年龄必须大于0",
    }),
    description: z.string().min(1, {
        message: "描述不能为空",
    }),
})

interface AvatarPreviewProps {
    avatar: File | null;
    onImageSelect: (files: FileList | null) => void;
}

const AvatarPreview = memo(({ avatar, onImageSelect }: AvatarPreviewProps) => {
    const selectImage = () => document.getElementById('image-input')?.click()

    return (
        <section className="w-full flex flex-col items-center gap-y-4 py-8">
            <div
                className="cursor-pointer"
                onClick={selectImage}
            >
                <Avatar className="size-40 border-4 border-muted hover:brightness-90 duration-300">
                    {avatar
                        ?
                        <AvatarImage
                            src={URL.createObjectURL(avatar)}
                            alt="avatar preview"
                            className="object-cover"
                        />
                        :
                        <div className="size-full bg-secondary flex items-center justify-center">
                            <ImageIcon className="size-10 text-muted-foreground" />
                        </div>
                    }
                </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">
                {!avatar && "点击上传猫咪图片"}
            </p>
            <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => onImageSelect(e.target.files)}
            />
        </section>
    )
})
AvatarPreview.displayName = 'AvatarPreview'

const CatUploadPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const {
        images,
        selectedIndex: avatarIndex,
        isUploading,
        setSelectedIndex: setAvatarIndex,
        handleImageSelect,
        removeImage,
        uploadImages
    } = useImages({
        bucket: BUCKETS_IDS.CATS,
        onUploadError: (error) => {
            toast.error(`上传图片失败: ${error.message}`)
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            gender: "unknown",
            age: undefined,
            description: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (images.length === 0) {
            toast.error("请至少上传一张图片")
            return
        }

        setIsSubmitting(true)

        try {
            // 1. 上传所有图片
            const uploadedFiles = await uploadImages()

            // 2. 创建猫咪档案
            const createCatData: CreateCatData = {
                ...values,
                avatarUrl: uploadedFiles[avatarIndex].url,
            }

            const cat = await createCat(createCatData)

            // 3. 创建猫咪图片记录
            const createImagesData: CreateCatImageData[] = uploadedFiles.map((file, index) => ({
                url: file.url,
                catId: cat.id,
                order: index
            }))

            await createCatImages(createImagesData)

            toast.success("创建成功！")
            router.push("/cats")
        } catch (err) {
            if (err instanceof Error && !isUploading) {
                toast.error(`创建失败: ${err.message}`)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto pb-16">
            <AvatarPreview 
                avatar={images[avatarIndex]}
                onImageSelect={handleImageSelect}
            />

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
                                    <FormLabel>名字</FormLabel>
                                    <FormControl>
                                        <Input placeholder="给这只猫咪起个名字吧" {...field} />
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
                                        <FormLabel>性别</FormLabel>
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
                                        <FormLabel>年龄</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="年龄（不满 1 岁请输入 0）"
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
                                            placeholder="介绍一下这只猫咪吧..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* 图片上传 */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">上传图片</h2>
                            {images.length > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    从下面图片中选择一张作为猫咪头像（默认为第一张）
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "relative aspect-square rounded-xl overflow-hidden bg-secondary",
                                        "cursor-pointer group",
                                        index === avatarIndex && "ring-2 ring-primary"
                                    )}
                                    onClick={() => setAvatarIndex(index)}
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`preview ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* 图片被作为头像的标记 */}
                                    {index === avatarIndex && (
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <Cat className="size-8 text-primary" />
                                        </div>
                                    )}
                                    {/* 删除按钮 */}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeImage(index)
                                        }}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            ))}
                            {images.length < 9 && (
                                <label className={cn(
                                    "flex flex-col items-center justify-center",
                                    "aspect-square rounded-xl border-2 border-dashed",
                                    "cursor-pointer hover:bg-secondary transition-colors"
                                )}>
                                    <ImageIcon className="size-8 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground mt-2">
                                        上传图片
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleImageSelect(e.target.files)}
                                    />
                                </label>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            最多可上传9张图片，第一张图片将作为头像显示
                        </p>
                    </div>

                    {/* 提交按钮 */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader size="sm" color="white" />
                        ) : (
                            "创建档案"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CatUploadPage