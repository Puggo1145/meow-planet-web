import { cn } from "@/lib/utils"
// types
import type { ComponentProps } from "react"


export const MainContainer = ({ children, className }: ComponentProps<'div'>) => {
    return (
        <div className={cn("flex-1 h-screen p-6 flex flex-col", className)}>
            {children}
        </div>
    )
}

export const RightContainer = ({ children, className }: ComponentProps<'div'>) => {
  return (
    <div className={cn("w-[400px]", className)}>
        {children}
    </div>
  )
}

export const LeftContainer = ({ children, className, }: ComponentProps<'div'>) => {
  return (
    <div className={cn("w-[300px] p-6 flex flex-col", className)}>
        {children}
    </div>
  )
}
