"use client"

import { useEffect, useState } from "react"
// ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SparklesIcon } from "lucide-react"
// api
import { getCatMaintainers } from "@/api/users"
// utils
import { toast } from "sonner"

interface Maintainer {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export const CatsMaintainers = () => {
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
          {maintainers.map((maintainer) => (
            <li key={maintainer.id}>
              <Avatar className="size-12 -ml-2 border-2 border-secondary">
                <AvatarImage src={maintainer.avatarUrl} />
                <AvatarFallback className="bg-background">
                  {maintainer.name?.[0]}
                </AvatarFallback>
              </Avatar>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex items-center gap-x-2">
        <Button className="flex items-center gap-x-2">
          <SparklesIcon className="size-4" />
          打赏
        </Button>
        <Button variant="outline">
          成为管理员
        </Button>
      </section>
    </section>
  )
}
