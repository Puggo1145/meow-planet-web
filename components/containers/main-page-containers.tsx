import { cn } from "@/lib/utils"
// types
import type { ComponentProps } from "react"

export const MainContainer = ({ children, className }: ComponentProps<'div'>) => {
    return (
        <div className={cn(
            "flex-1 h-screen p-4 pb-0 flex flex-col",
            "pb-16 lg:pb-0",
            className
        )}>
            {children}
        </div>
    )
}

export const RightContainer = ({ children, className }: ComponentProps<'div'>) => {
  return (
    <div className={cn(
        "w-[400px] p-6",
        "hidden xl:block",
        className
    )}>
        {children}
    </div>
  )
}

export const LeftContainer = ({ children, className, }: ComponentProps<'div'>) => {
  return (
    <div className={cn(
        "w-[300px] p-6 flex flex-col",
        "hidden md:flex",
        className
    )}>
        {children}
    </div>
  )
}
