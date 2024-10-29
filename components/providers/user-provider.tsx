"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/store/use-user"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
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
            router.replace("/today");
        } else if (status === "unauthenticated") {
            router.replace("/sign-in");
        }
    }, [status, router, initialize]);

    return <>{children}</>
} 