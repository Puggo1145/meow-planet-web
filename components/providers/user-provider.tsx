"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/store/use-user"
import { checkUserAccess } from "@/lib/route-guard"
import { routeGuardConfig } from "@/config/routes"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { user, status, teams, initialize } = useUserStore()

    useEffect(() => {
        const handleRouteGuard = async () => {
            // 1. 初始化用户状态
            if (status === "loading") {
                await initialize()
                return
            }

            // 2. 处理根路由重定向
            if (pathname === "/") {
                if (status === "unauthenticated") {
                    router.replace("/sign-in")
                } else {
                    router.replace("/today")
                }
                return
            }

            // 3. 已登录用户访问登录/注册页面，重定向到首页
            if (status === "authenticated" && ["/sign-in", "/sign-up"].includes(pathname)) {
                router.replace("/today")
                return
            }

            // 4. 检查当前路由的访问权限
            const routeConfig = routeGuardConfig[pathname]
            if (routeConfig) {
                const hasAccess = checkUserAccess(user, teams, routeConfig)
                
                if (!hasAccess) {
                    // 未登录用户重定向到登录页
                    if (status === "unauthenticated") {
                        router.replace("/sign-in")
                    } else {
                        // 已登录但权限不足的用户重定向到未授权页面
                        router.replace("/unauthorized")
                    }
                    return
                }
            }
        }

        handleRouteGuard()
    }, [pathname, status, user, teams, router, initialize])

    return <>{children}</>
} 