"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/store/use-user"
import { getRouteConfig } from "@/lib/route-config"

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

            // 2. 获取路由配置
            const config = getRouteConfig(pathname)
            if (!config) return

            // 3. 路由守护逻辑
            if (status === "unauthenticated") {
                // 未登录用户只能访问公开路由
                if (!config.isPublic) {
                    router.replace("/sign-in")
                }
            } else if (status === "authenticated") {
                // 已登录用户的重定向
                if (config.isPublic && config.redirect) {
                    router.replace(config.redirect)
                    return
                }

                // 权限检查
                if (config.team || config.labels) {
                    const hasTeam = !config.team || teams?.some(team => team.$id === config.team)
                    const hasLabel = !config.labels ||
                        config.labels.some(label => user?.labels?.includes(label))

                    if (!hasTeam || !hasLabel) {
                        router.replace("/unauthorized")
                        return
                    }
                }
            }
        }

        handleRouteGuard()
    }, [pathname, status, user, teams, router, initialize])

    return <>{children}</>
} 