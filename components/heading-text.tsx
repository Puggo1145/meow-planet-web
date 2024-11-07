import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const HeadingTextTitle = ({ children, className }: ComponentProps<'h2'>) => {
    return <h2 className={cn("text-2xl font-bold", className)}>{children}</h2>
}

export const HeadingTextDescription = ({ children, className }: ComponentProps<'p'>) => {
    return <p className={cn("text-sm text-gray-500", className)}>{children}</p>
}

export const HeadingText = ({ children, className }: ComponentProps<'div'>) => {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
        {children}
    </div>
  )
}
