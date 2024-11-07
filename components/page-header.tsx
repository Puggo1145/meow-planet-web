"use client"

// ui
import { Button } from "@/components/ui/button"
// icons
import { ArrowLeft } from "lucide-react"
// utils
import { useRouter } from "next/navigation"
// types
import { ComponentProps } from "react"

interface PageHeaderProps extends ComponentProps<"header"> {
    title: string
    useBackButton?: boolean
    backHref?: string
}

export const PageHeader = ({
    title,
    useBackButton = false,
    backHref,
    ...props
}: PageHeaderProps) => {
    const router = useRouter()
    return (
        <header
            className="flex items-center gap-x-4 py-6"
            {...props}
        >
            {useBackButton && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => backHref ? router.push(backHref) : router.back()}
                >
                    <ArrowLeft className="size-5" />
                </Button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
        </header>
    )
}
