"use client";

// icons
import {
  CompassIcon,
  CatIcon,
  ListOrderedIcon,
  HeartHandshakeIcon,
  // BellIcon,
} from "lucide-react"
// hooks
import { usePathname } from "next/navigation";
// utils
import { cn } from "@/lib/utils";
import Link from "next/link";
// types
import type { LucideIcon } from "lucide-react";


interface Nav {
  icon: LucideIcon;
  text: string;
  href: string;
}

const navs: Nav[] = [
  {
    icon: CompassIcon,
    text: "今日",
    href: "/today"
  },
  {
    icon: CatIcon,
    text: "猫猫图鉴",
    href: "/cats"
  },
  {
    icon: HeartHandshakeIcon,
    text: "领养",
    href: "/adoption"
  },
  {
    icon: ListOrderedIcon,
    text: "排行榜",
    href: "/ranking"
  },
  // {
  //   icon: BellIcon,
  //   text: "通知",
  //   href: "/notification"
  // },
]

const Navs: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-y-4 mt-6">
      {navs.map((nav, index) => (
        <li key={index}>
          <Link
            href={nav.href}
            className={cn(
              "flex items-center gap-x-3 p-4 cursor-pointer hover:bg-secondary rounded-2xl",
              pathname.includes(nav.href) && "bg-primary text-primary-foreground hover:bg-primary"
            )}
          >
            <nav.icon size={24} />
            <p className="text-sm font-bold">{nav.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navs