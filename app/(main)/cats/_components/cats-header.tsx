"use client"

// react
import { Button } from "@/components/ui/button"
// icons
import { UploadIcon } from "lucide-react"
// utils
import Link from "next/link"

interface CatsHeaderProps {
    catsCount: number
}

export const CatsHeader = ({ catsCount }: CatsHeaderProps) => {
    return (
        <header className="w-full flex items-center justify-between gap-x-6 py-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold">图鉴</h1>
                <span className="text-sm text-muted-foreground">
                    已收录 {catsCount} 只猫咪
                </span>
            </div>
            <Button
                asChild
                className="flex items-center gap-x-2"
            >
                <Link href="/cats/upload">
                    <UploadIcon className="size-4" />
                    上传猫咪
                </Link>
            </Button>
        </header>
    )
}
