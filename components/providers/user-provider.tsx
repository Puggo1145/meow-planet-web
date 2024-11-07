"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/store/use-user"
import { isProtectedRoute } from "@/lib/route-config"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { user, status, teams, initialize } = useUserStore()

    useEffect(() => {
        if (status === "loading") {
            initialize();
            return;
        }

        // Handle user redirect
        if (status === "unauthenticated" && !["/sign-in", "/sign-up"].includes(pathname)) {
            router.replace("/sign-in")
            return
        } else if (status === "authenticated") {
            if (["/", "/sign-in", "/sign-up"].includes(pathname)) {
                router.replace("/today")
            }
        }

        const handleRouteProtection = async () => {
            // Check if current route needs protection
            const config = isProtectedRoute(pathname)
            if (!config) return

            // Check team and label requirements
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

        handleRouteProtection()
    }, [pathname, status, user, teams, router, initialize])

    return <>{children}</>
} 