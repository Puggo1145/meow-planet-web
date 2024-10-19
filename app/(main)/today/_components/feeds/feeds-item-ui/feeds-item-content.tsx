import Image from "next/image"
// utils
import { cn } from "@/lib/utils"
// types
import type { ComponentProps } from "react"
import type { ImageProps } from "next/image"


export const FeedsItemContent = ({ 
    children,
    className,
    ...props
}: ComponentProps<'section'>) => (
    <section 
        className={cn("flex flex-col gap-y-4", className)}
        {...props}
    >
        {children}
    </section>
)

export const FeedsItemContentTexts = ({ 
    children,
    className,
    ...props
}: ComponentProps<'p'>) => (
    <p 
        className={cn("max-w-3/4 leading-relaxed", className)} 
        {...props}
    >
        {children}
    </p>
)

export const FeedsItemContentImage = ({
    className,
    alt,
    ...props
}: ImageProps) => {
    return (
        <Image
            className={cn(
                "rounded-xl bg-gray-200 object-cover",
                "cursor-pointer hover:brightness-75 transition-all duration-300",
                className
            )}
            alt={alt}
            {...props}
        />
    )
}
