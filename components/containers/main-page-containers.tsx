import { cn } from "@/lib/utils"
// types
import type { ComponentProps } from "react"


export const MainContainer = ({ children, className }: ComponentProps<'div'>) => {
    return (
        <div className={cn("flex-1 h-full", className)}>
            {children}
        </div>
    )
}

export const RightContainer = ({ children, className }: ComponentProps<'div'>) => {
  return (
    <div className={cn("w-[400px] bg-gray-300", className)}>
        {children}
    </div>
  )
}

export const LeftContainer = ({ children, className, }: ComponentProps<'div'>) => {
  return (
    <div className={cn("w-[300px] bg-gray-200", className)}>
        {children}
    </div>
  )
}
