// ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SparklesIcon } from "lucide-react"

const mockMaintainers = [
    {
        id: 1,
        name: "张三",
        image: "https://github.com/shadcn.png",
    },
    {
        id: 2,
        name: "李四",
        image: "https://github.com/shadcn.png",
    },
    {
        id: 3,
        name: "王五",
        image: "https://github.com/shadcn.png",
    },
    {
        id: 4,
        name: "赵六",
        image: "https://github.com/shadcn.png",
    },
    {
        id: 5,
        name: "孙七",
        image: "https://github.com/shadcn.png",
    },
    {
        id: 6,
        name: "周八",
        image: "https://github.com/shadcn.png",
    },
]

export const CatsMaintainers = () => {


    return (
        <section className="flex items-center justify-between w-full p-6 bg-secondary rounded-2xl">
            <section className='space-y-2'>
                <p className='text-sm text-muted-foreground'>
                    感谢以下猫猫图鉴的管理员们
                </p>
                <ul className='w-fit flex items-center'>
                    {mockMaintainers.map((maintainer) => (
                        <li key={maintainer.id}>
                            <Avatar className="size-12 -ml-2 border-2 border-secondary">
                                <AvatarImage src={maintainer.image} />
                                <AvatarFallback className="bg-background">
                                    {maintainer.name}
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
