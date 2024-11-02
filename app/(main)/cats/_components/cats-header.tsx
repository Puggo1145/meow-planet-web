"use client"

// react
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// icons
import { UploadIcon } from "lucide-react"
// services
import { getCatsCount } from "@/services/cats"
// utils
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export const CatsHeader = () => {
    const [catsCount, setCatsCount] = useState<number>()

    useEffect(() => {
        getCatsCount().then(setCatsCount)
    }, [])

    return (
        <header className="w-full flex items-center justify-between gap-x-6 py-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold">图鉴</h1>
                {catsCount 
                ? 
                    <span className="text-sm text-muted-foreground">
                        已收录 {catsCount} 只猫咪
                    </span>
                    :
                    <Skeleton className="w-24 h-4" />
                }
            </div>
            <Button
                asChild
                className="flex items-center gap-x-2"
            >
                <Link href="/cats/upload">
                    <UploadIcon className="size-4" />
                    创建猫咪
                </Link>
            </Button>
        </header>
    )
}
