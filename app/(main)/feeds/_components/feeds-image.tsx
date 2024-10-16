import Image from "next/image"
// utils
import { cn } from "@/lib/utils"
// types
import type { ImageProps } from "next/image"

const FeedsImage = ({ 
    className, 
    alt,
    ...props 
}: ImageProps) => {
    return (
        // TODO: replace with Image component
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

export default FeedsImage