import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import images from "@/constants/images"

export default function UnauthorizedPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-y-4 px-4">
      <div className="relative size-[256px] flex items-center justify-center">
        <Image
          src={images.unauthorized}
          alt="Unauthorized"
          width={192}
          height={192}
          className="size-full object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold">
        喵喵，你没有权限访问这个页面
      </h1>
      <p className="text-muted-foreground text-center max-w-[500px]">
        看起来你需要更高的权限才能访问这个页面<br />
        如果你认为这是一个错误，请联系管理员
      </p>
      <Button asChild className="font-bold px-8 py-6">
        <Link href="/">
          返回首页
        </Link>
      </Button>
    </div>
  )
} 