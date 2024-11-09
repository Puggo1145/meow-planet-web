"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// icons
import {
  CompassIcon,
  CatIcon,
  ListOrderedIcon,
  HeartHandshakeIcon,
  UserIcon,
} from "lucide-react"
// utils
import { cn } from "@/lib/utils"

const navItems = [
  {
    icon: CompassIcon,
    text: "今日",
    href: "/today"
  },
  {
    icon: CatIcon,
    text: "图鉴",
    href: "/cats"
  },
  {
    icon: HeartHandshakeIcon,
    text: "领养",
    href: "/adoption"
  },
  {
    icon: ListOrderedIcon,
    text: "排行",
    href: "/ranking"
  },
  {
    icon: UserIcon,
    text: "我的",
    href: "/user"
  }
]

export const MobileNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t md:hidden">
      <ul className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <li key={index} className="flex-1">
            <Link
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-y-1 py-3",
                "text-muted-foreground hover:text-foreground transition-colors",
              )}
            >
              <item.icon className={cn("size-6", pathname.includes(item.href) && "text-primary")} />
              <span className={cn("text-xs", pathname.includes(item.href) && "text-primary font-bold")}>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 