import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const CatsSearch = () => {
  return (
    <div className="w-full flex items-center gap-x-4">
      {/* 搜索框 */}
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="搜索猫猫..." 
          className="pl-10 h-[60px]"
        />
      </div>

      {/* 搜索按钮 */}
      <Button className="flex items-center gap-x-2 size-[60px]">
        <SearchIcon className="size-6" />
      </Button>
    </div>
  )
} 