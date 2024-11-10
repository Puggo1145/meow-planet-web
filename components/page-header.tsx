"use client"

// ui
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
    className?: string
}

export const PageHeader = ({
    title,
    useBackButton = false,
    backHref,
    className,
    ...props
}: PageHeaderProps) => {
    const router = useRouter()
    return (
        <header
            className={cn("flex items-center gap-x-4 py-6 pl-4", className)}
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
