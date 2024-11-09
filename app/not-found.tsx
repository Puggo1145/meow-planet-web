import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import images from "@/constants/images"

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-y-4 px-4">
      <div className="relative size-[256px] flex items-center justify-center">
        <Image
          src={images.status.notFoundStatus}
          alt="404"
          width={192}
          height={192}
          className="size-full object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold">
        喵喵，这个页面找不到了
      </h1>
      <p className="text-muted-foreground text-center max-w-[500px]">
        看起来你访问的页面不存在或已被移除<br />
        不如回家看看有什么新发现？
      </p>
      <div className="flex items-center gap-x-4">
        <Button asChild className="font-bold px-8 py-6">
          <Link href="/">
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  )
} 