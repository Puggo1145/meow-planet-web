"use client"

import { useEffect, useState } from "react"
// ui
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// icons
import { SparklesIcon } from "lucide-react"
// api
import { getCatMaintainers } from "@/services/users"
// utils
import { toast } from "sonner"
// store
import { useUserStore } from "@/store/use-user"
// types
import { Maintainer } from "@/services/users"

export const CatsMaintainers = () => {
  const isMaintainer = useUserStore(state => state.hasLabel("catMaintainer"))

  const [maintainers, setMaintainers] = useState<Maintainer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMaintainers = async () => {
      try {
        const maintainers = await getCatMaintainers()
        setMaintainers(maintainers)
      } catch (error) {
        toast.error("获取管理员列表失败: " + (error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaintainers()
  }, [])

  if (isLoading || maintainers.length === 0) return null

  return (
    <section className="flex items-center justify-between w-full p-6 bg-secondary rounded-2xl">
      <section className='space-y-2'>
        <p className='text-sm text-muted-foreground'>
          感谢以下猫猫图鉴的管理员们
        </p>
        <ul className='w-fit flex items-center'>
          <TooltipProvider>
            {maintainers.map((maintainer) => (
              <li key={maintainer.$id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="size-12 -ml-2 border-2 border-secondary">
                      <AvatarImage src={maintainer.avatarUrl} />
                      <AvatarFallback className="bg-background">
                        {maintainer.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{maintainer.name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </section>
      <section className="flex items-center gap-x-2">
        <Button className="flex items-center gap-x-2" disabled>
          <SparklesIcon className="size-4 cursor-not-allowed" />
          打赏
        </Button>
        {
          !isMaintainer &&
          <Button 
            variant="outline" 
            disabled
          >
            成为管理员
          </Button>
        }
      </section>
    </section>
  )
}
