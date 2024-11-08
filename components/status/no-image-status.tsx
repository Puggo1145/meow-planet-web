import { ImageIcon } from "lucide-react"

export const NoImageStatus = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ImageIcon className="size-20 text-muted-foreground" />
        </div>
    )
}
