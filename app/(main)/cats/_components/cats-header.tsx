import { Button } from "@/components/ui/button"
import { UploadIcon } from "lucide-react"
export const CatsHeader = () => {
  return (
    <header className="w-full flex items-center justify-between gap-x-6 py-4">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-bold">图鉴</h1>
        <span className="text-sm text-muted-foreground">
          已收录 124 只猫咪
        </span>
      </div>
      <Button className="flex items-center gap-x-2">
        <UploadIcon className="size-4" />
        上传猫咪
      </Button>
    </header>
  )
}
