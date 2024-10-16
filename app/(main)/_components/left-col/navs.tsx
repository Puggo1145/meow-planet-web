"use client";

// icons
import {
  CompassIcon,
  MessageCircleMoreIcon,
  ListOrderedIcon,
  SettingsIcon,
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
    text: "Feeds",
    href: "/feeds"
  },
  {
    icon: MessageCircleMoreIcon,
    text: "Messages",
    href: "/messages"
  },
  {
    icon: ListOrderedIcon,
    text: "Ranking",
    href: "/ranking"
  },
  {
    icon: SettingsIcon,
    text: "Settings",
    href: "/settings"
  }
]

const Navs: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-y-4 mt-6">
      {navs.map((nav, index) => (
        <Link
          key={index}
          href={nav.href}
        >
          <li
            className={cn(
              "flex items-center gap-x-3 p-4 cursor-pointer hover:bg-secondary rounded-2xl",
              pathname === nav.href && "bg-primary text-primary-foreground hover:bg-primary"
            )}
          >
            <nav.icon size={24} />
            <p className="text-sm font-bold">{nav.text}</p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Navs