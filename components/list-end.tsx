import { cn } from "@/lib/utils"
import { Loader } from "./loader"

interface ListEndProps {
  className?: string
  isLoading?: boolean
  hasMore?: boolean
}

export const ListEnd = ({ className, isLoading, hasMore }: ListEndProps) => {
  // 加载中状态
  if (isLoading) {
    return (
      <div className={cn(
        "w-full py-8 flex items-center justify-center gap-x-2",
        "text-sm text-muted-foreground",
        className
      )}>
        <Loader size="sm" />
        <span>加载中...</span>
      </div>
    )
  }

  // 还有更多数据
  if (hasMore) {
    return null
  }

  // 加载完毕状态
  return (
    <div className={cn(
      "w-full py-8 flex items-center justify-center gap-x-2",
      "text-sm text-muted-foreground",
      className
    )}>
      <div className="h-[1px] w-12 bg-border" />
      <span>已经到底啦 =＾● ⋏ ●＾=</span>
      <div className="h-[1px] w-12 bg-border" />
    </div>
  )
}

// 可选的其他样式变体
export const ListEndAlt = ({ className, isLoading, hasMore }: ListEndProps) => {
  // 加载中状态
  if (isLoading) {
    return (
      <div className={cn(
        "w-full py-8 flex items-center justify-center gap-x-2",
        "text-sm text-muted-foreground",
        className
      )}>
        <Loader size="sm" />
        <span>加载中...</span>
      </div>
    )
  }

  // 还有更多数据
  if (hasMore) {
    return null
  }

  // 加载完毕状态
  return (
    <div className={cn(
      "w-full py-8 flex flex-col items-center gap-y-2",
      "text-sm text-muted-foreground",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        🐱
      </div>
      <p>喵~ 这里已经是底部啦</p>
    </div>
  )
} 