"use client"

// ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
// components
import { Loader } from "@/components/loader"
// icons
import {
    ChevronsUpDown,
    LogOut,
    User,
    UserPlus
} from "lucide-react"
// utils
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
// store
import { useUserStore } from "@/store/use-user"
import { useState } from "react"

export const UserPanel = () => {
    return (
        <DropdownMenu>
            <UserPanelTrigger />
            <UserPanelContent />
        </DropdownMenu>
    )
}

const UserPanelTrigger = () => {
    const user = useUserStore(state => state.user)
    const pathname = usePathname();

    if (!user) return (
        <div className="flex items-center gap-x-4 cursor-pointer hover:bg-secondary rounded-2xl py-4 px-2">
            <Loader size="sm" />
        </div>
    )

    return (
        <DropdownMenuTrigger asChild>
            <div className={cn("flex items-center gap-x-4 cursor-pointer hover:bg-secondary rounded-2xl py-4 px-2",
                pathname === "/user" && "bg-secondary"
            )}>
                <Avatar className="size-10">
                    <AvatarImage src={user?.prefs?.avatarUrl} />
                    <AvatarFallback>
                        {user?.name?.[0]}
                    </AvatarFallback>
                </Avatar>
                <section className="flex flex-col justify-start">
                    <span className="text-sm font-medium">
                        {user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {user?.email}
                    </span>
                </section>
                <ChevronsUpDown className="ml-2 size-4" />
            </div>
        </DropdownMenuTrigger>
    )
}


const UserPanelContent = () => {
    const itemStyle = "h-12 cursor-pointer"

    return (
        <DropdownMenuContent className="w-64 rounded-xl">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild className={itemStyle}>
                    <Link href="/user">
                        <User />
                        <span>个人中心</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={itemStyle}>
                    <UserPlus />
                    <span>邀请用户</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutUserItem />
        </DropdownMenuContent>
    )
}

const SignOutUserItem = () => {
    const logout = useUserStore(state => state.logout)
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)
        await logout()
        setIsSigningOut(false)
    }

    return (
        <DropdownMenuItem
            className="h-12 cursor-pointer"
            onClick={handleSignOut}
            onSelect={(event) => {
                event.preventDefault()
            }}
        >
            {isSigningOut
                ?
                <>
                    <Loader size="sm" className="mr-2" />
                    <span className="text-muted-foreground">退出登录中...</span>
                </>
                :
                <>
                    <LogOut />
                    <span>退出登录</span>
                </>
            }
        </DropdownMenuItem>
    )
}