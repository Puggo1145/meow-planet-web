import Image from "next/image"
import images from "@/constants/images"

interface EmptyStatusProps {
  title?: string
  description?: string
}

export const EmptyStatus = ({
  title = "暂无更多结果",
  description = "没有找到符合条件的内容",
}: EmptyStatusProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4 py-12">
      <Image
        src={images.status.emptyStatus}
        alt="empty"
        width={200}
        height={200}
        className="opacity-75"
      />
      <div className="text-center space-y-1">
        <h3 className="font-medium text-lg">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
