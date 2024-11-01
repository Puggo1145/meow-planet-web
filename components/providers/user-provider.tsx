"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/store/use-user"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    
    const {
        initialize,
        status,
    } = useUserStore(state => state)

    useEffect(() => {
        if (status === "loading") {
            initialize();
            return;
        };

        if (status === "authenticated") {
            if (["/", "/sign-in", "/sign-up"].includes(pathname)) {
                router.replace("/today");
            }
        } else if (status === "unauthenticated") {
            if (["/sign-in", "/sign-up"].includes(pathname)) {
                return;
            }
            
            router.replace("/sign-in");
        }
    }, [status, router, initialize, pathname]);

    return <>{children}</>
} 