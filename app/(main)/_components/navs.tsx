"use client";

// icons
import {
  CompassIcon,
  CatIcon,
  ListOrderedIcon,
  HeartHandshakeIcon,
  BellIcon,
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
    text: "Today",
    href: "/today"
  },
  {
    icon: CatIcon,
    text: "Cats",
    href: "/cats"
  },
  {
    icon: HeartHandshakeIcon,
    text: "Help Cats",
    href: "/help-cats"
  },
  {
    icon: ListOrderedIcon,
    text: "Ranking",
    href: "/ranking"
  },
  {
    icon: BellIcon,
    text: "Notification",
    href: "/notification"
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
        <li key={index}>
          <Link
            href={nav.href}
            className={cn(
              "flex items-center gap-x-3 p-4 cursor-pointer hover:bg-secondary rounded-2xl",
              pathname === nav.href && "bg-primary text-primary-foreground hover:bg-primary"
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