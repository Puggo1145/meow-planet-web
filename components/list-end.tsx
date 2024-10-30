import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Loader } from "./loader"

interface ListEndProps {
  className?: string
}

export const ListEnd = ({ className }: ListEndProps) => {
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
export const ListEndAlt = ({ className }: ListEndProps) => {
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

// 带有加载更多功能的变体
interface ListEndWithLoadMoreProps extends ListEndProps {
  hasMore: boolean
  isLoading?: boolean
  onLoadMore: () => void
}

export const ListEndWithLoadMore = ({ 
  className,
  hasMore,
  isLoading,
  onLoadMore 
}: ListEndWithLoadMoreProps) => {
  if (!hasMore) {
    return <ListEnd className={className} />
  }

  return (
    <div className={cn(
      "w-full py-8 flex items-center justify-center",
      className
    )}>
      <Button
        variant="ghost"
        disabled={isLoading}
        onClick={onLoadMore}
      >
        {isLoading ? (
          <>
            <Loader size="sm" className="mr-2" />
            加载中...
          </>
        ) : (
          "加载更多"
        )}
      </Button>
    </div>
  )
} 